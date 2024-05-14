import React, {useState, useLayoutEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {LogoHeader} from '../../components';
import {useNavigation} from '@react-navigation/native';
import Categories from '../../components/categories/Categories';

const Dashboard = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** STATES
  const [search, setSearch] = useState('');

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
        <Categories />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  contentContainer: {
    paddingBottom: AppTheme?.WP(10),
  },
});
export {Dashboard};
