import React from 'react';
import {Text} from 'react-native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {LogoHeader} from '../../components';

const Dashboard = () => {
  return (
    <Layout>
      <LogoHeader />
      <Text>Dashboard</Text>
    </Layout>
  );
};
export {Dashboard};
