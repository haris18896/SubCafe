import React, {useEffect, useState} from 'react';

// ** Utils
import {theme as AppTheme} from '../../infrustructure/theme';

// ** Third party Packages
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// ** Custom Packages
import {appLottie} from '../../../assets';
import {ButtonAction} from '../../../Components';
import {SectionTitle} from '../../../Styles/typography';
import {UserActivityWrapper} from '../../../Styles/Screens';

const OfflineWrapper = ({children}) => {
  // ** STATES
  const [status, setStatus] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [status]);

  const handleReload = () => {
    setIsConnected(true);
    // NetInfo.addEventListener(state => {
    //   console.log('check state : ', state.isConnected);
    //   setIsConnected(state.isConnected);
    // });
  };

  return (
    <View style={styles.container}>
      {isConnected ? (
        children
      ) : (
        <View style={styles.offlineContainer}>
          <LottieView
            loop
            autoPlay
            style={styles.animation}
            source={appLottie?.noInternet}
          />
          <SectionTitle style={styles.text}>
            Internet is not available at the moment
          </SectionTitle>

          <UserActivityWrapper style={styles.reloadButtonWrapper}>
            <ButtonAction
              left={false}
              end={true}
              title={'Reload'}
              titleWeight={'bold'}
              color={AppTheme.DefaultPalette().success.main}
              labelColor={AppTheme.DefaultPalette().common.white}
              loadingColor={AppTheme.DefaultPalette().common.white}
              icon={{
                size: 5,
                name: 'arrow-forward',
                color: AppTheme.DefaultPalette().primary?.reverseContrastText,
              }}
              onPress={() => handleReload()}
            />
          </UserActivityWrapper>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
  reloadButtonWrapper: {
    paddingHorizontal: AppTheme?.WP(4),
    marginTop: AppTheme?.WP(4),
  },
});

export default OfflineWrapper;
