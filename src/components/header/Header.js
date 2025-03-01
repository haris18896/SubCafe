import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// ** Utils
import {CommonStyles} from '../../utils/CommonStyles';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ** Custom Components

// ** SVGs
import {
  BarButton,
  UserAvatar,
  HeaderTitle,
  AvatarWrapper,
  HeaderWrapper,
  UserAvatarName,
  HeaderContainer,
  HeaderDetailWrapper,
  HeaderSectionTitle,
  UserAvatarNameText,
} from '../../styles/components';
import {Divider} from '../../styles/infrustucture';
import {SubTitle} from '../../styles/typography';
import {navigateTo} from '../../navigation/utils';
import {removeData} from '../../utils/constants';

// ** SVGs
import Bar from '../../assets/svgs/top-bar.svg';
import LogoutIcon from '../../assets/svgs/logout.svg';

const Header = ({
  avatar,
  title = ' ',
  onBack,
  divider,
  subTitle,
  onPressBar,
  avatar_url,
  titleColor,
  sectionTitle,
  padding,
  Logout,
  customStyles = {},
  SubTitleStyle = {mb: 4},
  backIconColor = false,
}) => {
  const handleLogout = async () => {
    navigateTo('Auth');
    await removeData('token');
    await removeData('favoriteItems');
  };

  return (
    <>
      <HeaderWrapper padding={padding} style={customStyles}>
        <HeaderContainer>
          {onPressBar && (
            <BarButton left={2} onPress={onPressBar}>
              <Bar width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />
            </BarButton>
          )}

          {onBack && (
            <TouchableOpacity
              style={styles.leftItem(backIconColor)}
              onPress={onBack}>
              <Icon
                name="arrow-back"
                size={AppTheme.WP(6)}
                color={
                  backIconColor ? 'white' : AppTheme.DefaultPalette().grey.arrow
                }
              />
            </TouchableOpacity>
          )}
          <HeaderDetailWrapper>
            {avatar && (
              <AvatarWrapper style={CommonStyles.smallShadow}>
                {avatar_url === 'original/missing.png' ? (
                  <UserAvatarName>
                    <UserAvatarNameText size={6}>{`${title.trim()[0]}${
                      title.trim()[1]
                    }`}</UserAvatarNameText>
                  </UserAvatarName>
                ) : (
                  <UserAvatar resizeMode={'cover'} source={{uri: avatar}} />
                )}
              </AvatarWrapper>
            )}

            {title && <HeaderTitle color={titleColor}>{title}</HeaderTitle>}
          </HeaderDetailWrapper>

          {Logout && (
            <TouchableOpacity
              style={styles.rightItem(backIconColor)}
              onPress={handleLogout}>
              <Icon
                name="logout"
                size={AppTheme.WP(6)}
                color={
                  backIconColor ? 'white' : AppTheme.DefaultPalette().grey.arrow
                }
              />
            </TouchableOpacity>
          )}
        </HeaderContainer>
      </HeaderWrapper>
      {divider && <Divider marginTop={divider} />}

      {sectionTitle && <HeaderSectionTitle>{sectionTitle}</HeaderSectionTitle>}
      {subTitle && (
        <SubTitle marginBottom={SubTitleStyle?.mb}>{subTitle}</SubTitle>
      )}
    </>
  );
};

Header.propTypes = {
  titleColor: PropTypes.string,
  avatar: PropTypes.bool,
  title: PropTypes.string,
  onBack: PropTypes.func,
  customStyles: PropTypes?.object,
  divider: PropTypes.number,
  backIconColor: PropTypes.any,
  HeaderSectionTitle: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleStyle: PropTypes?.object,
};

const styles = StyleSheet.create({
  leftItem: backIconColor => ({
    position: 'absolute',
    left: 0,
    zIndex: 100,
    borderRadius: AppTheme?.WP(10),
    paddingVertical: AppTheme?.WP(1.5),
    paddingHorizontal: AppTheme?.WP(1.5),
    backgroundColor: backIconColor
      ? AppTheme?.DefaultPalette()?.primary.main
      : 'transparent',
  }),

  rightItem: backIconColor => ({
    position: 'absolute',
    right: 0,
    zIndex: 100,
    borderRadius: AppTheme?.WP(10),
    paddingVertical: AppTheme?.WP(1.5),
    paddingHorizontal: AppTheme?.WP(1.5),
    backgroundColor: backIconColor
      ? AppTheme?.DefaultPalette()?.primary.main
      : 'transparent',
  }),
});

export {Header};
