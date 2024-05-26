import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// ** Utils
import {FormikValuesChanged, isObjEmpty, showToast} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import * as Yup from 'yup';
import {useFormik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

// ** SVGs
import PencilCircle from '../../assets/svgs/pencil-circle.svg';

// ** Custom Components
import {Layout} from '../../@core/layout';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';
import {ButtonAction, Header} from '../../components';
import {
  AuthFieldsWrapper,
  AuthLink,
  AuthSubTitle,
  AuthTitle,
  AvoidKeyboard,
  MainContainer,
  ProfileImage,
  ProfileImageWrapper,
  UserActivityWrapper,
  UserProfileWrapper,
} from '../../styles/screens';
import {RowStart, SafeArea} from '../../styles/infrustucture';
import {TextInput} from '../../@core/components';
import {appIcons, appImages} from '../../assets';
import {CommonStyles} from '../../utils/CommonStyles';
import {TextItem} from '../../styles/typography';
import {getData} from '../../utils/constants';
import {DeleteAccountModel} from '../../@core/components/Models/DeleteAccountModel';

const Profile = () => {
  // ** navigation
  const navigation = useNavigation();

  // ** Refs
  const email_ref = useRef(null);
  const last_name_ref = useRef(null);
  const first_name_ref = useRef(null);

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState('');
  const [model, setModel] = useState('');

  const apiCall = async () => {
    const data = await getData('user');
    setUser(JSON.parse(data));
  };

  useEffect(() => {
    return navigation.addListener('focus', apiCall);
  }, [navigation]);

  const schema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email().required('Email is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        // setIsLoading('loading');
        showToast({
          type: 'info',
          title: 'Profile Update',
          message: 'This feature will be available soon',
        });
      }
    },
  });

  const handleSelectOrTakePhoto = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const file = {
          source: image?.path,
          uri: image?.sourceURL,
          type: image?.mime,
          name: image?.filename,
        };

        console.log('check image file...', file);
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  const handleDeleteAccount = () => {
    setIsLoading('loading');
    console.log('handle Delete Account Api');
    setIsLoading('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeArea>
        <MainContainer
          style={{paddingTop: AppTheme?.WP(4)}}
          mb={1}
          justifyContent={'flex-start'}>
          <Header
            Logout={true}
            title={'Profile'}
            backIconColor={AppTheme?.DefaultPalette()?.background?.paper}
            onBack={() => navigation.goBack()}
          />
          <AvoidKeyboard
            style={{flexGrow: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
              style={styles.container}
              contentContainerStyle={{paddingBottom: AppTheme?.WP(10)}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              justifyContent={'flex-start'}>
              <UserProfileWrapper>
                <ProfileImageWrapper marginBottom={2} marginTop={2}>
                  <TouchableOpacity
                    style={styles.EditButton}
                    onPress={() => handleSelectOrTakePhoto()}>
                    <PencilCircle
                      width={AppTheme?.WP(8)}
                      height={AppTheme?.WP(8)}
                      color={AppTheme?.DefaultPalette()?.primary?.main}
                    />
                  </TouchableOpacity>
                  <ProfileImage source={appImages?.Logo} resizeMode={'cover'} />
                </ProfileImageWrapper>

                <TextItem
                  color={AppTheme?.DefaultPalette()?.text?.primary}
                  size={7}>
                  {`${user?.first_name} ${user?.last_name}`}
                </TextItem>
              </UserProfileWrapper>
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
                      color: AppTheme?.DefaultPalette()?.grey[700],
                    },
                  }}
                  nextInputRef={last_name_ref}
                  value={formik.values.first_name}
                  placeholder={'Enter First Name'}
                  formikError={formik.errors?.first_name}
                  formikTouched={formik.touched.first_name}
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
                  secureTextEntry={false}
                  styleData={{
                    labelStyles: {
                      color: AppTheme?.DefaultPalette()?.grey[700],
                    },
                  }}
                  nextInputRef={email_ref}
                  value={formik.values.last_name}
                  placeholder={'Enter Last Name'}
                  formikError={formik.errors?.last_name}
                  formikTouched={formik.touched.last_name}
                  onChangeText={text => formik.setFieldValue('last_name', text)}
                  onBlur={() => formik.setFieldTouched('last_name', true)}
                  onBlurChange={() => formik.setFieldTouched('last_name', true)}
                />
              </AuthFieldsWrapper>

              <TextInput
                ref={email_ref}
                multiline={false}
                disabled={false}
                inputMode={'text'}
                variant={'outlined'}
                title={'Email'}
                returnKeyType={'done'}
                secureTextEntry={false}
                placeholder={'Enter Your Email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                value={formik.values.email}
                styleData={{
                  labelStyles: {
                    color: AppTheme?.DefaultPalette()?.grey[700],
                  },
                }}
                imageIcon={{
                  left: {icon: appIcons?.mail, width: 5, height: 5},
                }}
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
                onBlurChange={() => formik.setFieldTouched('email', true)}
                submit={() => {
                  if (isObjEmpty(formik.errors)) {
                    formik.handleSubmit();
                  }
                }}
              />
            </ScrollView>
          </AvoidKeyboard>
          <UserActivityWrapper style={styles.buttonsWrapper}>
            <ButtonAction
              end={true}
              title={'Update'}
              titleWeight={'bold'}
              loading={isLoading === 'loading'}
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
          <UserActivityWrapper marginBottom={4} style={styles.buttonsWrapper}>
            <ButtonAction
              end={true}
              title={'Delete'}
              titleWeight={'bold'}
              loading={isLoading === 'loading'}
              disabled={isLoading === 'loading'}
              onPress={() => setModel('delete_account')}
              border={AppTheme?.DefaultPalette()?.error?.main}
              color={AppTheme?.DefaultPalette()?.error?.main}
              labelColor={AppTheme.DefaultPalette().common.white}
              loadingColor={AppTheme.DefaultPalette().common.white}
            />
          </UserActivityWrapper>
          <DeleteAccountModel
            title={'Delete Account'}
            open={model === 'delete_account'}
            onSubmit={handleDeleteAccount}
            onToggle={() => setModel('')}
            isLoading={isLoading === 'loading'}
            description={'Are you sure you want to delete your account?'}
          />
        </MainContainer>
      </SafeArea>
    </TouchableWithoutFeedback>
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
  EditButton: {
    zIndex: 10,
    position: 'absolute',
    borderRadius: AppTheme?.WP(10),
    width: AppTheme?.WP(8),
    height: AppTheme?.WP(8),
    bottom: 0,
    right: 0,
  },
});
export {Profile};
