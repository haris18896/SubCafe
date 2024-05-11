import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity} from 'react-native';

export const BarButton = styled(TouchableOpacity)`
  position: absolute;
  left: ${props =>
    props?.left ? props?.theme?.WP(props?.left) : props.theme.WP(4)}px;
`;

export const HeaderWrapper = styled(View)`
  padding-left: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(4)}px;
`;

export const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: ${props =>
    props?.justifyContent ? props?.justifyContent : 'center'};
`;

export const HeaderDetailWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const AvatarWrapper = styled(View)`
  width: ${props => props?.theme?.WP(13)}px;
  height: ${props => props?.theme?.WP(13)}px;
  border-radius: ${props => props?.theme?.WP(20)}px;
  margin-right: ${props => props?.theme?.WP(2)}px;
  background-color: ${props =>
    props?.theme?.DefaultPalette().background?.paper};
`;

export const Avatar = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(20)}px;
`;

export const HeaderTitle = styled(Text)`
  color: ${props => (props?.color ? props?.color : '#0A0615')};
  font-size: ${props => props?.theme?.WP(5.6)}px;
  font-family: ${props => props?.theme?.fonts.PoppinsMedium};
  font-weight: ${props => props?.theme?.fontWeights.semiBold};
  flex: 1;
  flex-wrap: wrap;
  padding-left: ${props => props?.theme?.WP(10)}px;
  padding-right: ${props => props?.theme?.WP(10)}px;
  text-align: center;
`;

export const HeaderSectionTitle = styled(Text)`
  margin-top: ${props => props?.theme?.WP(5)}px;
  text-align: center;
  color: ${props => (props?.color ? props?.color : '#0A0615')};
  font-size: ${props => props?.theme?.WP(6.2)}px;
  font-family: ${props => props?.theme?.fonts.PoppinsSemiBold};
  font-weight: ${props => props?.theme?.fontWeights.semiBold};
`;

export const UserAvatar = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(20)}px;
`;

export const UserAvatarName = styled(View)`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(20)}px;
  align-items: center;
  justify-content: center;
`;

export const UserAvatarNameText = styled(Text)`
  text-align: center;
  font-weight: bold;
  font-family: ${props => props?.theme?.fonts?.PoppinsBold};
  font-size: ${props =>
    props?.size ? props?.theme?.WP(props?.size) : props?.theme?.WP(8)}px;
  color: ${props => props?.theme?.DefaultPalette().primary?.main};
`;
