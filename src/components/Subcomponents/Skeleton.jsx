import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={210} height={300} sx={{ backgroundColor: '#252525', borderRadius: '20px' }} />
      <Skeleton variant="rounded" width={210} height={60} sx={{ backgroundColor: '#252525', borderRadius: '20px' }} />
    </Stack>
  );
}
