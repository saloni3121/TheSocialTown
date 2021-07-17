import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: '-25px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    width: '500px',
    position: 'relative',
    padding: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(12),
      paddingRight: 0,
    },
  },
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();

  return (
    <>
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1594708767771-a7502209ff51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80)`,
        }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component='h5'
                variant='h3'
                color='inherit'
                gutterBottom
              >
                Connecting people for better outcomes
              </Typography>
              <Typography variant='p' color='inherit' paragraph>
              The Social Town (Social Town Foundation ) is an early stage non profit startup registered as a Section 8 company under the Ministry of Corporate Affairs. A virtual platform for builders and social change makers where they can Iearn about each other, support and exchange resources.
              </Typography>
              <Button
                href='/login'
                variant='contained'
                style={{ backgroundColor: '#22577A', color: '#fff' }}
              >
                Sign up for Volunteering now
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

// MainFeaturedPost.propTypes = {
//   post: PropTypes.object,
// };
