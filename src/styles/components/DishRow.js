import styled from 'styled-components';
import {Image, TouchableOpacity, View} from 'react-native';

export const DishRowContainer = styled(TouchableOpacity)`
  background-color: white;
  border-bottom-width: 1px;
  border-color: ${props =>
    props?.theme?.DefaultPalette()?.borders?.inputBorder};
  padding: ${props => props?.theme?.WP(4)}px;
`;

export const DishRowWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const DishTextContainer = styled(View)`
  flex: 1;
  padding-right: ${props => props?.theme?.WP(2)}px;
`;

export const DishImage = styled(Image)`
  height: ${props => props?.theme?.WP(20)}px;
  width: ${props => props?.theme?.WP(20)}px;
  border-radius: ${props => props?.theme?.WP(50)}px;
`;

export const DishCounterWrapper = styled(View)`
  flex: 1;
  align-items: center;
`;

export const DishCounterContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-top: ${props => props?.theme?.WP(2)}px;
  padding-bottom: ${props => props?.theme?.WP(2)}px;
`;
