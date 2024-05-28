import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';

export const ButtonOptionWrapper = styled(View)`
  position: relative;
  width: 100%;
  margin-top: ${props =>
    props?.mt ? props?.theme?.WP(props?.mt) : props?.theme?.WP(2)}px;
`;

export const ButtonOptionContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
