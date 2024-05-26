import styled from 'styled-components';
import {TouchableOpacity, Image, View} from 'react-native';

export const RestaurantImage = styled(Image)`
  width: 100%;
  height: ${props => props?.theme?.WP(50)}px;
  background-color: #d1d5db;
  padding: ${props => props?.theme?.WP(4)}px;
`;

export const BackButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${props => props?.theme?.WP(5)}px;
  left: ${props => props?.theme?.WP(4)}px;
  padding: ${props => props?.theme?.WP(2)}px;
  background-color: ${props => props?.theme?.DefaultPalette()?.primary?.main};
  border-radius: ${props => props?.theme?.WP(50)}px;
`;

export const RestaurantDetailWrapper = styled(View)`
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
`;

export const RestaurantDetailContainer = styled(View)`
  padding: ${props => props?.theme?.WP(4)}px;
`;

export const RestaurantDetails = styled(View)`
  flex-direction: column;
`;

export const RestaurantRatingView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const DinningWrapper = styled(View)`
  width: 100%;
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(4)}px;
`;

export const DinningOption = styled(View)`
  margin-bottom: ${props => props?.theme?.WP(2)}px;
`;
