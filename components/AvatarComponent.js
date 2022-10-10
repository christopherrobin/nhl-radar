import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

const AvatarComponent = ({url, size, altText, containerStyles}) => {
  return (
    <Box sx={containerStyles || {}}>
      <Image
        className="circle-image"
        alt={altText}
        height={size || 100}
        width={size || 100}
        src={url}
        priority
      />
    </Box>
  );
};

export default AvatarComponent;
