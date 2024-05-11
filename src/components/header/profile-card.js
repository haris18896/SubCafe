import React, {useMemo} from 'react';

// ** Utils
import {formatFullName} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import moment from 'moment';
import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {Spacer} from '../spacer';
import {appImages} from '../../assets';
import {ProfileCardSkeleton} from '../../Styles/skeletons';

// ** Store
import {useSelector} from 'react-redux';
import {
  EditProfileIndicator,
  ProfileAvatar,
  ProfileCardContainer,
  ProfileDetailsWrapper,
  UserName,
} from '../../styles/components';

export const ProfileCard = props => {
  // ** Store
  const {userMe, avatar} = useSelector(state => state.auth);

  const {refreshing = false, profile = false} = props;

  // ** navigation
  const navigation = useNavigation();

  // ** Function: Memoization of the membership id
  const memberShipId = useMemo(() => {
    if (userMe && userMe.membershipTypeId) {
      switch (userMe.membershipTypeId) {
        case 1:
          return 'Touring Pro';
        case 2:
          return 'Gold Member';
        default:
          return 'Gold Member';
      }
    }
    return 'Gold Member';
  }, [userMe]);

  // ** badges list
  const profileBadgesList = [
    {
      icon: 'star',
      showBadge: true,
      secondIcon: true,
      onPress: () => {},
      iconSize: AppTheme.WP(4),
      data: userMe?.membershipTypeId,
      label: memberShipId,
      labelColorBG: 'red',
      labelColor:
        userMe?.membershipTypeId === parseInt(1, 10)
          ? AppTheme.DefaultPalette().warning.dark
          : AppTheme.DefaultPalette().primary.contrastText,
      iconColor:
        userMe?.membershipTypeId === parseInt(1, 10)
          ? AppTheme.DefaultPalette().warning.dark
          : AppTheme.DefaultPalette().primary.contrastText,
    },
    {
      icon: 'star',
      showBadge: true,
      secondIcon: false,
      onPress: () => {},
      iconSize: AppTheme.WP(3.5),
      data: null,
      label: `Reviewed: ${moment(userMe?.ssrReviewSince).format('M/d/YY')}`,
      labelColor: AppTheme.DefaultPalette().primary.contrastText,
      iconColor: AppTheme.DefaultPalette().primary.contrastText,
    },
    {
      showBadge: true,
      secondIcon: false,
      onPress: () => {},
      icon: 'calendar-week',
      iconSize: AppTheme.WP(3.5),
      data: null,
      label: `Renewal Date: ${moment(userMe?.renewedDate, 'M/D/YYYY').format(
        'M/D/YY',
      )}`,
      labelColor: AppTheme.DefaultPalette().primary.contrastText,
      iconColor: AppTheme.DefaultPalette().primary.contrastText,
    },
  ];

  return (
    <>
      {refreshing ? (
        <ProfileCardSkeleton />
      ) : (
        <ProfileCardContainer>
          <ProfileDetailsWrapper>
            <Spacer bottom={5}>
              <UserName>
                {formatFullName(userMe?.firstname, userMe?.lastname)}
              </UserName>
            </Spacer>

            {/*{profileBadgesList.map((item, index) => {*/}
            {/*  if (item.showBadge) {*/}
            {/*    return (*/}
            {/*      <Badge*/}
            {/*        key={index}*/}
            {/*        icon={item?.icon}*/}
            {/*        data={item?.data}*/}
            {/*        label={item?.label}*/}
            {/*        iconSize={item?.iconSize}*/}
            {/*        iconColor={item?.iconColor}*/}
            {/*        rightIcon={item?.secondIcon}*/}
            {/*        labelColor={item?.labelColor}*/}
            {/*        labelColorBG={item?.labelColorBG}*/}
            {/*      />*/}
            {/*    );*/}
            {/*  }*/}
            {/*})}*/}
          </ProfileDetailsWrapper>

          <ProfileAvatar
            resizeMode={'cover'}
            source={
              avatar ? {uri: avatar?.data?.uri} : appImages.profilePlaceholder
            }
          />

          {profile && (
            <EditProfileIndicator
              onPress={() => navigation.navigate('EditProfile')}>
              <IconButton
                icon={'pencil-outline'}
                size={AppTheme.WP('4.5')}
                iconColor={AppTheme.DefaultPalette().primary.contrastText}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              />
            </EditProfileIndicator>
          )}
        </ProfileCardContainer>
      )}
    </>
  );
};
