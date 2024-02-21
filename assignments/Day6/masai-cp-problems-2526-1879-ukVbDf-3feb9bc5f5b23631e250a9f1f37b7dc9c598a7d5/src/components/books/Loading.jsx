import React from 'react';
import { Stack, Skeleton } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Stack spacing={4} data-cy="loading_indicator">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default Loading;
