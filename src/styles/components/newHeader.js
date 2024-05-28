import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';

export const SubCafeHeader = styled(View)`
  margin-bottom: ${props => props?.theme?.WP(1)}px;
`;

export const SubCafeHeaderContainer = styled(View)`
  flex-direction: row;
  padding-bottom: ${props => props?.theme?.WP(1)}px;
  align-items: center;
  justify-content: space-between;
`;

export const SubCafeHeaderLogoWrapper = styled(TouchableOpacity)`
  background-color: transparent;
  border-radius: ${props => props?.theme?.WP(10)}px;
`;

export const SubCafeHeaderLogo = styled(Image)`
  width: ${props => props?.theme?.WP(14)}px;
  height: ${props => props?.theme?.WP(14)}px;
  border-radius: ${props => props?.theme?.WP(10)}px;
  background-color: ${props => props?.theme?.DefaultPalette().grey[200]};
`;
export const SubCafeHeaderDetailsContainer = styled(View)`
  flex: 1;
  margin-left: ${props => props?.theme?.WP(3)}px;
`;
