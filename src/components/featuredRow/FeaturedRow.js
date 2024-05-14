import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Icons from 'react-native-heroicons/solid';

// ** Custom Components
import {TextItem} from '../../styles/typography';
import {Empty, Loader} from '../../@core/components';
import {FeatureRowHeader, FeatureRowWrapper} from '../../styles/components';

import {restaurants} from '../../utils/dummyData';
import RestaurantCard from '../restaurantCard/RestaurantCard';

const FeaturedRow = ({id, title, description}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);

  // useEffect(() => {
  //   setLoading('fetch_restaurant_pending');
  //   sanityClient
  //     .fetch(
  //       `
  //       *[_type == 'featured' && _id == '${id}'] {
  //         ...,
  //         restaurant[]->{
  //           ...,
  //           dishes[]->,
  //           type-> {
  //             name
  //           }
  //         }
  //       }[0]
  //   `,
  //       { id }, // params
  //     )
  //     .then((data) => {
  //       setRestaurants(data?.restaurant);
  //       setLoading(false);
  //     });
  // }, [id]);

  return (
    <FeatureRowWrapper style={styles.container}>
      <FeatureRowHeader style={styles.header}>
        <TextItem size={4}>{title}</TextItem>
        <Icons.ArrowRightIcon
          size={AppTheme?.WP(5)}
          color={AppTheme?.DefaultPalette()?.primary?.main}
        />
      </FeatureRowHeader>
      <TextItem
        color={AppTheme?.DefaultPalette()?.grey[600]}
        style={styles.description}>
        {description}
      </TextItem>

      <ScrollView
        horizontal
        contentContainerStyle={[
          styles.scrollView,
          {width: restaurants.length === 0 ? '100%' : 'auto'},
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {isLoading === 'fetch_restaurant_pending' ? (
          <Loader />
        ) : restaurants.length > 0 ? (
          restaurants?.map(restaurant => (
            <RestaurantCard
              key={restaurant?._id}
              id={restaurant?._id}
              imgUrl={restaurant?.image}
              address={restaurant?.address}
              title={restaurant?.name}
              rating={restaurant?.rating}
              genre={restaurant?.type?.name}
              short_description={restaurant?.short_description}
              dishes={restaurant?.dishes}
              long={restaurant?.long}
              lat={restaurant?.lat}
            />
          ))
        ) : (
          <Empty title="No Restaurant Found" />
        )}
      </ScrollView>
    </FeatureRowWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginTop: AppTheme?.WP(1),
  },
  scrollView: {
    paddingTop: AppTheme?.WP(2),
  },
  loadingContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {FeaturedRow};
