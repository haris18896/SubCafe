import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {getData} from '../../utils/constants';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation, useRoute} from '@react-navigation/native';

// ** Custom Components
import {
  Menu,
  Booking,
  BasketIcon,
  DinningOptions,
  RestaurantDetailsComponent,
} from '../../components';
import {Loader} from '../../@core/components';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {getRestaurantMenuAction, setRestaurant} from '../../redux/Restaurant';

const Restaurant = () => {
  const {
    params: {id, image, title, genre, short_description, address, seats},
  } = useRoute();

  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [user, setUser] = useState({});
  const [dinningType, setDinningType] = useState(null);
  const [isLoading, setIsLoading] = useState('');

  const apiCall = async () => {
    const userData = await getData('user');
    setUser(JSON.parse(userData));
    const restaurantPromise = new Promise((resolve, reject) => {
      try {
        dispatch(
          setRestaurant({
            id,
            image,
            title,
            genre,
            address,
            seats,
            type: dinningType,
            short_description,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    const menuItemsPromise = new Promise((resolve, reject) => {
      try {
        dispatch(
          getRestaurantMenuAction({
            data: {resturant_id: id},
            refreshing: () => setIsLoading(''),
            errorCallback: () => {
              setIsLoading('');
              reject(new Error('Menu fetch failed')); // Reject the promise if there's an error
            },
            callback: () => {
              resolve();
            },
          }),
        );
      } catch (error) {
        reject(error);
      }
    });

    return Promise.all([restaurantPromise, menuItemsPromise]);
  };

  useEffect(() => {
    setIsLoading('fetching_menu');
    return navigation.addListener('focus', apiCall);
  }, [id, navigation]);

  return (
    <>
      <BasketIcon />
      <ScrollView
        contentContainerStyle={{paddingBottom: AppTheme?.WP(20)}}
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isLoading === 'refreshing'}
            onRefresh={() => {
              setIsLoading('refreshing');
              apiCall().then(() => {});
            }}
          />
        }>
        <RestaurantDetailsComponent
          title={title}
          image={image}
          location={address}
          type={dinningType}
          clearType={() => setDinningType(null)}
          description={short_description}
        />

        {isLoading === 'fetching_menu' ? (
          <Loader />
        ) : dinningType === 'booking' ? (
          <Booking
            userId={user?.id}
            seats={seats}
            type={dinningType}
            restaurantId={id}
          />
        ) : ['delivery', 'takeAway'].includes(dinningType) ? (
          <Menu type={dinningType} />
        ) : (
          <DinningOptions
            type={dinningType}
            onPress={item => {
              setDinningType(item);
              dispatch(
                setRestaurant({
                  id,
                  image,
                  title,
                  genre,
                  address,
                  seats,
                  short_description,
                  type: item,
                }),
              );
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme?.DefaultPalette()?.background?.paper,
  },
  menu: {
    paddingTop: 12,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
  descriptionText: {
    color: '#9CA3AF',
    marginBottom: 16,
  },
  allergyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  allergyText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
});
export {Restaurant};
