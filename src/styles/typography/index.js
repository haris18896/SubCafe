import styled from 'styled-components';
import {Text} from 'react-native';

export const Title = styled(Text)`
  text-align: ${props => props?.textAlign || 'left'};
  font-family: ${props => props?.theme?.fonts?.PoppinsBold};
  font-weight: ${props => props?.theme?.fontWeights?.semiBold};
  font-size: ${props => props?.theme?.WP(7)}px;
  color: ${props => props?.theme?.DefaultPalette().common.black};
`;

export const SubTitle = styled(Text)`
  text-align: center;
  margin-top: ${props => props?.theme?.WP(1)}px;
  margin-bottom: ${props =>
    props?.theme?.WP(props?.marginBottom) || props?.theme?.WP(4)}px;
  font-size: ${props =>
    props?.size ? props?.theme?.WP(props?.size) : props.theme.WP(4.4)}px;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-family: ${props => props.theme.fonts.PoppinsSemiBold};
  color: ${props => props?.color || props?.theme.DefaultPalette().grey[600]};
`;

export const SectionTitle = styled(Text)`
  font-size: ${props => props.theme.WP(4.2)}px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-family: ${props => props.theme.fonts.PoppinsSemiBold};
  color: ${props =>
    props?.color ? props?.color : props?.theme.DefaultPalette().common.black};
`;

export const DashboardItemTitle = styled(Text)`
  color: ${props => props?.theme?.DefaultPalette().common.black};
  font-size: ${props => props?.theme?.WP(3)}px;
  font-family: ${props => props?.theme?.fonts?.PoppinsMedium};
  font-weight: ${props => props?.theme?.fontWeights?.medium};
`;

export const ModelText = styled(Text)`
  color: ${props => props?.theme?.DefaultPalette().grey[800]};
  font-size: ${props => props?.theme?.WP(4)}px;
  font-family: ${props => props?.theme?.fonts?.PoppinsMedium};
  font-weight: ${props => props?.theme?.fontWeights?.medium};
`;
