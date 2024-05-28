import React, {useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// ** Utils
import {isObjEmpty, FormikValuesChanged, showToast} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import YupPassword from 'yup-password';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  AuthLink,
  AuthTitle,
  AuthSubTitle,
  AuthFieldsWrapper,
  UserActivityWrapper,
  MainContainer,
  AvoidKeyboard,
  WelcomeImage,
} from '../../styles/screens';
import {appIcons, appImages} from '../../assets';
import {TextInput} from '../../@core/components';
import {RowStart} from '../../styles/infrustucture';
import {ButtonAction, Header} from '../../components';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {RegisterAction} from '../../redux/Auth';

// ** Signals
YupPassword(Yup);

const Register = () => {
  // ** Navigation
  const navigation = useNavigation();

  // ** Refs
  const email_ref = useRef(null);
  const password_ref = useRef(null);
  const last_name_ref = useRef(null);
  const first_name_ref = useRef(null);

  // ** Store
  const dispatch = useDispatch();

  // ** STATES
  const [isLoading, setIsLoading] = useState(false);

  // ** Validation Schema
  const schema = Yup.object().shape({
    first_name: Yup.string().required('First name is a required field'),
    last_name: Yup.string().required('Last name is a required field'),
    email: Yup.string().email().required('Email is a required field'),
    password: Yup.string()
      .required('Password is a required field')
      .min(
        8,
        'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special',
      )
      .minNumbers(1, 'password must contain at least 1 number')
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minSymbols(1, 'password must contain at least 1 special character'),
  });

  // ** Form handler
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      last_name: '',
      first_name: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        setIsLoading('registration_pending');
        dispatch(
          RegisterAction({
            data: values,
            refreshing: () => setIsLoading(''),
            errorCallback: () => setIsLoading(''),
            callback: () => {
              navigation.navigate('Login');
              showToast({
                type: 'success',
                title: 'Registration',
                message: 'User has been registered successfully',
              });
            },
          }),
        );
      }
    },
  });

  return (
    <WelcomeImage
      style={styles.backgroundImage}
      resizeMode={'cover'}
      source={appImages?.welcomeBG}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <>
          <StatusBar
            animated={true}
            barStyle={'dark-content'}
            backgroundColor={AppTheme?.DefaultPalette()?.background?.paper}
          />
          <Header
            title={' '}
            backIconColor={AppTheme?.DefaultPalette()?.background?.paper}
            customStyles={{marginTop: AppTheme?.WP(15)}}
            onBack={() => navigation.goBack()}
          />
          <MainContainer justifyContent={'flex-start'}>
            <AvoidKeyboard
              style={{flexGrow: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <ScrollView
                style={styles.container}
                contentContainerStyle={{paddingBottom: AppTheme?.WP(10)}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                justifyContent={'flex-start'}>
                <AuthTitle
                  color={AppTheme?.DefaultPalette()?.grey[100]}
                  style={styles.wrapper}>
                  Create an account
                </AuthTitle>
                <RowStart style={styles.subtitleWrapper}>
                  <AuthSubTitle color={AppTheme?.DefaultPalette()?.grey[100]}>
                    Already have an account?{' '}
                  </AuthSubTitle>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <AuthLink
                      color={AppTheme?.DefaultPalette()?.secondary.main}>
                      Sign in here
                    </AuthLink>
                  </TouchableOpacity>
                </RowStart>

                <AuthFieldsWrapper style={styles.fieldContainer}>
                  <TextInput
                    width={'48%'}
                    ref={first_name_ref}
                    multiline={false}
                    disabled={false}
                    title={'First Name'}
                    variant={'outlined'}
                    inputMode={'text'}
                    returnKeyType={'next'}
                    secureTextEntry={false}
                    styleData={{
                      labelStyles: {
                        color: AppTheme?.DefaultPalette()?.grey[100],
                      },
                    }}
                    nextInputRef={last_name_ref}
                    value={formik.values.first_name}
                    placeholder={'Enter First Name'}
                    formikError={formik.errors?.first_name}
                    leftIcon={'person'}
                    formikTouched={formik.touched.first_name}
                    iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                    onChangeText={text =>
                      formik.setFieldValue('first_name', text)
                    }
                    onBlur={() => formik.setFieldTouched('first_name', true)}
                    onBlurChange={() =>
                      formik.setFieldTouched('first_name', true)
                    }
                  />

                  <TextInput
                    width={'48%'}
                    ref={last_name_ref}
                    multiline={false}
                    disabled={false}
                    title={'Last Name'}
                    variant={'outlined'}
                    inputMode={'text'}
                    returnKeyType={'next'}
                    leftIcon={'person'}
                    secureTextEntry={false}
                    styleData={{
                      labelStyles: {
                        color: AppTheme?.DefaultPalette()?.grey[100],
                      },
                    }}
                    nextInputRef={email_ref}
                    value={formik.values.last_name}
                    placeholder={'Enter Last Name'}
                    formikError={formik.errors?.last_name}
                    formikTouched={formik.touched.last_name}
                    iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                    onChangeText={text =>
                      formik.setFieldValue('last_name', text)
                    }
                    onBlur={() => formik.setFieldTouched('last_name', true)}
                    onBlurChange={() =>
                      formik.setFieldTouched('last_name', true)
                    }
                  />
                </AuthFieldsWrapper>

                <TextInput
                  ref={email_ref}
                  multiline={false}
                  disabled={false}
                  inputMode={'text'}
                  variant={'outlined'}
                  leftIcon={'mail'}
                  title={'Email'}
                  returnKeyType={'next'}
                  secureTextEntry={false}
                  nextInputRef={password_ref}
                  placeholder={'Enter Your Email'}
                  formikError={formik.errors?.email}
                  formikTouched={formik.touched.email}
                  value={formik.values.email}
                  iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                  onChangeText={text => formik.setFieldValue('email', text)}
                  onBlur={() => formik.setFieldTouched('email', true)}
                  onBlurChange={() => formik.setFieldTouched('email', true)}
                  styleData={{
                    labelStyles: {
                      color: AppTheme?.DefaultPalette()?.grey[100],
                    },
                  }}
                />

                <TextInput
                  ref={password_ref}
                  multiline={false}
                  disabled={false}
                  leftIcon={'lock'}
                  title={'Password'}
                  variant={'outlined'}
                  inputMode={'text'}
                  returnKeyType={'done'}
                  secureTextEntry={true}
                  value={formik.values.password}
                  placeholder={'Enter Password'}
                  formikError={formik.errors?.password}
                  formikTouched={formik.touched.password}
                  iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                  onChangeText={text => formik.setFieldValue('password', text)}
                  onBlur={() => formik.setFieldTouched('password', true)}
                  onBlurChange={() => formik.setFieldTouched('password', true)}
                  styleData={{
                    labelStyles: {
                      color: AppTheme?.DefaultPalette()?.grey[100],
                    },
                  }}
                  submit={() => {
                    if (isObjEmpty(formik.errors)) {
                      formik.handleSubmit();
                    }
                  }}
                />
              </ScrollView>
            </AvoidKeyboard>
            <UserActivityWrapper marginBottom={4} style={styles.buttonsWrapper}>
              <ButtonAction
                end={true}
                title={'Signup'}
                titleWeight={'bold'}
                loading={isLoading === 'registration_pending'}
                onPress={() => formik.handleSubmit()}
                border={AppTheme?.DefaultPalette()?.buttons?.primary}
                color={AppTheme?.DefaultPalette()?.buttons?.primary}
                labelColor={AppTheme.DefaultPalette().common.white}
                loadingColor={AppTheme.DefaultPalette().common.white}
                disabled={
                  FormikValuesChanged(formik.initialValues, formik.values) ||
                  !isObjEmpty(formik.errors)
                }
              />
            </UserActivityWrapper>
          </MainContainer>
        </>
      </TouchableWithoutFeedback>
    </WelcomeImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: AppTheme?.WP(5),
  },
  fieldContainer: {
    marginTop: AppTheme?.WP(4),
  },
  wrapper: {
    marginTop: AppTheme?.WP(3),
  },
  subtitleWrapper: {
    marginVertical: AppTheme?.WP(1),
    flexWrap: 'wrap',
  },
  buttonsWrapper: {
    paddingHorizontal: AppTheme?.WP(4),
  },
  backgroundImage: {
    width: '100%',
    alignItems: 'flex-start',
  },
});
export {Register};
