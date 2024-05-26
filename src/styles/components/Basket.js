import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';

export const BasketContainer = styled(View)`
  position: absolute;
  bottom: ${props => props?.theme?.WP(5)}px;
  width: 100%;
  z-index: 100;
  padding-left: ${props => props?.theme?.WP(5)}px;
  padding-right: ${props => props?.theme?.WP(5)}px;
`;

export const BasketButton = styled(TouchableOpacity)`
  background-color: ${props => props?.theme?.DefaultPalette()?.primary?.main};
  padding-top: ${props => props?.theme?.WP(2)}px;
  padding-bottom: ${props => props?.theme?.WP(2)}px;
  padding-left: ${props => props?.theme?.WP(6)}px;
  padding-right: ${props => props?.theme?.WP(6)}px;
  border-radius: ${props => props?.theme?.WP(6)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CountView = styled(View)`
  background-color: ${props => props?.theme?.DefaultPalette()?.primary?.dark};
  padding-top: ${props => props?.theme?.WP(1)}px;
  padding-bottom: ${props => props?.theme?.WP(1)}px;
  padding-left: ${props => props?.theme?.WP(2)}px;
  padding-right: ${props => props?.theme?.WP(2)}px;
  border-radius: ${props => props?.theme?.WP(4)}px;
`;
