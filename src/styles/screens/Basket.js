import styled from 'styled-components';
import {SafeAreaView, Image, TouchableOpacity, View} from 'react-native';

export const BasketScreenWrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
`;

export const BasketScreenContainer = styled(View)`
  flex: 1;
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
`;

export const BasketScreenHeader = styled(View)`
  padding: ${props => props?.theme?.WP(2.5)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    props?.theme?.DefaultPalette()?.borders?.inputBorder};
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BasketScreenCloseIcon = styled(TouchableOpacity)`
  position: absolute;
  top: ${props => props?.theme?.WP(2)}px;
  right: ${props => props?.theme?.WP(3)}px;
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
`;

export const BasketGroupItemsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(4)}px;
  padding-top: ${props => props?.theme?.WP(2)}px;
  padding-bottom: ${props => props?.theme?.WP(2)}px;
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    props?.theme?.DefaultPalette()?.borders?.inputBorder};
`;

export const DishImage = styled(Image)`
  width: ${props => props?.theme?.WP(20)}px;
  height: ${props => props?.theme?.WP(20)}px;
  border-radius: ${props => props?.theme?.WP(50)}px;
  margin-right: ${props => props?.theme?.WP(3)}px;
`;

export const SubTotalContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props?.theme?.DefaultPalette()?.background?.paper};
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    props?.theme?.DefaultPalette()?.borders?.inputBorder};
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(4)}px;
  padding-top: ${props => props?.theme?.WP(2)}px;
  padding-bottom: ${props => props?.theme?.WP(2)}px;
`;

export const PlaceOrderButton = styled(TouchableOpacity)`
  border-radius: ${props => props?.theme?.WP(4)}px;
  background-color: ${props => props?.theme?.DefaultPalette()?.primary?.main};
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(4)}px;
  padding-top: ${props => props?.theme?.WP(3)}px;
  padding-bottom: ${props => props?.theme?.WP(3)}px;
  margin-bottom: ${props => props?.theme?.WP(3)}px;
  margin-left: ${props => props?.theme?.WP(3)}px;
  margin-right: ${props => props?.theme?.WP(3)}px;
`;
