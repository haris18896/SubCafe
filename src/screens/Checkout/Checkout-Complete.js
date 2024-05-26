import React from 'react';
import {Text} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** third Party Packages
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';

const CheckoutComplete = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <Text>CheckoutComplete</Text>
    </Layout>
  );
};
export {CheckoutComplete};
