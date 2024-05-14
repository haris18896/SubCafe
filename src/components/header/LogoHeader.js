import React, {useLayoutEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

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
import {TextItem} from '../../styles/typography';

const LogoHeader = () => {
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
        <SubCafeHeaderLogoWrapper style={styles.profile}>
          <SubCafeHeaderLogo
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            style={styles.profileImage}
          />
        </SubCafeHeaderLogoWrapper>
        <SubCafeHeaderDetailsContainer style={styles.headerText}>
          <TextItem family="PoppinsMedium">Deliver Now!</TextItem>
          <TextItem
            size={5}
            family="PoppinsMedium"
            color={AppTheme?.DefaultPalette()?.secondary?.main}>
            Haris Ahmad Khan
          </TextItem>
        </SubCafeHeaderDetailsContainer>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icons.UserIcon
            size={35}
            color={AppTheme?.DefaultPalette()?.primary?.main}
          />
        </TouchableOpacity>
      </SubCafeHeaderContainer>

      {/* Search */}
      {/*<View style={styles.search}>*/}
      {/*  <View style={styles.searchInput}>*/}
      {/*    <Icons.SearchIcon color="gray" size={20} />*/}
      {/*    <TextInput*/}
      {/*      placeholder="Restaurants and Cuisines"*/}
      {/*      keyboardType="default"*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*  <Icons.AdjustmentsIcon color="#00ccbb" size={20} />*/}
      {/*</View>*/}
    </SubCafeHeader>
  );
};

const styles = StyleSheet.create({
  headerTextLargeText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderRadius: 4,
  },
  searchInput: {
    marginRight: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
  },
});

export {LogoHeader};
