import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {Text, Image, View, Pressable, TouchableOpacity} from 'react-native';

export const ProfileImageWrapper = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: ${props => props?.theme?.WP(7)}px;
  margin-bottom: ${props => props?.theme?.WP(5)}px;
  width: ${props =>
    props?.size?.width
      ? props?.theme?.WP(props?.size?.width)
      : props?.theme?.WP(30)}px;
  height: ${props =>
    props?.size?.height
      ? props?.theme?.WP(props?.size?.height)
      : props?.theme?.WP(30)}px;
  border-radius: ${props => props?.theme?.WP(50)}px;
  border-width: ${props => (props?.border?.width ? props?.border?.width : 0)}px;
  border-color: ${props =>
    props?.border?.color ? props?.border?.color : 'transparent'};
`;

export const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${props => props?.theme?.WP(50)}px;
`;

export const ProfileCardContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BadgeGradient = styled(LinearGradient)`
  align-items: flex-start;
  justify-content: center;
  border-radius: ${props => props.theme.WP(10)}px;
  max-height: ${props => props.theme.WP(6)}px;
  padding-top: ${props => props.theme.WP(0)}px;
  margin-bottom: ${props => props.theme.WP(1)}px;
  padding-bottom: ${props => props.theme.WP(0)}px;
  padding-right: ${props => props.theme.WP(1)}px;
  padding-left: ${props => props.theme.WP(1)}px;
`;

export const ProfileDetailsWrapper = styled(View)`
  overflow: hidden;
  max-width: 60%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ProfileAvatar = styled(Image)`
  margin-left: auto;
  margin-right: ${props => props.theme.WP('3')}px;
  width: ${props => props.theme.WP('29.5')}px;
  height: ${props => props.theme.WP('29.5')}px;
  border-radius: ${props => props.theme.WP('50')}px;
`;

export const UserName = styled(Text)`
  font-size: ${props => props.theme.WP('6')}px;
  font-family: ${props => props.theme.fonts.PoppinsBold};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.DefaultPalette().primary.contrastText};
`;

export const BadgeWrapper = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  border-radius: ${props => props.theme.WP('10')}px;
  background-color: ${props => (props?.bg ? props?.bg : 'transparent')};
`;

export const ProfilePrimaryLabel = styled(Text)`
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: ${props =>
    props?.size ? props.theme.WP(props?.size) : props.theme.WP('2.8')}px;
  font-family: ${props => props.theme.fonts.PoppinsSemiBold};
  color: ${props =>
    props?.color ? props?.color : props.theme.DefaultPalette().primary.main};
`;

export const EditProfileIndicator = styled(Pressable)`
  position: absolute;
  top: 0;
  right: ${props => props.theme.WP('-3')}px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.WP('7')}px;
  height: ${props => props.theme.WP('7')}px;
  border-radius: ${props => props.theme.WP('5')}px;
  border-color: ${props => props.theme.DefaultPalette().borders.inputBorder};
  background-color: ${props => props.theme.DefaultPalette().primary.extraLight};
`;
