import React, {useState, forwardRef} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

// ** Utils
import {resizeMode} from '../../../utils/constants';
import {theme as AppTheme} from '../../infrustructure/theme';

// ** Third Party Packages
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

// ** Custom Components
import {
  Input,
  InputLabel,
  InputContainer,
  TextInputWrapper,
  LeftIconWrapper,
  RightIconWrapper,
} from '../../../Styles/components';
import {ErrorText} from '../../../Styles/infrustucture';

const TextInput = forwardRef((props, ref) => {
  const {
    error,
    width,
    title,
    height,
    submit,
    onBlur,
    onFocus,
    leftIcon,
    disabled,
    rightIcon,
    placeholder,
    formikError,
    nextInputRef,
    defaultValue,
    formikTouched,
    placeholderColor = AppTheme.DefaultPalette().text.main,
    borderColor = null,
    styleData = null,
    maxLength = 40,
    inputMode = 'text',
    textAlign = 'left',
    autoFocus = false,
    variant = 'outlined',
    autoComplete = 'off',
    returnKeyType = 'next',
    autoCorrect = false,
    blurOnSubmit = false,
    autoCapitalize = 'none',
    keyboardType = 'default',
    secureTextEntry = false,
    iconColor = AppTheme.DefaultPalette().primary.contrastText,
    imageIcon = null,
    ...rest
  } = props;

  const [showPass, setShowPass] = useState(true);

  return (
    <TextInputWrapper width={width}>
      {title && (
        <InputLabel labelStyles={styleData?.labelStyles}>{title}</InputLabel>
      )}
      <InputContainer
        height={height}
        left={leftIcon}
        right={rightIcon}
        borderColor={borderColor}
        secureTextEntry={secureTextEntry}
        error={formikTouched && formikError}>
        <LeftIconWrapper>
          {imageIcon?.left ? (
            <Image
              resizeMode={resizeMode}
              source={imageIcon?.left?.icon}
              style={{
                width: AppTheme.WP(imageIcon?.left?.width),
                height: AppTheme.WP(imageIcon?.left?.height),
              }}
            />
          ) : (
            leftIcon && (
              <Icon name={leftIcon} color={iconColor} size={AppTheme.WP(5)} />
            )
          )}
        </LeftIconWrapper>

        <Input
          {...rest}
          ref={ref}
          mode={variant}
          height={height}
          onBlur={onBlur}
          onFocus={onFocus}
          imageIcon={imageIcon}
          editable={!disabled}
          maxLength={maxLength}
          autoFocus={autoFocus}
          inputMode={inputMode}
          textAlign={textAlign}
          formikError={formikError}
          placeholder={placeholder}
          autoCorrect={autoCorrect}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          blurOnSubmit={blurOnSubmit}
          enterKeyHint={returnKeyType}
          formikTouched={formikTouched}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry && showPass}
          placeholderTextColor={placeholderColor}
          onSubmitEditing={() => {
            if (nextInputRef && nextInputRef.current) {
              nextInputRef.current.focus();
            } else if (returnKeyType === 'done') {
              ref.current.blur();
              submit();
            } else {
              onBlur();
            }
          }}
        />

        <RightIconWrapper>
          {imageIcon?.right ? (
            <Image
              resizeMode={resizeMode}
              source={imageIcon?.right?.icon}
              style={{
                width: AppTheme.WP(imageIcon?.right?.width),
                height: AppTheme.WP(imageIcon?.right?.height),
              }}
            />
          ) : (
            rightIcon &&
            !secureTextEntry && (
              <Icon
                name={rightIcon}
                color={iconColor}
                size={AppTheme.WP(5.5)}
              />
            )
          )}

          {secureTextEntry && !rightIcon && (
            <Pressable onPress={() => setShowPass(!showPass)}>
              <Icon
                size={AppTheme.WP(5)}
                name={showPass ? 'visibility-off' : 'visibility'}
                color={
                  showPass ? iconColor : AppTheme.DefaultPalette().success.main
                }
              />
            </Pressable>
          )}
        </RightIconWrapper>
      </InputContainer>

      {formikTouched && formikError && (
        <ErrorText
          style={styles.errorStyles(formikError, styleData?.errorMargin)}>
          {formikError}
        </ErrorText>
      )}
    </TextInputWrapper>
  );
});

const styles = StyleSheet.create({
  errorStyles: (error, errorMargin) => ({
    position: 'absolute',
    bottom: error.length > 70 ? AppTheme.WP(-8.2) : AppTheme.WP(-5),
    left: AppTheme.WP('1'),
  }),
});

TextInput.propTypes = {
  error: PropTypes.bool,
  onBlur: PropTypes.func,
  submit: PropTypes.func,
  title: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes?.func,
  autoFocus: PropTypes.bool,
  variant: PropTypes.string,
  leftIcon: PropTypes.string,
  styleData: PropTypes.object,
  maxLength: PropTypes.number,
  inputMode: PropTypes.string,
  textAlign: PropTypes.string,
  rightIcon: PropTypes.string,
  autoCorrect: PropTypes.bool,
  iconColor: PropTypes.string,
  imageIcon: PropTypes.object,
  blurOnSubmit: PropTypes.bool,
  formikTouched: PropTypes.bool,
  placeholder: PropTypes.string,
  formikError: PropTypes.string,
  nextInputRef: PropTypes.object,
  defaultValue: PropTypes.string,
  keyboardType: PropTypes.string,
  autoComplete: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  autoCapitalize: PropTypes.string,
};

export {TextInput};
