import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
// material
import { styled, useTheme } from '@mui/material/styles';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { Login, StaffOnly } from '../../components/login';
// import { useAuth } from 'src/db/auth';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children }) {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  if (status === "loading") return <div>tunggu sedang memuat</div>
  if (!session) return <Login />
  // console.log(session.active, session.callName);
  if (session.active !== 2) return <StaffOnly/>
  // const { myData } = useAuth();
  // console.log(session);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} myData={session} />
      {/* <DashboardNavbar onOpenSidebar={() => setOpen(true)} /> */}
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        myData={session}
      />
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex,
          }),
          ...(collapseClick && {
            ml: '102px',
          }),
        }}
      >
        {children}
      </MainStyle>
    </RootStyle>
  );
}
