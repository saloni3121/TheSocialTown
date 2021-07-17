import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '85px',
  },
  logo_img:{
      width:'60px',
      height:'60px',
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    marginLeft: '-950px',
  },
  comp:{
    //   marginTop: '-20px'
    marginLeft: '20px'
  },
  navlink: {
    marginRight: '10px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '14px',
    textUnderlineOffset: 'none',
  },
  bg: {
    backgroundColor: '#22577A',
    borderRadius: '0px',
    height: '85px',
  },
  allnav: {
    float: 'right',
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bg} position='static'>
        <Toolbar>
        <img className={classes.logo_img} src={Logo}></img>
          <Typography variant='h6' className={classes.comp}>The Small Town</Typography>
          <Typography variant='h6' className={classes.title}></Typography>
          <Typography className={classes.allnav}>
            {props.loggedIn ? (
              <>
                {props.isPatient ? (
                  <>
                    <Link
                      to={`/history/${props.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button className={classes.navlink} color='inherit'>
                        Recent Appointments
                      </Button>
                    </Link>
                    <Button
                      onClick={props.logout}
                      className={classes.navlink}
                      color='inherit'
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button href='' className={classes.navlink} color='inherit'>
                      Schedule
                    </Button>
                    <Button href='' className={classes.navlink} color='inherit'>
                      Account
                    </Button>
                    <Button
                      onClick={props.logout}
                      className={classes.navlink}
                      color='inherit'
                    >
                      Logout
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  href='#precaution'
                  className={classes.navlink}
                  color='inherit'
                >
                  The Good Will Work
                </Button>
                <Button
                  href='#doctorCaro'
                  className={classes.navlink}
                  color='inherit'
                >
                  COnnect with Us
                </Button>
                <Button
                  href='/login'
                  className={classes.navlink}
                  color='inherit'
                >
                  Login
                </Button>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
