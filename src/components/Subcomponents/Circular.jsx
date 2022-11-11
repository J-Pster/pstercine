/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const defineColor = (value) => {
  if(!value) return '#fff';
  // create a green to red color gradient
  const hue = ((value / 100) * 120).toString(10);
  return ['hsl(', hue, ',100%,50%)'].join('');
};

function CircularProgressWithLabel({value}) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      {console.log(value)}
      <CircularProgress
        variant="determinate"
        value={value ? value : 100}
        sx={{
          color: defineColor(value),
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {`${Math.round(value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel;
