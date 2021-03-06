import PropTypes from 'prop-types';
import Image from 'next/image';
import { Icon } from '@iconify/react';
// import { paramCase } from 'change-case';
import eyeFill from '@iconify/icons-eva/eye-fill';
// import { Link as RouterLink } from 'react-router-dom';
import Link from 'next/link';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent, useMediaQuery, useTheme } from '@mui/material';
import SvgIconStyle from '../SvgIconStyle';
// library 
import convertToKilo from 'lib/convertToKilo';
import FormatDate from 'lib/fromatDate';
// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});


const StyledA = styled('a')({
  cursor: 'pointer',
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
});

const TitleStyle = props => (
  <Link passHref prefetch={false} {...props}>
    <StyledA sx={props.sx}>{props.value}</StyledA>
  </Link>
);

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled(Image)({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

// const myLoader = () => {
//   return `/public/static/loader/loading.svg`
// }


export default function BlogPostCard({ post, index }) {
  const { imageUrl, author, title, meta, createdAt, slug } = post;
  const linkTo = `/blog/${slug}`;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;
  
  const POST_INFO = [
    { number: !meta?.commentCount ?0: convertToKilo({number:meta.commentCount}), icon: messageCircleFill },
    { number: !meta?.viewCount ?0: convertToKilo({number:meta.viewCount}), icon: eyeFill },
    { number: !meta?.shareCount ?0: convertToKilo({number:meta.shareCount}), icon: shareFill }
  ];

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...(((latestPostLarge || latestPost) && !isMobile) && {
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...((!isMobile) && {pt: 'calc(100% * 4 / 3)'}),
            ...((!isMobile && !latestPost && !latestPostLarge) && {pt: 'calc(100% * 3 / 4)'}),
            ...((latestPostLarge && !isMobile) && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src='/static/icons/shape-avatar.svg'
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...(((latestPostLarge || latestPost) && !isMobile) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={author?.callName}
            src={author?.avatar}
            sx={{
              ...(((latestPostLarge || latestPost) && !isMobile) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          {/* <CoverImgStyle alt={title} src={imageUrl+'/-/format/jpeg/-/quality/smart/'} layout='fill' placeholder='blur' blurDataURL={imageUrl ? imageUrl.replace('/png','/jpeg').replace('/smart', '/lightest') :  'https://ucarecdn.com/aec5aa94-6669-4e36-b411-3672ff33fd7b/-/format/jpeg/-/quality/lightest/amaliahtadris1024x576.png'} /> */}
          <CoverImgStyle alt={title} src={imageUrl} layout='fill' placeholder='blur' blurDataURL={imageUrl.replace('/png','/jpeg').replace('/smart', '/lightest')} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...(((latestPostLarge || latestPost) && !isMobile) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {FormatDate(createdAt)}
          </Typography>

          <TitleStyle 
            href={linkTo}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
            value={title} 
          />


          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{info.number}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
