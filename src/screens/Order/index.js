import React, {useEffect, useState} from 'react';
// ** Utils
import {theme as Apptheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {LogoHeader} from '../../components';
import {TextItem} from '../../styles/typography';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';
import {getOrderAction, selectOrders} from '../../redux/Orders';
import {EmptyWrapper} from '../../styles/components';
import {Empty} from '../../@core/components';

const Orders = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  // ** States
  const [isLoading, setIsLoading] = useState('');

  const apiCall = async () => {
    setIsLoading('fetching_orders');
    dispatch(
      getOrderAction({
        data: {},
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
      {orders?.length === 0 ? (
        <EmptyWrapper marginTop={4}>
          <Empty title={'No Orders Found'} />
        </EmptyWrapper>
      ) : (
        <TextItem>Orders here</TextItem>
      )}
    </Layout>
  );
};
export {Orders};
