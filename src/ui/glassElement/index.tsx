import React, { ReactNode } from 'react';
import style from './glassElement.module.scss';
import { Box, BoxProps } from '@mui/material';

type Props = {
  children: ReactNode;
} & BoxProps;

const GlassElement = ({ children, sx, ...rest }: Props) => {
  return (
    <Box
      component={'article'}
      className={style.boxElement}
      sx={{
        zIndex: 10,
        position: 'relative',
        backdropFilter: 'blur(8px)',
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default GlassElement;
