import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
//import axios from '../Axios.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';

//import {validatePassword, validateEmail} from '../helper/validate.js'

const useStyles = makeStyles((theme) => ({
  radio: {
    '&$checked': {
      color: '#22577A',
    },
  },
  checked: {},
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  warning: {
    marginTop: '15px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  dobField: {
    marginLeft: '-5px',
    width: '185px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  aligncenter: {
    display: 'flex',
    justifyContent: ' center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
  },
  gendergroup: {
    display: 'flex',
    float: 'right',
    marginLeft: '30px',
  },
  genderlabel: {
    display: 'flex',
    float: 'left',
    marginTop: '0px',
    marginLeft: '10px',
  },
  alert: {
    width: '400px',
    marginTop: '10px',
  },
  fullsizepass: {
    width: '395px',
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  let [areaOfInterestArray, setAreaOfInterestArray] = useState([]);
  const [error,setError] = useState('')

  const [ngo, setNgo] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    website: '',
    areaOfInterest: [],
  });

  useEffect(() => {
    // console.log(areaOfInterestArray);
    setNgo({ ...ngo, areaOfInterest: areaOfInterestArray });
  }, [areaOfInterestArray]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setNgo({ ...ngo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (evt) => {
    // setNgo({ ...ngo, role: 'NGO', areaOfInterest:areaOfInterestArray})
    try {
      evt.preventDefault();
      // console.log(areaOfInterestArray);
      // console.log(ngo);
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { ...ngo, role: 'NGO' }
      );
      if (response.status === 200) {
        alert('Sign Up successful !');
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.type === 'Unauthorized') {
          navigate('/login');
        } else setError(error.response.data.message);
      } else setError('An Error Occured');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4' color='textSecondary'>
          Sign up as NGO
        </Typography>
        {emailError && (
          <Alert className={classes.alert} severity='error'>
            {emailError}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Name of the NGO'
                autoFocus
                value={ngo.Name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={ngo.email}
                onChange={(e) => {
                  handleChange(e);
                  //window.errorEmail = (validateEmail(e.target.value));
                }}
              />
              {window.errorEmail &&
                (window.errorEmail === 'Enter valid Email!' ? (
                  <Alert className={classes.warning} severity='warning'>
                    {window.errorEmail}
                  </Alert>
                ) : (
                  <Alert className={classes.warning} severity='success'>
                    {window.errorEmail}
                  </Alert>
                ))}
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.fullsizepass} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  value={ngo.password}
                  onChange={(evt) => {
                    //  window.errorPassword = (validatePassword(evt.target.value));
                    setNgo({
                      ...ngo,
                      password: evt.target.value,
                    });
                  }}
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
              {window.errorPassword &&
                (window.errorPassword === 'Password is weak' ? (
                  <Alert className={classes.warning} severity='warning'>
                    {window.errorPassword}
                  </Alert>
                ) : (
                  <Alert className={classes.warning} severity='success'>
                    {window.errorPassword}
                  </Alert>
                ))}
            </Grid>

            <Grid item xs={12} >
              <TextField
                variant='outlined'
                required
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                name='phone'
                autoComplete='phoneNumber'
                value={ngo.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='website'
                label='website'
                name='website'
                value={ngo.website}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='phone'
                label='Phone Number'
                name='phone'
                // autoComplete="email"
                value={ngo.phone}
                onChange={(e) => {
                  handleChange(e);
                  //window.errorEmail = (validateEmail(e.target.value));
                }}
              />
            </Grid> */}
            <Grid className={classes.aligncenter}>
              <FormLabel className={classes.genderlabel} component='legend'>
                Area of Interest:
              </FormLabel>

              {/* <FormGroup className={classes.allspec}> */}
              <FormControlLabel
                className={classes.checkboxes}
                name='0'
                // key={index}
                control={
                  <Checkbox
                    onClick={(e) => {
                      if (e.target.checked) {
                        setAreaOfInterestArray((areaOfInterestArray) => [
                          ...areaOfInterestArray,
                          e.target.name,
                        ]);
                      } else {
                        setAreaOfInterestArray(
                          areaOfInterestArray.filter(
                            (item) => item !== e.target.name
                          )
                        );
                      }
                      setNgo({ ...ngo, areaOfInterest: areaOfInterestArray });
                    }}
                  />
                }
                label='0'
              />
              <FormControlLabel
                className={classes.checkboxes}
                name='1'
                // key={index}
                control={
                  <Checkbox
                    onClick={(e) => {
                      if (e.target.checked) {
                        setAreaOfInterestArray((areaOfInterestArray) => [
                          ...areaOfInterestArray,
                          e.target.name,
                        ]);
                      } else {
                        setAreaOfInterestArray(
                          areaOfInterestArray.filter(
                            (item) => item !== e.target.name
                          )
                        );
                      }
                      setNgo({ ...ngo, areaOfInterest: areaOfInterestArray });
                    }}
                  />
                }
                label='1'
              />
              <FormControlLabel
                className={classes.checkboxes}
                name='2'
                // key={index}
                control={
                  <Checkbox
                    onClick={(e) => {
                      if (e.target.checked) {
                        setAreaOfInterestArray((areaOfInterestArray) => [
                          ...areaOfInterestArray,
                          e.target.name,
                        ]);
                      } else {
                        setAreaOfInterestArray(
                          areaOfInterestArray.filter(
                            (item) => item !== e.target.name
                          )
                        );
                      }
                      setNgo({ ...ngo, areaOfInterest: areaOfInterestArray });
                    }}
                  />
                }
                label='2'
              />
              <FormControlLabel
                className={classes.checkboxes}
                name='3'
                // key={index}
                control={
                  <Checkbox
                    onClick={(e) => {
                      if (e.target.checked) {
                        setAreaOfInterestArray((areaOfInterestArray) => [
                          ...areaOfInterestArray,
                          e.target.name,
                        ]);
                      } else {
                        setAreaOfInterestArray(
                          areaOfInterestArray.filter(
                            (item) => item !== e.target.name
                          )
                        );
                      }
                      setNgo({ ...ngo, areaOfInterest: areaOfInterestArray });
                    }}
                  />
                }
                label='3'
              />
              <FormControlLabel
                className={classes.checkboxes}
                name='4'
                // key={index}
                control={
                  <Checkbox
                    onClick={(e) => {
                      if (e.target.checked) {
                        setAreaOfInterestArray((areaOfInterestArray) => [
                          ...areaOfInterestArray,
                          e.target.name,
                        ]);
                      } else {
                        setAreaOfInterestArray(
                          areaOfInterestArray.filter(
                            (item) => item !== e.target.name
                          )
                        );
                      }
                      setNgo({ ...ngo, areaOfInterest: areaOfInterestArray });
                    }}
                  />
                }
                label='4'
              />
              {/* <Checkbox 
                 name="Child-labor"
                 onClick={e => {
                   console.log(e.target.name)
                  if(e.target.checked) {
                    console.log('checked')
                    setAreaOfInterestArray([...areaOfInterestArray, e.target.name]);
                  }else{
                    console.log('unchecked')
                    setAreaOfInterestArray(areaOfInterestArray.filter(item => item !== e.target.name));
                  }
                  setNgo({...ngo,areaOfInterest:areaOfInterestArray})
                  console.log(areaOfInterestArray)
                }
                }
                // inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                
            />Child-labor
            
            <Checkbox
              name="Child Abuse"
             onClick={e => {
              if(e.target.checked) {
                console.log("checked")
                setAreaOfInterestArray([...areaOfInterestArray, e.target.name]);
              }else{
                console.log("uchecked")
                setAreaOfInterestArray(areaOfInterestArray.filter(item => item !== e.target.name));
              }
              setNgo({...ngo,areaOfInterest:areaOfInterestArray})
              console.log(areaOfInterestArray)
            }
            }
            //  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
            
            />Child Abuse
             
            <Checkbox
                name="Education"
                 onClick={e => {
                  if(e.target.checked) {
                  console.log("checked")
                    setAreaOfInterestArray([...areaOfInterestArray, e.target.name]);
                  }else{
                  console.log("unchecked")
                    setAreaOfInterestArray(areaOfInterestArray.filter(item => item !== e.target.name));
                  }
                  setNgo({...ngo,areaOfInterest:areaOfInterestArray})
                  console.log(areaOfInterestArray)
                }
                }
            //  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
             />Education

            <Checkbox
            name="Awareness"
                 onClick={e => {
                  if(e.target.checked) {
                    console.log("checked")
                    setAreaOfInterestArray([...areaOfInterestArray, e.target.name]);
                  }else{
                    console.log("unchecked")
                    setAreaOfInterestArray(areaOfInterestArray.filter(item => item !== e.target.name));
                  }
                  setNgo({...ngo,areaOfInterest:areaOfInterestArray})
                  console.log(areaOfInterestArray)
                }
                }
            //  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} 
             />
             Awareness */}
              {/* </FormGroup> */}
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            style={{ backgroundColor: '#22577A', color: '#FFFFFF' }}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Link href='/login' variant='body2' color='inherit'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
