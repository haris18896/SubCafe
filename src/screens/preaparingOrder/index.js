import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// ** Custom Components
import {appImages} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {selectBasketItems, selectBasketTotal} from '../../redux/Basket';
import {createOrderAction} from '../../redux/Orders';
import {getData} from '../../utils/constants';
import moment from 'moment';

const PreparingOrder = () => {
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const {restaurant} = useSelector(state => state?.restaurants);

  console.log(
    'check basketTotal : ',
    restaurant?.type,
    items.map(item => item?.id),
  );

  const apiCall = async () => {
    const user = await getData('user');
    return new Promise((resolve, reject) => {
      console.log({
        dine_in: false,
        user_id: JSON.parse(user)?.id,
        resturant_id: restaurant?.id,
        food_item_ids: items.map(item => item?.id),
        special_order: false,
        table_reservation: restaurant?.type === 'booking',
        reservation_start_time: moment().toDate(),
        reservation_end_time: moment().add(1, 'hour').toDate(),
      });
      // dispatch(
      //   createOrderAction({
      //     data: {
      //         dine_in: false,
      //         user_id: JSON.parse(user)?.id,
      //         resturant_id: restaurant?.id,
      //         food_item_ids: items.map(item => item?.id),
      //         special_order: false,
      //         table_reservation: restaurant?.type === 'booking',
      //         reservation_start_time: moment().toDate(),
      //         reservation_end_time: moment().add(1, 'hour').toDate(),
      //       },
      //     refreshing: () => {},
      //     errorCallback: err => {
      //       navigation.navigate('Basket');
      //       reject(err);
      //     },
      //     callback: () => {
      //       navigation.navigate('Delivery');
      //       resolve();
      //     },
      //   }),
      // );
    });
  };

  useEffect(() => {
    return navigation.addListener('focus', apiCall);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Image
        iterationCount={1}
        animation="slideInUp"
        style={styles.image}
        source={appImages?.mobileGif}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={styles.text}>
        Waiting for Restaurant to accept Order!
      </Animatable.Text>

      <Progress.Circle
        style={{marginTop: AppTheme?.WP(4)}}
        size={AppTheme?.WP(10)}
        indeterminate={true}
        color={AppTheme?.DefaultPalette()?.primary?.main}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    fontSize: AppTheme?.WP(5),
    color: AppTheme?.DefaultPalette()?.primary?.main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export {PreparingOrder};
