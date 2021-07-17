import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import FormGroup from '@material-ui/core/FormGroup';
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
//import axios from '../Axios.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
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
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 395,
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

export default function Volunter(props) {
  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [corporateUsers, setCorporateUsers] = useState([]);
  let [areaOfInterestArray, setAreaOfInterestArray] = useState([]);

  const [vol, setVol] = useState({
    name: '',
    email: '',
    password: '',
    corporate: '',
    area: [],
    phoneNumber: '',
    hrs: '',
  });

  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
    setVol({ ...vol, areaOfInterest: areaOfInterestArray });
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/all-users');
        const allUsers = response.data;
        const corporateUsers = allUsers.filter(
          (user) => user.role === 'Corporate'
        );
        setCorporateUsers(corporateUsers);
      } catch (error) {
        if (error.response) {
          if (error.response.data.type === 'Unauthorized') {
            navigate('/login');
          } else setError(error.response.data.message);
        } else setError('An Error Occured');
      }
    }
    fetchData();
  }, [areaOfInterestArray]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setVol({ ...vol, [e.target.name]: e.target.value });
  };

  const handleChangeOption = (event) => {
    setChecked(event.target.checked);
    setVol({ ...vol, area: event.target.value });
  };

  const handleClick = async (evt) => {
    try {
      evt.preventDefault();
      console.log(vol);
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { ...vol, role: 'Volunteer', phone: vol.phoneNumber }
      );
      if (response.status === 200) {
        alert('Sign Up successful!');

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
          Sign up as Volunteer
        </Typography>
        {error && (
          <Alert className={classes.alert} severity='error'>
            {error}
          </Alert>
        )}
        <form className={classes.form} noValidate onSubmit={handleClick}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Full Name'
                autoFocus
                value={vol.Name}
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
                value={vol.email}
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
                  value={vol.password}
                  onChange={(evt) => {
                    //  window.errorPassword = (validatePassword(evt.target.value));
                    setVol({
                      ...vol,
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
            {/* error aaya volunteer mein */}
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='phoneNumber'
                label='Phone Number'
                name='phoneNumber'
                autoComplete='phoneNumber'
                value={vol.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Corporate
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={vol.corporate === '' ? 'None' : vol.corporate}
                  name='corporate'
                  fullWidth
                  onChange={handleChange}
                  label='Corporate'
                >
                  <MenuItem value=''>None</MenuItem>
                  {corporateUsers.map((corporate) => (
                    <MenuItem key={corporate._id} value={corporate.name}>
                      {corporate.name}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={2}>A</MenuItem>
                    <MenuItem value={3}>B</MenuItem>
                    <MenuItem value={4}>C</MenuItem>
                    <MenuItem value={5}>D</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>

            {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="vol-native-simple">Organization</InputLabel>
                <Select
                native
                value={vol.org}
                onChange={handleChange}
                inputProps={{
                    name: 'org',
                    id: 'vol-native-simple',
                }}
                >
                <option aria-label="None" value="" />
                <option value={"None"}>None</option>
                <option value={"A"}>A</option>
                <option value={"B"}>b</option>
                </Select>
            </FormControl> */}

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
                      setVol({ ...vol, areaOfInterest: areaOfInterestArray });
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
                      setVol({ ...vol, areaOfInterest: areaOfInterestArray });
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
                      setVol({ ...vol, areaOfInterest: areaOfInterestArray });
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
                      setVol({ ...vol, areaOfInterest: areaOfInterestArray });
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
                      setVol({ ...vol, areaOfInterest: areaOfInterestArray });
                    }}
                  />
                }
                label='4'
              />
              {/* <FormControl component="fieldset" className={classes.formControl}> */}
              {/* <FormLabel style={{fontSize: '12px', marginLeft: '-37px', marginBottom: '4px'}} component="legend">Filter by specialisation </FormLabel> */}
              {/* <FormGroup className={classes.allspec}>
            {arrayUniqueByKey.sort((a, b) => a.specialisation.localeCompare(b.specialisation)).map((option, index) => (
                <FormControlLabel
                className={classes.checkboxes}
                name={option.specialisation}
                key={index}
                    control={<Checkbox 
                      onClick={e => {
                      if(e.target.checked) {
                        let spread = {...vol}
                        let arr = [...spread.area]
                        arr.push(e.target.name)
                        setVol({...vol, area:arr});
                      }else{
                        setVol(vol.filter(item => item !== e.target.name));
                      }
                    }
                    }
                    />}
                  label= {option.specialisation}
                />
            ))}
            </FormGroup>
            </FormControl> */}
              {/* <FormLabel className={classes.genderlabel} component="legend" >Area of Interest :</FormLabel>
            <Checkbox
                checked={checked}
                onChange={handleChangeOption}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />Child-labor
                    <Checkbox
                checked={checked}
                onChange={handleChangeOption}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />Child-labor
                    <Checkbox
                checked={checked}
                onChange={handleChangeOption}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />Child-labor
                    <Checkbox
                checked="true"
                onChange={handleChangeOption}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />Child-labor */}
            </Grid>
          </Grid>
          {/* <Grid className={classes.aligncenter}>
            <FormLabel className={classes.genderlabel} component="legend" >Days available :</FormLabel>
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Monday
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Tuesday
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Wednesday
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Thrusday
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Friday
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Saturday
            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />Sunday
            </Grid> */}

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
