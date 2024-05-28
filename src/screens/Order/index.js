import React from 'react';
// ** Utils
import {theme as Apptheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {LogoHeader} from '../../components';
import {TextItem} from '../../styles/typography';

const Orders = () => {
  // ** Navigation
  const navigation = useNavigation();

  return (
    <Layout>
      <LogoHeader onPressLogo={() => navigation.navigate('Dashboard')} />
      <TextItem>Order</TextItem>
    </Layout>
  );
};
export {Orders};
