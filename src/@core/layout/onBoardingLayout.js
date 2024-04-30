import React from 'react';
import {View, StatusBar, StyleSheet, Platform} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import PropTypes from 'prop-types';

// ** Custom Components
import {
  OnBoardingWrapper,
  OnBoardingContainer,
  OnBoardingHeaderWrapper,
} from '../../Styles/infrustucture';
import {Header} from '../../Components';

const OnBoardingLayout = props => {
  const {
    top = Platform.OS === 'android' ? 0 : AppTheme?.scrWidth < 500 ? 9 : 4,
    children,
    background,
    onBack = () => {},
    customStyles,
    marginTop = 15,
    headerTitle = '',
    animated = true,
    hidden = false,
    barStyle = 'dark-content',
    barBG = AppTheme?.DefaultPalette()?.background?.paper,
  } = props;
  return (
    <OnBoardingWrapper background={background}>
      <View style={[styles.layoutContainer, customStyles]}>
        <StatusBar
          hidden={hidden}
          barStyle={barStyle}
          animated={animated}
          backgroundColor={barBG}
          showHideTransition={'fade'}
        />
        <OnBoardingHeaderWrapper top={top}>
          <Header title={headerTitle} onBack={onBack} />
        </OnBoardingHeaderWrapper>
        <OnBoardingContainer marginTop={marginTop}>
          {children}
        </OnBoardingContainer>
      </View>
    </OnBoardingWrapper>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flexGrow: 1,
    position: 'relative',
    paddingTop: AppTheme?.WP(4),
  },
});

OnBoardingLayout.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
  customStyles: PropTypes.object,
  barBG: PropTypes.string,
  marginTop: PropTypes.number,
  top: PropTypes.number,
  headerTitle: PropTypes.string,
  onBack: PropTypes.func,
  barStyle: PropTypes.string,
};

export {OnBoardingLayout};
