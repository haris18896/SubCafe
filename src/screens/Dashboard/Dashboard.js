import React, {useState, useLayoutEffect, useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {Empty, Loader} from '../../@core/components';
import {LogoHeader, Categories, FeaturedRow} from '../../components';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';

// ** Dummy
import {featureCategories} from '../../utils/dummyData';
import {getRestaurantsAction} from '../../redux/Restaurant';
import RestaurantCard from '../../components/restaurantCard/RestaurantCard';

const Dashboard = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const {restaurants} = useSelector(state => state?.restaurants);

  // ** STATES
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const apiCall = async () => {
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
      <LogoHeader search={search} setSearch={setSearch} />
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
        <Categories isLoading={isLoading} />

        {isLoading === 'restaurants_pending' ? (
          <Loader />
        ) : featureCategories.length > 0 ? (
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
