import React, {memo} from 'react';
import {StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';
import * as Icons from 'react-native-heroicons/solid';

// ** Custom Components
import {
  RestaurantImage,
  RestaurantCardWRapper,
  RatingAndLocationContainer,
  RestaurantInfoContainer,
  RestaurantCardTextContainer,
} from '../../styles/components';
import {TextItem} from '../../styles/typography';

const RestaurantCard = props => {
  // ** navigation
  const navigation = useNavigation();

  const {
    id,
    lat,
    long,
    genre,
    title,
    seats,
    imgUrl,
    rating,
    address,
    dishes,
    short_description,
  } = props;

  return (
    <RestaurantCardWRapper
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          lat,
          long,
          genre,
          title,
          seats,
          imgUrl,
          rating,
          address,
          dishes,
          short_description,
        });
      }}>
      <RestaurantImage source={{uri: imgUrl}} />
      <RestaurantCardTextContainer>
        <TextItem size={4} weight={'bold'} family={'PoppinsBold'}>
          {title}
        </TextItem>

        <RestaurantInfoContainer>
          <RatingAndLocationContainer>
            <Icons.StarIcon
              color={AppTheme?.DefaultPalette()?.primary?.main}
              opacity={0.5}
              size={AppTheme?.WP(5)}
            />
            <TextItem
              size={3.5}
              color={AppTheme?.DefaultPalette()?.success?.main}
              style={styles.ratingText}>
              {rating}
            </TextItem>
            <TextItem size={3.5}> {genre}</TextItem>
          </RatingAndLocationContainer>

          <RatingAndLocationContainer style={styles.locationContainer}>
            <Icons.MapPinIcon
              color={AppTheme?.DefaultPalette()?.success?.main}
              opacity={0.5}
              size={AppTheme?.WP(5.5)}
            />
            <TextItem size={3.5} style={styles.locationText}>
              Nearby . {address}
            </TextItem>
          </RatingAndLocationContainer>

          <RatingAndLocationContainer style={styles.locationContainer}>
            <Icons.BookmarkSquareIcon
              color={AppTheme?.DefaultPalette()?.success?.main}
              opacity={0.5}
              size={AppTheme?.WP(5.5)}
            />
            <TextItem size={3.5} style={styles.locationText}>
              Seats Available .{' '}
              <TextItem
                size={3.5}
                color={AppTheme?.DefaultPalette()?.primary?.main}>
                {seats}
              </TextItem>
            </TextItem>
          </RatingAndLocationContainer>
        </RestaurantInfoContainer>
      </RestaurantCardTextContainer>
    </RestaurantCardWRapper>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    paddingLeft: 5,
  },

  locationText: {
    paddingLeft: 5,
  },
  locationContainer: {
    marginTop: AppTheme?.WP(1),
  },
});

export default memo(RestaurantCard);
