import React, {forwardRef} from 'react';
import {ActivityIndicator} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import {ButtonLabel, ButtonWrapper, LoadingWrapper} from '../../Styles';

const ButtonAction = forwardRef((props, ref) => {
  const {
    size,
    title,
    border,
    color,
    width,
    onPress,
    children,
    loadingColor,
    customStyles,
    styles = {},
    end = false,
    start = false,
    loading = false,
    disabled = false,
    labelColor = `#fff`,
  } = props;

  return (
    <ButtonWrapper
      ref={ref}
      border={border}
      color={color}
      size={size}
      width={width}
      onPress={onPress}
      style={{...styles}}
      disabled={disabled || loading}>
      <ButtonLabel styles={customStyles?.title} labelColor={labelColor}>
        {title}
      </ButtonLabel>
      {children}

      <LoadingWrapper size={size} left={start} right={end} loading={loading}>
        <ActivityIndicator size={AppTheme.WP('5')} color={loadingColor} />
      </LoadingWrapper>
    </ButtonWrapper>
  );
});

export {ButtonAction};
