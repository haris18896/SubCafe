import styled from 'styled-components';
import {
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

// ** AuthStack Screen Main Components
export const AvoidKeyboard = styled(KeyboardAvoidingView)`
  flex: 0.2;
  justify-content: flex-end;
  margin-bottom: ${props => props.theme?.WP(4)}px;
  position: relative;
`;

export const MainContainer = styled(View)`
  position: relative;
  flex: 1;
  justify-content: ${props =>
    props?.justifyContent ? props.justifyContent : 'flex-end'};
  margin-bottom: ${props => props.theme?.WP(6)}px;
`;

export const BackgroundWrapper = styled(View)`
  width: ${props => props.theme?.scrWidth}px;
  height: ${props =>
    props?.isAndroid ? props.theme.WP(90) : props.theme.WP(95)}px;
  position: absolute;
  top: ${props => props.theme?.WP(-50)}px;
  left: 0;
  border-bottom-right-radius: ${props => props.theme.WP(10)}px;
  border-bottom-left-radius: ${props => props.theme.WP(50)}px;
  background-color: ${props => props.theme.DefaultPalette().success.main};
`;

export const ImageContainer = styled(View)`
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: ${props =>
    props?.isAndroid ? props.theme?.WP(20) : props.theme?.WP(25)}px;
  right: ${props => props.theme?.WP(2)}px;
`;

export const BackgroundImage = styled(Image)`
  width: ${props => props.theme.WP(77)}px;
  height: ${props => props.theme.WP(83)}px;
`;

export const AuthWrapper = styled(ScrollView)`
  margin-left: ${props => props.theme.WP(4)}px;
  margin-right: ${props => props.theme.WP(4)}px;
`;

export const AuthViewer = styled(ScrollView)`
  margin: ${props => (props?.margin ? props?.margin : 0)}px;
`;

export const ResetPasswordWrapper = styled(View)`
  padding-top: ${props => props.theme.WP(4)}px;
  padding-bottom: ${props => props.theme.WP(4)}px;
`;

export const AuthContainer = styled(View)`
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  justify-content: ${props => props?.justifyContent || 'flex-end'};
  height: ${props => props.theme.scrHeight / 1.7}px;
  padding-left: ${props =>
    props.theme.WP(props?.paddingHorizontal) || props.theme.WP(4)}px;
  padding-right: ${props =>
    props.theme.WP(props?.paddingHorizontal) || props.theme.WP(4)}px;
`;

export const AuthTitle = styled(Text)`
  font-size: ${props => props.theme.WP(6)}px;
  color: ${props => props.theme.DefaultPalette().common.black};
  font-family: ${props => props.theme.fonts.PoppinsMedium};
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

export const AuthSubTitle = styled(Text)`
  font-size: ${props => props.theme.WP(4)}px;
  color: ${props => props.theme.DefaultPalette().text.primary};
  font-family: ${props => props.theme.fonts.PoppinsRegular};
  font-weight: ${props => props.theme.fontWeights.regular};
`;

export const AuthLink = styled(Text)`
  font-size: ${props => props.theme.WP(4)}px;
  color: ${props => props.theme.DefaultPalette().success.main};
  font-family: ${props => props.theme.fonts.PoppinsSemiBold};
  font-weight: ${props => props.theme.fontWeights.semiBold};
`;

export const AuthFieldsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
`;
// ************************************************************************************************************************************
// ** Page Navigation between Registration and Login

export const AccountActionWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.theme.WP('4')}px;
  margin-bottom: ${props => props.theme.WP('4')}px;
`;

export const AccountActionTitle = styled(Text)`
  text-align: center;
  color: ${props => props?.labelColor};
  padding: ${props => props.theme.WP('2')}px;
  font-weight: ${props => props.theme.fontWeights.medium};
  font-size: ${props => props.theme.WP('3.5')}px;
  font-family: ${props => props.theme.fonts.PoppinsMedium};
`;

// ************************************************************************************************************************************
// ** User Activity
export const UpdateButtonWrapper = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  width: ${props => props.theme.WP(15)}px;
  height: ${props => props.theme.WP(15)}px;
  border-radius: ${props => props?.theme?.WP(50)}px;
  background-color: ${props => props?.theme?.DefaultPalette()?.success?.main};
`;

export const UserActivityWrapper = styled(View)`
  width: ${props => (props?.width ? props?.width : '100%')};
  flex-direction: ${props => (props?.direction ? props?.direction : 'row')};
  align-items: ${props => (props?.alignItems ? props?.alignItems : 'center')};
  justify-content: ${props =>
    props?.justifyContent ? props?.justifyContent : 'space-between'};
  margin-top: ${props => props?.theme?.WP(props?.marginTop) || 0}px;
  margin-bottom: ${props => props?.theme?.WP(props?.marginBottom) || 0}px;
  height: ${props =>
    props?.height ? `${props?.theme?.WP(props?.height)}px` : 'auto'};
`;

export const AuthActivityWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: ${props => props?.width || '100%'};
  margin-bottom: ${props =>
    props?.marginBottom ? props?.theme?.WP(props?.marginBottom) : '0'}px;
`;

export const AuthActivityLabel = styled(Text)`
  font-weight: ${props => props.theme.fontWeights.regular};
  font-family: ${props => props.theme.fonts.PoppinsRegular};
  color: ${props => props.theme.DefaultPalette().labels.primaryLabel};
  font-size: ${props => props.theme.WP('3')}px;
`;

// ************************************************************************************************************************************
// ** Profile Screen

export const ProfileAvatarWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.theme.HP('35')}px;
`;

export const ProfileAvatarContainer = styled(View)`
  position: relative;
  width: ${props => props.theme.WP('40')}px;
  height: ${props => props.theme.WP('40')}px;
  border-radius: ${props => props.theme.WP('50')}px;
`;

export const ProfileEditAvatar = styled(Image)`
  width: ${props => props.theme.WP('39.5')}px;
  height: ${props => props.theme.WP('39.5')}px;
  border-radius: ${props => props.theme.WP('50')}px;
`;

export const EditProfileAvatar = styled(Pressable)`
  position: absolute;
  top: ${props => props.theme.WP('7')}px;
  right: ${props => props.theme.WP('0')}px;
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

export const EditProfileContainer = styled(View)`
  flex: 1;
  height: 100%;
  flex-basis: auto;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${props => props.theme.WP('2')}px;
  margin-bottom: ${props => props.theme.WP('2')}px;
`;

export const NotificationLabel = styled(Text)`
  font-size: ${props => props.theme.WP('3')}px;
  font-weight: ${props => props.theme.fontWeights.regular};
  font-family: ${props => props.theme.fonts.PoppinsRegular};
  color: ${props => props.theme.DefaultPalette().labels.secondaryLabel};
`;

export const ModalContainer = styled(View)`
  padding: ${props => props.theme.WP(1)}px;
`;
