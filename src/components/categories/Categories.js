import React from 'react';
import {View, ActivityIndicator, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import CategoryCard from './CategoryCard';
import {Empty, Loader} from '../../@core/components';
import {dummyRestaurant} from '../../utils/dummyData';

const Categories = props => {
  // ** Props
  const {isLoading, favoriteItems} = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        {width: favoriteItems.length === 0 ? '100%' : 'auto'},
      ]}>
      {isLoading ? (
        <Loader />
      ) : favoriteItems.length > 0 ? (
        favoriteItems?.map(category => (
          <CategoryCard
            key={category?._id}
            title={category?.name || 'Pizza'}
            // imgUrl={`data:image/png;base64,${category?.image}`}
            imgUrl={dummyRestaurant}
          />
        ))
      ) : (
        <Empty title={'No Favourites Found'} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: AppTheme?.WP(2),
    paddingTop: AppTheme?.WP(2),
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Categories};
