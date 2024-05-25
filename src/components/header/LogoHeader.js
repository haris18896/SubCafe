import React, {useLayoutEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';
import * as Icons from 'react-native-heroicons/outline';

// ** Custom Components
import {
  SubCafeHeader,
  SubCafeHeaderLogo,
  SubCafeHeaderContainer,
  SubCafeHeaderLogoWrapper,
  SubCafeHeaderDetailsContainer,
} from '../../styles/components';
import {appIcons, appImages} from '../../assets';
import {TextItem} from '../../styles/typography';
import {TextInput} from '../../@core/components';

// ** Store && Actions
import {useSelector} from 'react-redux';

const LogoHeader = props => {
  // ** Props
  const {search, setSearch} = props;

  // ** Refs
  const searchRef = useRef(null);

  // ** Store
  const {login} = useSelector(state => state?.auth);

  // ** Navigation
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SubCafeHeader>
      <SubCafeHeaderContainer>
        {/*  /!* LogoHeader *!/*/}
        <SubCafeHeaderLogoWrapper>
          <SubCafeHeaderLogo source={appImages?.Logo} />
        </SubCafeHeaderLogoWrapper>
        <SubCafeHeaderDetailsContainer>
          <TextItem family="PoppinsMedium">Deliver Now!</TextItem>
          <TextItem
            size={5}
            family="PoppinsMedium"
            color={AppTheme?.DefaultPalette()?.secondary?.main}>
            {`${login?.first_name} ${login?.last_name}`}
          </TextItem>
        </SubCafeHeaderDetailsContainer>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icons.UserIcon
            size={AppTheme?.WP(7)}
            color={AppTheme?.DefaultPalette()?.primary?.main}
          />
        </TouchableOpacity>
      </SubCafeHeaderContainer>

      <TextInput
        height={AppTheme?.WP(9)}
        title={''}
        value={search}
        ref={searchRef}
        multiline={false}
        disabled={false}
        variant={'outlined'}
        inputMode={'text'}
        returnKeyType={'done'}
        styleData={{
          labelStyles: {
            color: AppTheme?.DefaultPalette()?.grey[100],
          },
        }}
        secureTextEntry={false}
        onChangeText={text => setSearch(text)}
        placeholder={'Restaurants and Cuisines'}
        imageIcon={{left: {icon: appIcons?.search, width: 4, height: 4}}}
        submit={() => {}}
      />
    </SubCafeHeader>
  );
};

export {LogoHeader};
