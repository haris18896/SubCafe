import styled from 'styled-components';
import {Text, TouchableOpacity, View} from 'react-native';

export const PaymentMethodContainer = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: ${props => props?.theme?.WP(2)}px;
  margin-right: ${props => props?.theme?.WP(2)}px;
  margin-top: ${props =>
    props?.marginTop ? props?.theme?.WP(props?.marginTop) : 0}px;
`;

export const PaymentMethodDetailsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: ${props => props?.theme?.WP(4)}px;

  flex: 1;
  padding-right: ${props => props?.theme?.WP(4)}px;
`;

export const PaymentMethodDetailsContainer = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const PaymentMethodTitle = styled(Text)`
  text-transform: capitalize;
  color: ${props => props?.theme?.DefaultPalette().grey[800]};
  font-size: ${props => props?.theme?.WP(4)}px;
  font-family: ${props => props?.theme?.fonts?.PoppinsMedium};
  font-weight: ${props => props?.theme?.fontWeights?.medium};
`;

export const PaymentMethodValue = styled(Text)`
  color: ${props => props?.theme?.DefaultPalette().grey[800]};
  font-size: ${props => props?.theme?.WP(4.5)}px;
  font-family: ${props => props?.theme?.fonts?.PoppinsSemiBold};
  font-weight: ${props => props?.theme?.fontWeights?.semiBold};
`;
