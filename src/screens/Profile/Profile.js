import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// ** Utils
import {
  FormikValuesChanged,
  getSuperModifiedValues,
  isObjEmpty,
  showToast,
} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import * as Yup from 'yup';
import {useFormik} from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

// ** SVGs
import PencilCircle from '../../assets/svgs/pencil-circle.svg';

// ** Custom Components
import {
  AvoidKeyboard,
  MainContainer,
  ProfileImage,
  AuthFieldsWrapper,
  ProfileImageWrapper,
  UserActivityWrapper,
  UserProfileWrapper,
} from '../../styles/screens';
import {getData, setData} from '../../utils/constants';
import {TextItem} from '../../styles/typography';
import {TextInput} from '../../@core/components';
import {appIcons, appImages} from '../../assets';
import {SafeArea} from '../../styles/infrustucture';
import {ButtonAction, Header} from '../../components';
import {DeleteAccountModel} from '../../@core/components/Models/DeleteAccountModel';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {
  DeleteAction,
  UpdateAction,
  UpdateUserImageAction,
} from '../../redux/Auth';
import {navigateTo} from '../../navigation/utils';

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
  const [userImage, setUserImage] = useState({});
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
        if (!isObjEmpty(getSuperModifiedValues(formik.initialValues, values))) {
          setIsLoading('updating');
          dispatch(
            UpdateAction({
              data: {
                userId: user?.id,
                data: getSuperModifiedValues(formik.initialValues, values),
              },
              refreshing: () => setIsLoading(''),
              errorCallback: () => setIsLoading(''),
              callback: async res => {
                // const data = await setData('user', res);
                // setUser(JSON.parse(data));
                navigation.goBack();
                showToast({
                  type: 'success',
                  title: 'Update',
                  message: 'Your profile has been updated!',
                });
              },
            }),
          );
        } else {
          showToast({
            type: 'info',
            title: 'No Updates',
            message: 'No Updates has been made to the fields!',
          });
        }
        // setIsLoading('updating');
      }
    },
  });

  const handleSelectOrTakePhoto = async () => {
    ImagePicker.openPicker({
      cropping: true,
      showCropFrame: false,
      includeBase64: true,
      compressImageQuality: 0.1,
      showCropGuidelines: true,
      hideBottomControls: false,
      width: AppTheme?.scrWidth,
      height: AppTheme?.scrHeight,
      disableCropperColorSetters: false,
    })
      .then(image => {
        const file = {
          uri: image?.sourceURL,
          type: image?.mime,
          name: image?.filename,
          path: image?.path,
          base64Image: image?.data,
        };

        const imageData = new FormData();
        imageData.append('image', file);

        dispatch(
          UpdateUserImageAction({
            data: {
              userId: user?.id,
              data: {
                image: imageData,
              },
            },
            refreshing: () => setIsLoading(''),
            errorCallback: () => setIsLoading(''),
            callback: res => {
              setUserImage(res);
              console.log('check response on image...', res);
              showToast({
                type: 'success',
                title: 'Update',
                message: 'Your profile has been updated!',
              });
            },
          }),
        );
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
  };

  const handleDeleteAccount = () => {
    setIsLoading('delete_user');
    dispatch(
      DeleteAction({
        data: {userId: user?.id},
        refreshing: () => setIsLoading(''),
        errorCallback: () => setIsLoading(''),
        callback: () => {
          navigateTo('Auth');
        },
      }),
    );
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
                  leftIcon={'account'}
                  iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                  nextInputRef={last_name_ref}
                  value={formik.values.first_name}
                  placeholder={'Enter First Name'}
                  formikError={formik.errors?.first_name}
                  formikTouched={formik.touched.first_name}
                  styleData={{
                    labelStyles: {
                      color: AppTheme?.DefaultPalette()?.grey[700],
                    },
                  }}
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
                  inputMode={'text'}
                  leftIcon={'account'}
                  variant={'outlined'}
                  returnKeyType={'next'}
                  secureTextEntry={false}
                  nextInputRef={email_ref}
                  value={formik.values.last_name}
                  placeholder={'Enter Last Name'}
                  formikError={formik.errors?.last_name}
                  formikTouched={formik.touched.last_name}
                  iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                  onChangeText={text => formik.setFieldValue('last_name', text)}
                  onBlur={() => formik.setFieldTouched('last_name', true)}
                  onBlurChange={() => formik.setFieldTouched('last_name', true)}
                  styleData={{
                    labelStyles: {
                      color: AppTheme?.DefaultPalette()?.grey[700],
                    },
                  }}
                />
              </AuthFieldsWrapper>

              <TextInput
                ref={email_ref}
                multiline={false}
                disabled={false}
                title={'Email'}
                inputMode={'text'}
                leftIcon={'email'}
                variant={'outlined'}
                returnKeyType={'done'}
                secureTextEntry={false}
                value={formik.values.email}
                placeholder={'Enter Your Email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                iconColor={AppTheme?.DefaultPalette()?.primary?.main}
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
                onBlurChange={() => formik.setFieldTouched('email', true)}
                styleData={{
                  labelStyles: {
                    color: AppTheme?.DefaultPalette()?.grey[700],
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
          <UserActivityWrapper style={styles.buttonsWrapper}>
            <ButtonAction
              end={true}
              title={'Update'}
              titleWeight={'bold'}
              loading={isLoading === 'updating'}
              onPress={() => formik.handleSubmit()}
              border={AppTheme?.DefaultPalette()?.buttons?.primary}
              color={AppTheme?.DefaultPalette()?.buttons?.primary}
              labelColor={AppTheme.DefaultPalette().common.white}
              loadingColor={AppTheme.DefaultPalette().common.white}
              disabled={
                !isObjEmpty(formik.errors) ||
                ['updating', 'delete_account'].includes(isLoading)
              }
            />
          </UserActivityWrapper>
          <UserActivityWrapper marginBottom={4} style={styles.buttonsWrapper}>
            <ButtonAction
              end={true}
              title={'Delete'}
              titleWeight={'bold'}
              loading={isLoading === 'delete_account'}
              border={AppTheme?.DefaultPalette()?.error?.main}
              color={AppTheme?.DefaultPalette()?.error?.main}
              labelColor={AppTheme.DefaultPalette().common.white}
              loadingColor={AppTheme.DefaultPalette().common.white}
              onPress={() => setModel('delete_account')}
              disabled={['updating', 'delete_account'].includes(isLoading)}
            />
          </UserActivityWrapper>
          <DeleteAccountModel
            title={'Delete Account'}
            open={model === 'delete_account'}
            onSubmit={handleDeleteAccount}
            onToggle={() => setModel('')}
            isLoading={isLoading === 'delete_user'}
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
