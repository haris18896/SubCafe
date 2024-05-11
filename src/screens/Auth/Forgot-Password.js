/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

// ** Utils
import {FormikValuesChanged, isObjEmpty} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  AuthViewer,
  AuthContainer,
  UserActivityWrapper,
} from '../../styles/screens';
import {appIcons} from '../../assets';
import {Layout} from '../../@core/layout';
import {TextInput} from '../../@core/components';
import {ButtonAction, Header} from '../../components';
import {Title, SubTitle} from '../../styles/typography';

// ** Store
import {useDispatch} from 'react-redux';

// ** Mutation

const ForgotPassword = () => {
  // ** Refs
  const emailRef = useRef(null);
  // const otp_ref = useRef(null);

  // ** Navigation
  const navigation = useNavigation();

  // ** Store && GraphQL
  const dispatch = useDispatch();

  // ** STATES
  // TODO: The states below are intended for handling OTP, but we currently do not receive any OTP from the API. Therefore, these sections have been commented out for the time being.
  const [isLoading, setIsLoading] = useState('');
  // const [code, setCode] = useState('');
  // const [errorData, setErrorData] = useState();
  // const [OTP, setOTP] = useState(false);
  // const [codeLength, setCodeLength] = useState(true);
  // const [resendPending, setResendPending] = useState(false);

  // ** Validation Schema
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
  });

  // ** Form handler
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        // setIsLoading('forgot_password_pending')
        console.log('values....', values);
      }
    },
  });

  return (
    <Layout>
      <Header
        backIconColor={false}
        title={''}
        onBack={() => navigation.goBack()}
      />

      <Title style={styles.title}>Forgot Your Password</Title>
      <SubTitle mb={0} style={styles.wrapper}>
        A Verification code will be sent to your email
      </SubTitle>
      <AuthViewer
        margin={0}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.AuthViewerContainer}>
        <AuthContainer justifyContent={'flex-start'}>
          <TextInput
            ref={emailRef}
            multiline={false}
            disabled={false}
            title={'Email'}
            variant={'outlined'}
            inputMode={'email'}
            returnKeyType={'done'}
            secureTextEntry={false}
            value={formik.values.email}
            placeholder={'Enter Your Email'}
            formikError={formik.errors?.email}
            formikTouched={formik.touched.email}
            imageIcon={{left: {icon: appIcons?.mail, width: 5, height: 5}}}
            onChangeText={text => formik.setFieldValue('email', text)}
            onBlur={() => formik.setFieldTouched('email', true)}
            onBlurChange={() => formik.setFieldTouched('email', true)}
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
        </AuthContainer>
      </AuthViewer>

      <UserActivityWrapper
        style={styles.wrapper}
        marginTop={'auto'}
        direction={'column'}>
        <ButtonAction
          end={true}
          title={'Send'}
          loading={isLoading === 'forgot_password_pending'}
          onPress={() => formik.handleSubmit()}
          color={AppTheme?.DefaultPalette()?.buttons?.primary}
          labelColor={AppTheme.DefaultPalette().common.white}
          loadingColor={AppTheme.DefaultPalette().common.white}
          disabled={
            FormikValuesChanged(formik.initialValues, formik.values) ||
            !isObjEmpty(formik.errors)
          }
        />
        <UserActivityWrapper
          style={styles.wrapper}
          marginTop={AppTheme.WP(3)}
          justifyContent={'center'}
          alignItems={'center'}>
          <SubTitle>Don’t have an account?</SubTitle>
          <Pressable onPress={() => navigation.navigate('OnBoarding')}>
            <SubTitle color={AppTheme.DefaultPalette().success.main}>
              {' '}
              Create Account
            </SubTitle>
          </Pressable>
        </UserActivityWrapper>
      </UserActivityWrapper>

      {/*TODO: As per the API response, we are not receiving any OTP. Therefore, the following code needs to be commented out.*/}
      {/*<BottomSheet*/}
      {/*  title={''}*/}
      {/*  ref={otp_ref}*/}
      {/*  visible={OTP}*/}
      {/*  isLoading={loading}*/}
      {/*  disabled={loading || !codeLength}*/}
      {/*  height={AppTheme.WP(120)}*/}
      {/*  submitText={'Verify and Reset Password'}*/}
      {/*  onSubmit={() => {*/}
      {/*    setOTP(false);*/}
      {/*    navigation.navigate('ResetPassword');*/}
      {/*  }}*/}
      {/*  onClose={() => {*/}
      {/*    setOTP(false);*/}
      {/*  }}>*/}
      {/*  <RowCenter>*/}
      {/*    <Image*/}
      {/*      style={styles.otp_image}*/}
      {/*      source={appImages?.otp_image}*/}
      {/*      resizeMode={resizeMode}*/}
      {/*    />*/}
      {/*  </RowCenter>*/}
      {/*  <ColumCenter marginBottom={AppTheme.WP(4)}>*/}
      {/*    <Title>Check Your Email</Title>*/}
      {/*    <SubTitle>We’ve sent a 4 digit verification code</SubTitle>*/}
      {/*    <SubTitle>*/}
      {/*      to{' '}*/}
      {/*      <Text style={{color: AppTheme.DefaultPalette().success.main}}>*/}
      {/*        (Change the email here)*/}
      {/*      </Text>*/}
      {/*    </SubTitle>*/}
      {/*  </ColumCenter>*/}

      {/*  <ColumCenter style={styles.OTPBlock}>*/}
      {/*    <OtpInput*/}
      {/*      disabled={true}*/}
      {/*      numberOfDigits={4}*/}
      {/*      focusStickBlinkingDuration={500}*/}
      {/*      onTextChange={text => {*/}
      {/*        console.log(text);*/}
      {/*        setErrorData(null);*/}
      {/*        if (text.length === 4) {*/}
      {/*          setCodeLength(false);*/}
      {/*        } else {*/}
      {/*          setCodeLength(true);*/}
      {/*        }*/}
      {/*      }}*/}
      {/*      onFilled={text => setCode(`${text}`)}*/}
      {/*      focusColor={AppTheme.DefaultPalette().secondary.dark}*/}
      {/*      value={'0000'}*/}
      {/*      theme={{*/}
      {/*        containerStyle: styles.containerStyle,*/}
      {/*        inputsContainerStyle: styles.inputContainerStyle,*/}
      {/*        pinCodeContainerStyle: styles.pinCodeContainerStyle(errorData),*/}
      {/*        pinCodeTextStyle: styles.pinCodeTextStyle(errorData),*/}
      {/*        focusStickStyle: styles.focusStickStyle,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </ColumCenter>*/}
      {/*</BottomSheet>*/}
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: AppTheme.WP(8),
    marginBottom: AppTheme.WP(2),
    paddingHorizontal: AppTheme?.WP(4),
  },
  OTPBlock: {
    marginVertical: AppTheme.WP(3),
  },
  otp_image: {
    marginBottom: AppTheme.WP(4),
    width: AppTheme.WP(40),
    height: AppTheme.WP(40),
  },
  containerStyle: {
    backgroundColor: 'transparent',
    marginBottom: AppTheme.WP(5),
    marginHorizontal: AppTheme.WP(4),
  },
  inputContainerStyle: {
    justifyContent: 'center',
  },
  pinCodeContainerStyle: error => ({
    marginHorizontal: AppTheme.WP(2),
    minHeight: AppTheme.WP(10),
    fontSize: AppTheme.WP(10),
    padding: 0,
    margin: 0,
    paddingBottom: 5,
    borderColor: error
      ? AppTheme.DefaultPalette().error.dark
      : AppTheme.DefaultPalette().grey.light,
  }),
  pinCodeTextStyle: error => ({
    fontWeight: AppTheme.fontWeights.semiBold,
    color: error
      ? AppTheme.DefaultPalette().error.dark
      : AppTheme.DefaultPalette().success.main,
    fontFamily: AppTheme.fonts.PoppinsSemiBold,
    padding: 0,
    margin: 0,
  }),
  focusStickStyle: {
    backgroundColor: AppTheme.DefaultPalette().secondary.dark,
    borderColor: AppTheme.DefaultPalette().secondary.dark,
  },
  wrapper: {
    paddingHorizontal: AppTheme?.WP(4),
  },
  AuthViewerContainer: {
    flex: 1,
    marginTop: AppTheme?.WP(5),
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});
export {ForgotPassword};
