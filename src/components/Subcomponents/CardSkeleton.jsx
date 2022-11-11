import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import './CardSkeleton.scss'

export default function Variants() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" className='card_skeleton' height={300} sx={{ backgroundColor: '#252525', borderRadius: '20px' }} />
      <Skeleton variant="rounded" className='card_skeleton' height={60} sx={{ backgroundColor: '#252525', borderRadius: '20px' }} />
    </Stack>
  );
}
