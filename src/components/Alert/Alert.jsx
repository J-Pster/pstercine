import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';

import './Alert.scss';

// eslint-disable-next-line react/display-name
const Alert = forwardRef(({severity, message}, ref) => {
  return (
    <MuiAlert id="alert" ref={ref} elevation={6} variant="filled" severity={severity} auto>
      {message}
    </MuiAlert>
  );
});

Alert.propTypes = {
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
