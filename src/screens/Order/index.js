import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {FeaturedRow, LogoHeader} from '../../components';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';
import {getOrderAction, selectOrders} from '../../redux/Orders';
import {EmptyWrapper} from '../../styles/components';
import {Empty, Loader} from '../../@core/components';
import {getData} from '../../utils/constants';

const Orders = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  // ** States
  const [isLoading, setIsLoading] = useState('');

  const apiCall = async () => {
    const user = await getData('user');
    console.log(JSON.parse(user)?.id);

    setIsLoading('fetching_orders');
    dispatch(
      getOrderAction({
        data: {userId: JSON.parse(user)?.id},
        refreshing: () => setIsLoading(''),
        errorCallback: () => setIsLoading(''),
        callback: () => {},
      }),
    );
  };

  useEffect(() => {
    return navigation.addListener('focus', apiCall);
  }, [navigation]);

  return (
    <Layout>
      <LogoHeader onPressLogo={() => navigation.navigate('Dashboard')} />
      {isLoading === 'fetching_orders' ? (
        <EmptyWrapper marginTop={10}>
          <Loader />
        </EmptyWrapper>
      ) : orders?.length === 0 ? (
        <EmptyWrapper top={10}>
          <Empty title={'No Orders Found'} />
        </EmptyWrapper>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              onRefresh={apiCall}
              refreshing={isLoading === 'apiCall'}
            />
          }>
          {orders.map((items, index) => {
            return (
              <FeaturedRow
                key={index}
                data={items?.menuItems}
                title={items?.resturant_name}
                description={items?.resturant_description}
                address={items?.delivery && items?.delivery_address}
                specialOrder={
                  items?.special_order && items?.special_order_description
                }
              />
            );
          })}
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
    paddingBottom: AppTheme?.WP(10),
  },
});
export {Orders};
