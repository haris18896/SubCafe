import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ** Custom Components
import {
  Logo,
  TopHeaderLabel,
  SpaceBetweenWrapper,
  IconPlaceholder,
} from '../../Styles';
import {appImages} from '../../assets';

// ** Store & Actions
import {useDispatch} from 'react-redux';
import {Logout} from '../../redux/Auth';
import useJwt from '../../@core/auth/useJwt';

export const TopHeader = props => {
  const {
    title,
    information,
    onPressRight,
    goBack = false,
    profile = false,
  } = props;

  // ** navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** Function: Logout
  const handleLogout = async () => {
    await useJwt.setData('token', '');
    dispatch(Logout());
    navigation.navigate('Auth');
  };

  return (
    <SpaceBetweenWrapper style={{marginLeft: AppTheme.WP(2)}}>
      {goBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-ios"
            size={AppTheme.WP(5)}
            color={AppTheme.DefaultPalette().primary.contrastText}
          />
        </TouchableOpacity>
      ) : (
        <Logo source={appImages.logo} />
      )}
      <TopHeaderLabel>{title}</TopHeaderLabel>
      {profile ? (
        <IconButton
          icon="logout"
          style={{width: AppTheme.WP(10)}}
          size={AppTheme.WP('5')}
          onPress={() => handleLogout()}
          iconColor={AppTheme.DefaultPalette().primary.contrastText}
        />
      ) : information ? (
        <IconButton
          icon="information-outline"
          onPress={onPressRight}
          style={{width: AppTheme.WP(10)}}
          size={AppTheme.WP(8)}
          iconColor={AppTheme.DefaultPalette().primary.contrastText}
        />
      ) : (
        <IconPlaceholder />
      )}
    </SpaceBetweenWrapper>
  );
};

const styles = StyleSheet.create({
  info: theme => ({
    color: theme.DefaultPalette().primary.contrastText,
    borderWidth: theme.WP(0.5),
    fontSize: theme.WP(4),
    fontWeight: theme.fontWeights.semiBold,
    fontFamily: theme.fonts.PoppinsSemiBold,
    borderColor: theme.DefaultPalette().primary.contrastText,
    backgroundColor: 'transparent',
    marginBottom: theme?.WP(1),
  }),
});
