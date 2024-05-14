import React from 'react';
import {View, ActivityIndicator, ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import CategoryCard from './CategoryCard';
import {Empty, Loader} from '../../@core/components';

const Categories = props => {
  // ** Props
  const {isLoading} = props;

  const categories = [
    {
      _id: 1,
      image:
        'https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg',
      name: 'Pizza',
    },
    {
      _id: 2,
      image:
        'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
      name: 'Burger',
    },
    {
      _id: 3,
      image:
        'https://img.taste.com.au/lNnNoTvU/taste/2010/01/sushi-187034-1.jpg',
      name: 'Sushi',
    },
    {
      _id: 4,
      image:
        'https://www.thespruceeats.com/thmb/ereeBcFkDEbDT2VSlDe34sqXO_8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chicken-tinga-tinga-de-pollo-4773239-Hero_01-1bd1d960c02a4fdb812323b8c60fd55b.jpg',
      name: 'Tacos',
    },
    {
      _id: 5,
      image:
        'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1615916524567.jpeg',
      name: 'Pasta',
    },
    {
      _id: 6,
      image:
        'https://iamafoodblog.b-cdn.net/wp-content/uploads/2021/02/how-to-cook-steak-1061w.jpg',
      name: 'Steak',
    },
    {
      _id: 7,
      image:
        'https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg',
      name: 'Ice Cream',
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        {width: categories.length === 0 ? '100%' : 'auto'},
      ]}>
      {isLoading ? (
        <Loader />
      ) : categories.length > 0 ? (
        categories?.map(category => (
          <CategoryCard
            key={category?._id}
            title={category?.name}
            imgUrl={category?.image}
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
