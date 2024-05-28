import React from 'react';
import {StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Icons from 'react-native-heroicons/solid';

// ** Custom Components
import {
  RestaurantImage,
  RestaurantCardWRapper,
  RestaurantInfoContainer,
  RatingAndLocationContainer,
  RestaurantCardTextContainer,
} from '../../styles/components';
import {TextItem} from '../../styles/typography';

// ** Dummy Data
import {dummyRestaurant} from '../../utils/dummyData';

const ItemRow = props => {
  // ** Params
  const {data} = props;

  return (
    <RestaurantCardWRapper width={250} disabled={true}>
      <RestaurantImage
        height={30}
        source={{
          uri: dummyRestaurant,
        }}
        alt={data?._id}
      />
      <RestaurantCardTextContainer>
        <TextItem size={4} weight={'bold'} family={'PoppinsBold'}>
          {data?.name}
        </TextItem>

        <RestaurantInfoContainer>
          <RatingAndLocationContainer>
            <Icons.CurrencyDollarIcon
              color={AppTheme?.DefaultPalette()?.primary?.main}
              opacity={0.5}
              size={AppTheme?.WP(6)}
            />
            <TextItem
              size={3.5}
              color={AppTheme?.DefaultPalette()?.success?.main}
              style={styles.ratingText}>
              {data?.price}
            </TextItem>
          </RatingAndLocationContainer>
          <TextItem size={3.5}> {data?.description}</TextItem>
        </RestaurantInfoContainer>
      </RestaurantCardTextContainer>
    </RestaurantCardWRapper>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    paddingLeft: 5,
  },
});
export {ItemRow};
