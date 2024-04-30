import {Platform} from 'react-native';

// ** Third Party Packages
import moment from 'moment';
import Toast from 'react-native-toast-message';

// ** Custom Packages
import {theme as AppTheme} from '../@core/infrustructure/theme';
import {navigateTo} from '../navigation/utils';
import {clearAllData, removeData} from './constants';

export const isTablet = AppTheme?.scrWidth >= 500;
export const isAndroid = Platform.OS === 'android';

// ** Function: Check if object is empty
export const isObjEmpty = obj => Object.keys(obj).length === 0;

// ** Function: Show a toast message component
export const showToast = ({
  title = 'Title',
  message = 'Message',
  type = 'success',
}) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    topOffset: Platform.OS === 'ios' ? AppTheme.WP(15) : AppTheme.WP(10),
    customText: {
      text1: {
        fontSize: AppTheme.WP(5),
        fontFamily: AppTheme.fonts.PoppinsSemiBold,
        fontWeight: AppTheme.fontWeights.semiBold,
      },
      text2: {
        fontSize: AppTheme.WP(3.5),
        fontFamily: AppTheme.fonts.PoppinsMedium,
        fontWeight: AppTheme.fontWeights.medium,
      },
    },
  });
};

// ** Function: Logout on Error
export const LogoutOnError = async ({error}) => {
  if (
    ['API Key is Invalid', 'Request failed with status code 401'].includes(
      error?.message,
    )
  ) {
    await removeData('token');
    await clearAllData();
    navigateTo('Auth');
    showToast({
      type: 'error',
      title: 'Error',
      message: error?.message,
    });
  }
};

// ** Function: Check if formik values have changed
export const FormikValuesChanged = (formikInitialValues, formikValues) => {
  for (const key in formikValues) {
    if (formikValues[key] === formikInitialValues[key]) {
      return true;
    }
  }

  return false;
};

// ** Function: Formatted Name
export const formatFullName = (firstname, lastname) => {
  let fullName = firstname;

  if (lastname) {
    fullName += ` ${lastname}`;
  }

  return fullName;
};

// ** Function: Formatted lastname
export const formatLastName = name => {
  const nameParts = name.split(' ');

  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[1][0];

    return `${firstName} ${lastNameInitial}.`;
  } else {
    return name;
  }
};

// ** Function: Formatting text on the basis of text length
export const ellipsisText = (text, maxLength) => {
  if (maxLength && text) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  } else {
    return text;
  }
};

// ** Function: Today date format
export const TodayFormat = (dateString, pastSession) => {
  const date = moment(dateString, 'YYYY-MM-DD hh:mm:ss Z');
  const today = moment().startOf('day');

  if (date.isSame(today, 'day')) {
    return `Today, ${date.format('hh:mm A')}`;
  } else if (pastSession) {
    return `${moment(date, 'YYYY-MM-DD hh:mm:ss').format(
      'dddd hh:mm A',
    )} (${moment(date, 'YYYY-MM-DD hh:mm:ss').format('DD-MM-YYYY')})`;
  } else {
    return date.format('dddd hh:mm A');
  }
};

// ** Function: Close to bottom function to check if the list has more data to fetch
export const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}) => {
  const paddingToBottom = AppTheme?.WP(5);
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

// ** Function: USA phone formatter
export const formatUSAPhoneNumber = phoneNumber => {
  const digits = phoneNumber && phoneNumber.replace(/\D/g, '');

  if (phoneNumber.startsWith('1')) {
    phoneNumber = phoneNumber.slice(1);
  } else if (phoneNumber.startsWith('+1')) {
    phoneNumber = phoneNumber.slice(2);
  }

  const formattedDigits = digits.length === 11 ? digits.slice(1) : digits;

  const countryCode = formattedDigits.slice(0, 3);
  const areaCode = formattedDigits.slice(3, 6);
  const localNumber = formattedDigits.slice(6);

  return `(${countryCode}) ${areaCode}-${localNumber}`;
};

// ** Function: is today function
export const isToday = date => {
  const currentDate = moment();
  const inputDate = moment(date);

  return currentDate.isSame(inputDate, 'day');
};

// ** Function : Time Range Format
export const formatTimeRange = (start_time, end_time) => {
  const startMoment = moment(start_time, 'h:mm A');
  const endMoment = moment(end_time, 'h:mm A');

  if (startMoment.minutes() === 0 && endMoment.minutes() === 0) {
    // If both start and end times have zero minutes, show only the hour and AM/PM
    return `${startMoment.format('h A')} - ${endMoment.format('h A')}`;
  } else {
    // Otherwise, show both hour and minutes
    return `${startMoment.format('h:mm A')} - ${endMoment.format('h:mm A')}`;
  }
};

// ** Function : Get Super Modified Values of an Object
export const getSuperModifiedValues = (values, initialValues) => {
  const modifiedValues = {};

  if (values) {
    Object.entries(values).forEach(entry => {
      const key = entry[0];
      const value = entry[1];
      const initialValue = initialValues[key];

      if (key === 'appointment_services') {
        if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
          modifiedValues[key] = value;
        }
      } else if (Array.isArray(value) && Array.isArray(initialValue)) {
        if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
          modifiedValues[key] = value;
        }
      } else if (
        typeof value === 'object' &&
        value !== null &&
        typeof initialValue === 'object' &&
        initialValue !== null
      ) {
        if (JSON.stringify(value) !== JSON.stringify(initialValue)) {
          modifiedValues[key] = value;
        }
      } else if (value !== initialValue) {
        modifiedValues[key] = value;
      }
    });
  }

  return modifiedValues;
};

// ** Function: Formatting StartTime and EndTime
export const formatTimeAndEndTime = (startTime, endTime) => {
  const startMoment = moment(startTime, 'hh:mm a');
  const endMoment = moment(endTime, 'hh:mm a');

  // Check if minutes are zero for both start and end time
  const showOnlyTimeHours = startMoment.minutes() === 0;
  const showOnlyEndHours = endMoment.minutes() === 0;

  const formattedStartTime = showOnlyTimeHours
    ? startMoment.format('hha')
    : startMoment.format('hh:mma');

  const formattedEndTime = showOnlyEndHours
    ? endMoment.format('hha')
    : endMoment.format('hh:mma');

  return `${formattedStartTime} - ${formattedEndTime}`;
};
