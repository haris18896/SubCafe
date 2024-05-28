import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// ** Custom Components
import {appImages} from '../../assets';

const PreparingOrder = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 6000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Image
        iterationCount={1}
        animation="slideInUp"
        style={styles.image}
        source={appImages?.mobileGif}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={styles.text}>
        Waiting for Restaurant to accept Order!
      </Animatable.Text>

      <Progress.Circle
        style={{marginTop: AppTheme?.WP(4)}}
        size={AppTheme?.WP(10)}
        indeterminate={true}
        color={AppTheme?.DefaultPalette()?.primary?.main}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    fontSize: AppTheme?.WP(5),
    color: AppTheme?.DefaultPalette()?.primary?.main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export {PreparingOrder};
