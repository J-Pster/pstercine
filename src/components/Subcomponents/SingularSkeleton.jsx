import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height="75vh" sx={{ backgroundColor: '#252525', borderRadius: '0 0 20px 20px', marginTop: '-140px' }} />
    </Stack>
  );
}
