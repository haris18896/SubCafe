import styled from 'styled-components';
import {Text, View, Image} from 'react-native';

export const PaymentCardWrapper = styled(View)`
  background-color: ${props =>
    props.type === 'VisaCard'
      ? props?.theme?.DefaultPalette()?.primary?.light
      : props?.type === 'MasterCard'
      ? props?.theme?.DefaultPalette()?.grey[800]
      : props?.theme?.DefaultPalette()?.grey[900]};
  padding-top: ${props => props?.theme?.WP(3)}px;
  padding-bottom: ${props => props?.theme?.WP(3)}px;
  padding-left: ${props => props?.theme?.WP(2)}px;
  padding-right: ${props => props?.theme?.WP(2)}px;
  width: ${props => props?.theme?.WP(24)}px;
  height: ${props => props?.theme?.WP(16)}px;
  border-radius: ${props => props?.theme?.WP(2)}px;
`;

export const PaymentCardContainer = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex: 1;
`;

export const PaymentCardBank = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: ${props => props?.theme?.WP(0.5)}px;
  justify-content: space-between;
`;

export const PaymentCardText = styled(Text)`
  text-transform: uppercase;
  color: ${props => props?.theme?.DefaultPalette().common.white};
  font-size: ${props => props?.theme?.WP(1.7)}px;
  font-family: ${props => props?.theme?.fonts?.PoppinsMedium};
  font-weight: ${props =>
    props?.fontWeight || props?.theme?.fontWeights?.medium};
`;

export const PaymentCardSim = styled(Image)`
  width: ${props => props?.theme?.WP(5)}px;
  height: ${props => props?.theme?.WP(2.7)}px;
  border-radius: ${props => props?.theme?.WP(0.5)}px;
`;

export const PaymentCardTypeContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  flex: 1;
  justify-content: space-between;
`;

export const PaymentCardType = styled(Image)`
  width: ${props => props?.theme?.WP(7)}px;
  height: ${props => props?.theme?.WP(4)}px;
`;
