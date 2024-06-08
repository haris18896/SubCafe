import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Progress from 'react-native-progress';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// ** Custom Components
import {appImages} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  cleanBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../../redux/Basket';
import {getData} from '../../utils/constants';
import {createOrderAction} from '../../redux/Orders';

const PreparingOrder = () => {
  // ** Params
  const route = useRoute();
  const deliveryAddress = route?.params?.deliveryAddress;
  const specialOrderDescription = route?.params?.specialOrderDescription;

  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const {restaurant} = useSelector(state => state?.restaurants);

  const apiCall = async () => {
    const user = await getData('user');
    return new Promise((resolve, reject) => {
      dispatch(
        createOrderAction({
          data: {
            type: restaurant?.type,
            user_id: JSON.parse(user)?.id,
            resturant_id: restaurant?.id,
            food_item_ids: JSON.stringify(items.map(item => item?.id)),
            special_order: specialOrderDescription.length > 0,
            special_order_description: specialOrderDescription,
            take_away: restaurant?.type === 'takeAway',
            delivery: restaurant?.type === 'delivery',
            delivery_address: deliveryAddress,
            dine_in: restaurant?.type === 'booking',
            table_reservation: restaurant?.type === 'booking',
            reservation_start_time: restaurant?.reservation_start_time,
            reservation_end_time: restaurant?.reservation_end_time,
          },
          refreshing: () => {},
          errorCallback: err => {
            navigation.navigate('Basket');
            reject(err);
          },
          callback: () => {
            navigation.navigate('Delivery');
            dispatch(cleanBasket());
            resolve();
          },
        }),
      );
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
