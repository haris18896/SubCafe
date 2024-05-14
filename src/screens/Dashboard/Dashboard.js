import React, {useState, useLayoutEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {Empty, Loader} from '../../@core/components';
import {LogoHeader, Categories, FeaturedRow} from '../../components';

// ** Dummy
import {featureCategories} from '../../utils/dummyData';

const Dashboard = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** STATES
  const [search, setSearch] = useState('');
  const [isLoading, setIsloading] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <Layout>
      <LogoHeader search={search} setSearch={setSearch} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Categories isLoading={isLoading} />

        {isLoading === 'dashboard_pending' ? (
          <Loader />
        ) : featureCategories.length > 0 ? (
          featureCategories?.map(category => (
            <FeaturedRow
              key={category?._id}
              id={category?._id}
              title={category?.name}
              description={category?.short_description}
            />
          ))
        ) : (
          <Empty title={'No features available'} />
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
