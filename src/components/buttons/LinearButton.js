import React, {Fragment} from 'react';

// ** Third Party Components
import PropTypes from 'prop-types';

// ** Custom Components
import {
  LinearButtonView,
  LinearButtonTitle,
  LinearButtonWrapper,
  LinearButtonContainer,
  LinearIcon,
} from '../../styles/components';

const LinearButton = props => {
  const {title, disabled, icon, selected, onPress, size, styles, badge} = props;

  // ** Constants
  const linearGRDarkLight = ['#FFC279', '#fc8019'];
  const linearGRDisabledLight = ['#D0D0D0', '#B0B0B0'];

  return (
    <Fragment>
      <LinearButtonWrapper
        width={size?.width}
        selected={selected}
        height={size?.height}
        colors={disabled ? linearGRDisabledLight : linearGRDarkLight}
        style={styles?.mainContainer}>
        {icon && <LinearIcon>{icon}</LinearIcon>}
        <LinearButtonContainer disabled={disabled} onPress={onPress}>
          <LinearButtonView
            pl={styles?.container?.pl}
            pr={styles?.container?.pr}
            pt={styles?.container?.pt}
            pb={styles?.container?.pb}>
            {title && (
              <LinearButtonTitle fontSize={styles?.container?.titleFontSize}>
                {title}
              </LinearButtonTitle>
            )}
          </LinearButtonView>
        </LinearButtonContainer>
      </LinearButtonWrapper>
    </Fragment>
  );
};

LinearButton.propTypes = {
  size: PropTypes.object,
  styles: PropTypes.object,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
export {LinearButton};
