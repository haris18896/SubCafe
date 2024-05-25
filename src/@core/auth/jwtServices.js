import axios from 'axios';

// ** Utils
import {showToast} from '../../utils/utils';
import {navigateTo} from '../../navigation/utils';

// ** Third Party Packages
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MAIN_URL} from '../../utils/constants';

export default class JwtService {
  jwtConfig = {};

  constructor(jwtOverrideConfig) {
    this.jwtConfig = {...this.jwtConfig, ...jwtOverrideConfig};

    axios.interceptors.request.use(
      async config => {
        const token = await AsyncStorage.getItem('token');
        config.headers['Content-Type'] = 'multipart/form-data';
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      error => Promise.reject(error),
    );

    axios.interceptors.response.use(
      response => response,
      async error => {
        const {response} = error;
        if (response && response.status === 401) {
          await this.removeData('token');
          navigateTo('Auth');
        }

        return Promise.reject(error);
      },
    );
  }

  // ** API_ENDPOINT: Users API CALLS
  login = async credentials => {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return axios.post(`${MAIN_URL}/api/loginUser`, formData, config);
  };

  register = async data => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('last_name', data.last_name);
    formData.append('first_name', data.first_name);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return axios.post(`${MAIN_URL}/api/registeruser`, formData, config);
  };

  // ** API_ENDPOINT: Restaurants
  getRestaurants = () => {
    return axios.get(`${MAIN_URL}/api/getResturantlist`);
  };

  getRestaurantMenu = data => {
    return axios.get(
      `${MAIN_URL}/api/getMenuOfResutrant?resturant_id=${data?.resturant_id}`,
    );
  };

  // ** API_ENDPOINT: Orders

  createOrder = async data => {
    const formData = new FormData();
    formData.append('dine_in', data.dine_in);
    formData.append('user_id', data.user_id);
    formData.append('resturant_id', data.resturant_id);
    formData.append('food_item_ids', data.food_item_ids);
    formData.append('special_order', data.special_order);
    formData.append('table_reservation', data.table_reservation);
    formData.append('reservation_end_time', data.reservation_end_time);
    formData.append('reservation_start_time', data.reservation_start_time);
    formData.append(
      'special_order_description',
      data.special_order_description,
    );

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return axios.post(`${MAIN_URL}/api/createOrder`, formData, config);
  };

  getOrder = () => {
    return axios.get(`${MAIN_URL}api/getOrder`);
  };

  getOrderOfOneRestaurant = data => {
    return axios.get(
      `${MAIN_URL}/api/getOrderOfOneResurant?restaurant_id=${data?.restaurant_id}`,
    );
  };
}
