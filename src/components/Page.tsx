import Head from 'next/head';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';
import { FC } from 'react';

// ----------------------------------------------------------------------

const Page: FC<any> = forwardRef(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
