import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation, useRoute} from '@react-navigation/native';

// ** Custom Components
import {
  BasketIcon,
  Booking,
  DinningOptions,
  Menu,
  RestaurantDetailsComponent,
  SpecialOrder,
} from '../../components';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {getRestaurantMenuAction, setRestaurant} from '../../redux/Restaurant';

// ** Dummy
import {dummyRestaurant} from '../../utils/dummyData';
import {TextItem} from '../../styles/typography';
import {Loader} from '../../@core/components';

const Restaurant = () => {
  const {
    params: {
      id,
      imgUrl,
      rating,
      title,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [dinningType, setDinningType] = useState(null);
  const [isLoading, setIsLoading] = useState('');

  const apiCall = async () => {
    const restaurant = new Promise((resolve, reject) => {
      try {
        dispatch(
          setRestaurant({
            id,
            imgUrl,
            rating,
            title,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    const menuItems = new Promise((resolve, reject) => {
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

    return Promise.all([restaurant, menuItems]);
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
          rating={4}
          type={dinningType}
          clearType={() => setDinningType(null)}
          image={dummyRestaurant}
          location={'Armour Mess, Nowshera cantonment, Khyber Pakhtunkhwa'}
          title={'Cafe de metro'}
          description={'this is cafe descriptionasdf asdfbkjhzcxv asdf '}
        />

        {isLoading === 'fetching_menu' ? (
          <Loader />
        ) : dinningType === 'booking' ? (
          <Booking />
        ) : dinningType === 'specialOrder' ? (
          <SpecialOrder />
        ) : dinningType === 'delivery' ? (
          <Menu />
        ) : (
          <DinningOptions
            type={dinningType}
            onPress={item => setDinningType(item)}
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
