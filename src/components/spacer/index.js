import React from 'react';

// ** Custom Components
import {SpacerWrapper} from '../../Styles';

const Spacer = props => {
  const {children, ...rest} = props;
  return <SpacerWrapper {...rest}>{children}</SpacerWrapper>;
};
export {Spacer};
