/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

// ** Utils
import {resizeMode} from '../../../utils/constants';
import {FormikValuesChanged, isObjEmpty} from '../../../utils/utils';
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import validator from 'validator';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ** Custom Components
import {Layout} from '../../@core/layout';
import {ColumCenter, RowCenter, SubTitle} from '../../styles/infrustucture';
import {Title} from '../../styles/typography';
import {
  AuthViewer,
  ResetPasswordWrapper,
  UserActivityWrapper,
} from '../../styles/screens';
import {BottomSheet, TextInput} from '../../@core/components';
import {appIcons, appImages} from '../../assets';
import {ButtonAction} from '../../components';

// ** Store && Actions
import {useDispatch} from 'react-redux';

const ResetPassword = ({route}) => {
  // ** Params
  const {code} = route?.params;

  // ** Navigation
  const navigation = useNavigation();

  // ** Refs
  const password_ref = useRef(null);
  const confirm_password_ref = useRef(null);
  const password_sheet_ref = useRef(null);

  // ** Store
  const dispatch = useDispatch();

  // ** STATES
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ** Validation Schema
  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .test(
        'is-strong',
        'Password must be at least 8 characters long, include 1 uppercase letter, 1 symbol, and 1 number',
        value => {
          if (value) {
            return validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 0,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
              returnScore: false,
            });
          }
        },
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  // ** Form handler
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async () => {
      if (isObjEmpty(formik.errors)) {
        setPasswordUpdated(true);
      }
    },
  });

  return (
    <Layout
      isLoading={isLoading === 'Loading_token'}
      customStyles={{paddingHorizontal: AppTheme.WP(4)}}>
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Icon
          size={30}
          name={'arrow-back'}
          color={AppTheme.DefaultPalette().grey.arrow}
        />
      </TouchableOpacity>

      <Title style={styles.title}>Set Password</Title>
      <SubTitle>Choose a password to log in</SubTitle>
      <ResetPasswordWrapper>
        <SubTitle>
          Welcome to Salus Health, set your password{' '}
          <SubTitle color={AppTheme?.DefaultPalette()?.primary?.light}>
            haris18896@mailinator.com
          </SubTitle>{' '}
        </SubTitle>
      </ResetPasswordWrapper>
      <AuthViewer
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <TextInput
          ref={password_ref}
          multiline={false}
          disabled={false}
          title={'Password'}
          variant={'outlined'}
          inputMode={'email'}
          returnKeyType={'next'}
          secureTextEntry={true}
          value={formik.values.password}
          placeholder={'Enter Password'}
          nextInputRef={confirm_password_ref}
          formikError={formik.errors?.password}
          formikTouched={formik.touched.password}
          imageIcon={{left: {icon: appIcons?.lock, width: 5, height: 5}}}
          onChangeText={text => formik.setFieldValue('password', text)}
          onBlur={() => formik.setFieldTouched('password', true)}
          styleData={{
            labelStyles: {
              weight: AppTheme?.fontWeights?.medium,
            },
          }}
        />
        <TextInput
          multiline={false}
          disabled={false}
          title={'Confirm Password'}
          variant={'outlined'}
          inputMode={'email'}
          returnKeyType={'done'}
          secureTextEntry={true}
          ref={confirm_password_ref}
          value={formik.values.confirmPassword}
          placeholder={'Re-Enter Password'}
          formikError={formik.errors?.confirmPassword}
          formikTouched={formik.touched.confirmPassword}
          imageIcon={{left: {icon: appIcons?.lock, width: 5, height: 5}}}
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
          onBlur={() => formik.setFieldTouched('confirmPassword', true)}
          styleData={{
            labelStyles: {
              weight: AppTheme?.fontWeights?.medium,
            },
          }}
          submit={() => {
            if (isObjEmpty(formik.errors)) {
              formik.handleSubmit();
            }
          }}
        />
      </AuthViewer>
      <UserActivityWrapper
        marginBottom={AppTheme?.WP(1)}
        marginTop={'auto'}
        direction={'column'}>
        <ButtonAction
          end={true}
          loading={!!isLoading}
          title={'Set New Password'}
          onPress={() => formik.handleSubmit()}
          color={AppTheme?.DefaultPalette()?.buttons?.primary}
          loadingColor={AppTheme.DefaultPalette().primary.main}
          labelColor={AppTheme?.DefaultPalette()?.primary?.reverseContrastText}
          disabled={
            FormikValuesChanged(formik.initialValues, formik.values) ||
            !isObjEmpty(formik.errors)
          }
        />
      </UserActivityWrapper>

      <BottomSheet
        ref={password_sheet_ref}
        disabled={!!isLoading}
        isLoading={!!isLoading}
        visible={passwordUpdated}
        title={''}
        height={AppTheme.WP(120)}
        submitText={'Sign In'}
        onSubmit={() => {
          setIsLoading('setting_password');
          console.log('dispatch_password_updated', code);
        }}
        onClose={() => {
          setPasswordUpdated(false);
        }}>
        <RowCenter>
          <Image
            resizeMode={resizeMode}
            style={styles.otp_image}
            source={appImages?.password_updated}
          />
        </RowCenter>
        <ColumCenter marginBottom={AppTheme.WP(4)}>
          <Title>Password Reset</Title>
          <SubTitle
            style={{textAlign: 'center', marginVertical: AppTheme.WP(4)}}>
            You will be moved to home screen right now. Enjoy the features!
          </SubTitle>
        </ColumCenter>
      </BottomSheet>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: AppTheme.WP(4),
    marginBottom: AppTheme.WP(2),
  },
  otp_image: {
    marginBottom: AppTheme.WP(4),
    width: AppTheme.WP(40),
    height: AppTheme.WP(40),
  },
});
export {ResetPassword};
