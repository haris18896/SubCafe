import styled from 'styled-components';

import {Image, TouchableOpacity, View} from 'react-native';

export const RestaurantCardWRapper = styled(TouchableOpacity)`
  background-color: ${props =>
    props?.bg ? props?.bg : props?.theme?.DefaultPalette()?.grey[100]};
  margin-right: ${props => props?.theme?.WP(3)}px;
  border-radius: ${props => props?.theme?.WP(4)}px;
  width: ${props => (props?.width ? props?.width : '100%')};
  margin-top: ${props => props?.theme?.WP(2)}px;
  margin-bottom: ${props => props?.theme?.WP(2)}px;
`;

export const RestaurantImage = styled(Image)`
  width: 100%;
  height: ${props =>
    props?.height ? props?.theme?.WP(props?.height) : props?.theme?.WP(50)}px;
  border-top-left-radius: ${props => props?.theme?.WP(4)}px;
  border-top-right-radius: ${props => props?.theme?.WP(4)}px;
`;

export const RestaurantCardTextContainer = styled(View)`
  flex: 1;
  padding-bottom: ${props => props?.theme?.WP(6)}px;
  padding-top: ${props => props?.theme?.WP(6)}px;
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(4)}px;
  width: 100%;
`;

export const RestaurantInfoContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: ${props => props?.theme?.WP(2)}px;
`;

export const RatingAndLocationContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
