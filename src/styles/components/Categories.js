import styled from 'styled-components';
import {Image, Text, TouchableOpacity} from 'react-native';

export const FavouriteCategoryWrapper = styled(TouchableOpacity)`
  margin-right: ${props => props?.theme?.WP(3)}px;
  position: relative;
`;

export const CategoryImage = styled(Image)`
  width: ${props => props?.theme?.WP(20)}px;
  height: ${props => props?.theme?.WP(20)}px;
  border-radius: ${props => props?.theme?.WP(5)}px;
  background-color: ${props => props?.theme?.DefaultPalette()?.grey[400]};
`;

export const CategoryName = styled(Text)`
  text-align: center;
  margin-top: ${props => props?.theme?.WP(1)}px;
  font-size: ${props => props?.theme?.WP(3)}px;
  color: ${props => props?.theme?.DefaultPalette()?.text?.primary};
  font-family: ${props => props?.theme?.fonts?.PoppinsSemiBold};
  font-weight: ${props => props?.theme?.fontWeights?.semiBold};
`;
