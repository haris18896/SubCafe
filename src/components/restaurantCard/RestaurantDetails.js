import React from 'react';
import {View} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Icons from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  BackButton,
  RestaurantImage,
  RestaurantDetails,
  RestaurantRatingView,
  RestaurantDetailWrapper,
  RestaurantDetailContainer,
} from '../../styles/screens';
import {TextItem} from '../../styles/typography';

const RestaurantDetailsComponent = props => {
  // ** Props
  const {title, type, clearType, image, description, location} = props;

  // ** Navigation
  const navigation = useNavigation();

  return (
    <>
      <View>
        <RestaurantImage source={{uri: image}} />

        <BackButton
          onPress={() => {
            if (type) {
              clearType();
            } else {
              navigation.goBack();
            }
          }}>
          <Icons.ArrowLeftIcon
            size={AppTheme?.WP(5)}
            color={AppTheme?.DefaultPalette()?.common?.white}
          />
        </BackButton>
      </View>

      <RestaurantDetailWrapper>
        <RestaurantDetailContainer>
          <TextItem
            size={6.5}
            weight={'semiBold'}
            family={'PoppinsSemiBold'}
            color={AppTheme?.DefaultPalette()?.grey[900]}>
            {title}
          </TextItem>

          <RestaurantDetails>
            <RestaurantRatingView>
              <Icons.MapPinIcon
                size={AppTheme?.WP(4)}
                color="gray"
                opacity={0.4}
              />
              <TextItem
                style={{marginLeft: AppTheme?.WP(2)}}
                size={3.5}
                color={AppTheme?.DefaultPalette()?.grey[700]}>
                {location}
              </TextItem>
            </RestaurantRatingView>

            <TextItem
              style={{marginLeft: AppTheme?.WP(2)}}
              size={3.5}
              color={AppTheme?.DefaultPalette()?.grey[500]}>
              {description}
            </TextItem>
          </RestaurantDetails>
        </RestaurantDetailContainer>
      </RestaurantDetailWrapper>
    </>
  );
};
export {RestaurantDetailsComponent};
