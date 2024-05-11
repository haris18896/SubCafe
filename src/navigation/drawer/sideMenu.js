import React from 'react';

// ** Utils
import {AppBottomTab, resizeMode} from '../../utils/constants';

// ** Third Party Packages
import {DrawerActions} from '@react-navigation/native';

// ** Custom Components
import {appImages} from '../../assets';

// ** Store && Actions
import {useSelector} from 'react-redux';
import {
  DrawerAvatarContainer,
  DrawerAvatarWrapper,
  DrawerFooter,
  DrawerListWrapper,
  DrawerWrapper,
  MenuItemComponent,
  MenuItemText,
  ProfileImage,
  ProfileImageWrapper,
  UserDetail,
  UserDetailText,
  UserDetailWrapper,
} from '../../styles/components';

// ** SVGs
// import SalusLogo from '../../assets/svgs/SalusWhiteLogo.svg';

const SideMenu = ({state, navigation}) => {
  // ** Store
  const {userMe} = useSelector(data => data?.auth);

  const onClose = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const gotoProfileScreen = () => {
    onClose();
    navigation.navigate('ProfileStack');
  };

  return (
    <DrawerWrapper>
      <DrawerAvatarWrapper onPress={gotoProfileScreen}>
        <DrawerAvatarContainer>
          <ProfileImageWrapper
            border={{width: 2, color: 'white'}}
            size={{width: 20, height: 20}}>
            <ProfileImage
              source={
                userMe?.currentUser?.avatar_url &&
                userMe?.currentUser?.avatar_url !== 'original/missing.png'
                  ? {uri: userMe?.currentUser?.avatar_url}
                  : appImages?.noUser
              }
              resizeMode={resizeMode}
            />
          </ProfileImageWrapper>

          <UserDetailWrapper>
            <UserDetail marginBottom={0.5}>
              <UserDetailText fontWeight={600}>Haris Ahmad Khan</UserDetailText>
            </UserDetail>
            <UserDetail>
              <UserDetailText fontWeight={400}>
                haris18896@gmail.com
              </UserDetailText>
            </UserDetail>
          </UserDetailWrapper>
        </DrawerAvatarContainer>
      </DrawerAvatarWrapper>

      {AppBottomTab.length > 0 && (
        <DrawerListWrapper
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {AppBottomTab.map((item, index) => {
            const isActive = item.list.includes(state.routes[state.index].name);
            return (
              <MenuItemComponent
                key={index}
                active={isActive}
                onPress={() =>
                  navigation.navigate('BottomTab', {screen: item?.screen})
                }>
                {isActive ? item?.iconActive : item?.icon}
                <MenuItemText active={isActive} fontWeight={400}>
                  {item?.name}
                </MenuItemText>
              </MenuItemComponent>
            );
          })}
        </DrawerListWrapper>
      )}

      <DrawerFooter>
        {/*<SalusLogo width={AppTheme?.WP(25)} height={AppTheme?.WP(20)} />*/}
      </DrawerFooter>
    </DrawerWrapper>
  );
};
export default SideMenu;
