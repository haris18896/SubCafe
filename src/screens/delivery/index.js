import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Progress from 'react-native-progress';
import * as Icons from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

// ** Store && Actions
import {useSelector} from 'react-redux';
import {selectRestaurant} from '../../redux/Restaurant';
import {selectBasketItems, selectBasketTotal} from '../../redux/Basket';
import {getData} from '../../utils/constants';

const Delivery = () => {
  const navigation = useNavigation();

  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  // ** States
  const [user, setUser] = useState({});

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      const userData = await getData('user');
      setUser(JSON.stringify(userData));
    });
  }, [navigation]);

  console.log('user : ', user);

  const handlePressCall = () => {
    const phoneNumber = `tel:${restaurant.phone}`;
    Linking.openURL(phoneNumber).catch(err =>
      console.error('Error opening dialer', err),
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icons.XCircleIcon
              color={AppTheme?.DefaultPalette()?.primary?.main}
              size={30}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontSize: 16, color: '#9CA3AF'}}>
                Estimated Arrival
              </Text>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                45-55 Minutes
              </Text>
            </View>
            <Image
              source={{uri: 'https://links.papareact.com/fls'}}
              style={{width: 100, height: 100}}
            />
          </View>

          <Progress.Bar
            size={30}
            color={AppTheme?.DefaultPalette()?.primary?.main}
            indeterminate={true}
          />

          <Text style={{marginTop: 10, color: '#9CA3AF'}}>
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <SafeAreaView style={styles.riderContainer}>
        <Image
          source={{uri: 'https://links.papareact.com/wru'}}
          style={styles.riderImage}
        />
        {/*<View style={styles.riderDetails}>*/}
        {/*  <Text style={{fontSize: 18}}>Haris Ahmad Khan</Text>*/}
        {/*  <Text style={{color: '#9CA3AF'}}>Your Rider</Text>*/}
        {/*</View>*/}
        <TouchableOpacity onPress={() => handlePressCall()}>
          <Text style={styles.callButton}>Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme?.DefaultPalette()?.background?.paper,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    zIndex: 50,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: AppTheme?.DefaultPalette()?.primary?.main,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 10,
    padding: 10,
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    flex: 1,
    marginTop: 10,
  },
  riderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppTheme?.DefaultPalette()?.background?.paper,
    height: 120,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },
  riderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  callButton: {
    color: AppTheme?.DefaultPalette()?.primary?.main,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export {Delivery};
