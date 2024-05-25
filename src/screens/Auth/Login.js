import React, {useRef, useState} from 'react';
import {
  Keyboard,
  View,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

// ** Utils
import {FormikValuesChanged, isObjEmpty} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {appIcons, appImages} from '../../assets';
import {
  AuthActivityLabel,
  AuthActivityWrapper,
  AuthContainer,
  AvoidKeyboard,
  MainContainer,
  UserActivityWrapper,
  WelcomeImage,
} from '../../styles/screens';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {TextInput} from '../../@core/components';
import {ButtonAction} from '../../components';
import {Title} from '../../styles/typography';
import {navigateTo} from '../../navigation/utils';
import {LoginAction} from '../../redux/Auth';
import {setData} from '../../utils/constants';

const Login = () => {
  // ** navigation
  const navigation = useNavigation();

  // ** Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // ** Store && Mutations
  const dispatch = useDispatch();

  // ** STATES
  const [isLoading, setIsLoading] = useState('');

  // ** Validation Schema
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // ** Form handler
  const formik = useFormik({
    initialValues: {
      email: 'shahidmuneerawan@gmail.com',
      password: '1234',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        setIsLoading('login_pending');
        dispatch(
          LoginAction({
            data: values,
            refreshing: () => setIsLoading(''),
            errorCallback: () => setIsLoading(''),
            callback: async res => {
              await setData('token', res?.token);
              navigateTo('App');
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer mb={0} justifyContent={'center'}>
          <AvoidKeyboard
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <AuthContainer paddingHorizontal={8} justifyContent={'center'}>
              <Title size={12} color={AppTheme?.DefaultPalette()?.grey[100]}>
                Welcome to{' '}
                <Title
                  size={12}
                  color={AppTheme?.DefaultPalette()?.primary?.main}>
                  SubCafe
                </Title>
              </Title>

              <TextInput
                ref={emailRef}
                multiline={false}
                disabled={false}
                title={'Email'}
                variant={'outlined'}
                inputMode={'email'}
                returnKeyType={'next'}
                styleData={{
                  labelStyles: {
                    color: AppTheme?.DefaultPalette()?.grey[100],
                  },
                }}
                secureTextEntry={false}
                value={formik.values.email}
                nextInputRef={passwordRef}
                placeholder={'Enter Your Email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                imageIcon={{left: {icon: appIcons?.mail, width: 5, height: 5}}}
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
                onBlurChange={() => formik.setFieldTouched('email', true)}
              />

              <TextInput
                ref={passwordRef}
                multiline={false}
                disabled={false}
                title={'Password'}
                variant={'outlined'}
                inputMode={'text'}
                returnKeyType={'done'}
                styleData={{
                  labelStyles: {
                    color: AppTheme?.DefaultPalette()?.grey[100],
                  },
                }}
                secureTextEntry={true}
                value={formik.values.password}
                formikError={formik.errors?.password}
                placeholder={'Enter your password'}
                formikTouched={formik.touched.password}
                iconColor={AppTheme.DefaultPalette().text.disabled}
                imageIcon={{left: {icon: appIcons?.lock, width: 5, height: 5}}}
                onChangeText={text => formik.setFieldValue('password', text)}
                onBlur={() => formik.setFieldTouched('password', true)}
                onBlurChange={() => formik.setFieldTouched('password', true)}
                submit={() => {
                  if (isObjEmpty(formik.errors)) {
                    formik.handleSubmit();
                  }
                }}
              />

              <AuthActivityWrapper marginBottom={2}>
                <Pressable
                  disabled={false}
                  style={styles.forgotPasswordButton}
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <AuthActivityLabel
                    color={AppTheme?.DefaultPalette()?.grey[700]}>
                    Forgot your password?
                  </AuthActivityLabel>
                </Pressable>
              </AuthActivityWrapper>

              <UserActivityWrapper
                style={styles.buttonsWrapper}
                direction={'column'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}>
                <ButtonAction
                  end={true}
                  title={'Sign In'}
                  titleWeight={'bold'}
                  loading={isLoading === 'login_pending'}
                  onPress={() => formik.handleSubmit()}
                  border={AppTheme?.DefaultPalette()?.buttons?.primary}
                  color={AppTheme?.DefaultPalette()?.buttons?.primary}
                  labelColor={AppTheme.DefaultPalette().common.white}
                  loadingColor={AppTheme.DefaultPalette().common.white}
                  // disabled={
                  //   FormikValuesChanged(formik.initialValues, formik.values) ||
                  //   !isObjEmpty(formik.errors)
                  // }
                />

                <ButtonAction
                  end={false}
                  titleWeight={'bold'}
                  title={'Create New Account'}
                  disabled={!!isLoading}
                  border={AppTheme.DefaultPalette().buttons.secondary}
                  color={AppTheme.DefaultPalette().buttons.secondary}
                  onPress={() => navigation.navigate('Register')}
                  labelColor={AppTheme.DefaultPalette().grey[100]}
                  loadingColor={AppTheme.DefaultPalette().primary.main}
                />
              </UserActivityWrapper>
            </AuthContainer>
          </AvoidKeyboard>
        </MainContainer>
      </TouchableWithoutFeedback>
    </WelcomeImage>
  );
};

const styles = StyleSheet.create({
  forgotPasswordButton: {
    backgroundColor: AppTheme.DefaultPalette().grey[100],
    borderRadius: AppTheme?.WP(5),
    paddingHorizontal: AppTheme?.WP(3),
    paddingVertical: AppTheme?.WP(1),
  },
  backgroundImage: {
    width: '100%',
    alignItems: 'center',
  },
});
export {Login};
