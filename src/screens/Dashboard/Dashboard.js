import React, {useState, useLayoutEffect, useEffect, useMemo} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {Empty, Loader} from '../../@core/components';
import {LogoHeader, Categories} from '../../components';
import RestaurantCard from '../../components/restaurantCard/RestaurantCard';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';
import {allRestaurants, getRestaurantsAction} from '../../redux/Restaurant';
import {getData} from '../../utils/constants';

const Dashboard = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const restaurants = useSelector(state => state?.restaurants?.restaurants);

  // ** STATES
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [favoriteItems, setFavoriteItems] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const apiCall = async () => {
    try {
      const favoriteItems = await getData('favoriteItems');
      const parsedFavorites = favoriteItems ? JSON.parse(favoriteItems) : [];
      setFavoriteItems(parsedFavorites);
    } catch (error) {
      console.error('Failed to load favorites', error);
    }
    dispatch(
      getRestaurantsAction({
        data: {},
        refreshing: () => setIsLoading(''),
        errorCallback: () => setIsLoading(''),
        callback: () => {},
      }),
    );
  };

  useEffect(() => {
    setIsLoading('restaurants_pending');
    return navigation.addListener('focus', apiCall);
  }, [navigation]);

  return (
    <Layout>
      <LogoHeader
        setSearch={setSearch}
        handleSearch={() => {}}
        search={search}
        onPressLogo={() => navigation.navigate('Orders')}
      />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isLoading === 'refreshing'}
            onRefresh={() => {
              setIsLoading('refreshing');
              apiCall().then(() => {});
            }}
          />
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {favoriteItems.length > 0 && (
          <Categories favoriteItems={favoriteItems} isLoading={isLoading} />
        )}

        {isLoading === 'restaurants_pending' ? (
          <Loader />
        ) : restaurants.length > 0 ? (
          restaurants?.map(restaurant => (
            <RestaurantCard key={restaurant?._id} item={restaurant} />
          ))
        ) : (
          <Empty title={'No Restaurants Available'} />
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  contentContainer: {
    paddingBottom: AppTheme?.WP(30),
  },
});
export {Dashboard};
