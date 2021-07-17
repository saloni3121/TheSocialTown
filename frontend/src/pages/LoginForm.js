// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function LoginForm() {
//     const navigate = useNavigate();

//     const [user, setUser] = useState({ email: '', password: '' });

//     const handleChange = (evt) => {
//         setUser({ ...user, [evt.target.name]: evt.target.value });
//     };

//     const handleClick = async (evt) => {
//         try {
//             evt.preventDefault();
//             const response = await axios.post(
//                 `http://localhost:5000/api/auth/login`,
//                 user
//             );
//             console.log(response.data);
//             if (response.status === 200) {
//                 window.localStorage.setItem('accessToken', response.data.accessToken);
//                 navigate(`/home`);
//             }
//         } catch (error) {
//             console.log(error.response);
//         }
//     };

//     return (
//         <div>
//             <h1>Login Form</h1>
//             <p>Email</p>
//             <input type="text" name="email" value={user.email} onChange={handleChange} />
//             <p>Password</p>
//             <input type="password" name="password" value={user.password} onChange={handleChange} />
//             <div>
//                 <button onClick={handleClick}>Login</button>
//             </div>
//             <Link to="/register">Register?</Link>
//         </div>
//     )
// }

// export default LoginForm

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../Axios.js';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href={'/admin'}>
        The Social Town
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#22577A',
  },
  form: {
    width: '90%',
    marginTop: theme.spacing(1),
  },
  aligncenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '500px',
    marginLeft: '-70px',
    marginTop: '20px',
  },
  fullsizepass: {
    width: '355px',
  },
  topmargin: {
    marginTop: '10px',
  },
  alert: {
    width: '390px',
    marginTop: '-50px',
    marginBottom: '20px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = async (evt) => {
    try {
      evt.preventDefault();
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        user
      );
      window.localStorage.setItem('accessToken', response.data.accessToken);
      window.localStorage.setItem('refreshToken', response.data.refreshToken);
      const role = response.data.role;
      const userId = response.data._id;
      if (role === 'Admin') navigate(`/${userId}/admin-home`);
      else if (role === 'Volunteer') navigate(`/${userId}/volunteer-home`);
      else if (role === 'NGO') navigate(`/${userId}/ngo-home`);
      else if (role === 'Corporate') navigate(`/${userId}/corporate-home`);
      else navigate('/login');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else setError('An Error Occured');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {error && (
          <Alert className={classes.alert} severity='error'>
            {error}
          </Alert>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h4' color='textSecondary'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleClick}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={user.email}
            onChange={handleChange}
          />
          <FormControl className={classes.fullsizepass} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              name='password'
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              value={user.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />
          </FormControl>

          <FormControlLabel
            className={classes.topmargin}
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            style={{ backgroundColor: '#22577A', color: '#FFFFFF' }}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container className={classes.aligncenter}>
            <Grid item xs>
              <Link href='/register/corporate' variant='body2' color='inherit'>
                Register as Corporate
              </Link>
            </Grid>
            <Grid item xs>
              <Link href='/register/ngo' variant='body2' color='inherit'>
                Register as NGO
              </Link>
            </Grid>
            <Grid item xs>
              <Link href='/register/volunteer' variant='body2' color='inherit'>
                {'Register as Volunteer'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
