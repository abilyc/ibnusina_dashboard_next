// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
} from '@mui/material';
//
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/static/icons/visioner2.png',
    title: 'Visioner',
    description:
      'Keputusan hari ini selalu disadari sebagai persiapan di masa depan',
  },
  {
    icon: '/static/icons/modern2.png',
    title: 'Modern',
    description:
      'Bertumpu pada prinsip pengelolaan yang transparan & terbuka',
  },
  {
    icon: '/static/icons/innovative.png',
    title: 'Inovatif',
    description:
      'Mengembangkan gagasan pendidikan dalam konteks kekinian',
  },
  {
    icon: '/static/icons/islami.png',
    title: 'Islami',
    description:
      'Berpedoman pada nilai-nilai dan ajaran quran dan sunnah',
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(0),
  },
}));


const BoxStyle = styled(Box)(({theme}) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    textAlign: 'center',
    boxShadow: `-10px 10px 40px 0 ${shadowCard(0.48)}`,
    padding: '40px 20px',
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    }
  }
});

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: `-40px 40px 80px 0 ${shadowCard(0.48)}`,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

const CardIconStyle = styled('img')(({ theme }) => ({
  width: 40,
  height: 40,
  margin: 'auto',
  marginBottom: theme.spacing(3),
  filter: shadowIcon(theme.palette.primary.main),
}));

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth='lg'>
        {/* <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography
              component='p'
              variant='overline'
              sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}
            >
              Minimal
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant='h2' sx={{ textAlign: 'center' }}>
              What minimal helps you?
            </Typography>
          </MotionInView>
        </Box> */}

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={3}>
              <MotionInView variants={varFadeInUp}>
                <BoxStyle
                  className={
                    (index === 0 && 'cardLeft') || (index === 1 && 'cardCenter')
                  }
                >
                  <CardIconStyle
                    src={card.icon}
                    alt={card.title}
                    sx={{
                      filter: (theme) => shadowIcon(theme.palette.info.main),
                      // ...(index === 0 && {
                      // }),
                      // ...(index === 1 && {
                      //   filter: (theme) => shadowIcon(theme.palette.error.main),
                      // }),
                    }}
                  />
                  <Typography variant='h5' paragraph>
                    {card.title}
                  </Typography>
                  <Typography
                    sx={{ color: isLight ? 'text.secondary' : 'common.white' }}
                  >
                    {card.description}
                  </Typography>
                </BoxStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
