import styled from 'styled-components';
import {View} from 'react-native';

export const FeatureRowWrapper = styled(View)`
  margin-top: ${props => props?.theme?.WP(4)}px;
  padding-left: ${props => props?.theme?.WP(2)}px;
  padding-right: ${props => props?.theme?.WP(2)}px;
`;

export const FeatureRowHeader = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
