import axios from 'axios';

// ** Utils
import {navigateTo} from '../../navigation/utils';
import {getData, MAIN_URL} from '../../utils/constants';

// ** Third Party Packages
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  deleteAccount = async data => {
    return axios.delete(`${MAIN_URL}/api/deleteUser?userId=${data?.userId}`);
  };

  updateAccount = async ({userId, data}) => {
    return axios.put(`${MAIN_URL}/api/updateUser?id=${userId}`, data);
  };

  updateUserImage = async ({userId, data}) => {
    const token = await getData('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    return axios
      .put(`${MAIN_URL}/api/updateUser?id=${userId}`, data, config)
      .then(response => {
        console.log('check for response...', JSON.stringify(response));
        return response;
      })
      .catch(error => {
        console.log('check error in services...', error);
        throw error;
      });
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
    console.log('order initiating....');
    const token = await getData('token');
    const formData = new FormData();
    formData.append('user_id', data.user_id);
    formData.append('resturant_id', data.resturant_id);
    formData.append('food_item_ids', data.food_item_ids);
    formData.append('special_order', data.special_order);

    if (data?.special_order) {
      formData.append(
        'special_order_description',
        data.special_order_description,
      );
    }

    if (data?.type === 'delivery') {
      formData.append('delivery', data.delivery);
      formData.append('delivery_address', data.delivery_address);
    }

    if (data?.type !== 'takeAway') {
      formData.append('take_away', data.take_away);
    }

    if (data?.type === 'booking') {
      formData.append('dine_in', data.dine_in);
      formData.append('table_reservation', data.table_reservation);
      formData.append('reservation_end_time', data.reservation_end_time);
      formData.append('reservation_start_time', data.reservation_start_time);
    }

    console.log(data?.type, 'checking for data : ', formData);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.post(`${MAIN_URL}/api/createOrder`, formData, config);
  };

  getOrder = async data => {
    const token = await getData('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .get(`${MAIN_URL}/api/getOrder`, config)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  };

  getOrderOfOneRestaurant = data => {
    return axios.get(
      `${MAIN_URL}/api/getOrderOfOneResurant?restaurant_id=${data?.restaurant_id}`,
    );
  };

  tableBooking = async data => {
    const token = await getData('token');
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('user_id', data.user_id);
    formData.append('end_time', data.end_time.toString());
    formData.append('start_time', data.start_time.toString());
    formData.append('no_of_tables_booked', data.no_of_tables_booked);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return axios.post(`${MAIN_URL}/api/tableBookng`, formData, config);
  };
}
