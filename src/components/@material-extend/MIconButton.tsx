import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { IconButton } from '@mui/material';
//
import { FC } from 'react';
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

const MIconButton: FC<any> = forwardRef(({ children, ...other }, ref) => (
  <ButtonAnimate sx={undefined}>
    <IconButton ref={ref} {...other}>
      {children}
    </IconButton>
  </ButtonAnimate>
));

MIconButton.propTypes = {
  children: PropTypes.node,
};

export default MIconButton;
