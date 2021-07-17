import React, { useState } from 'react';
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
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { useParams } from 'react-router-dom';


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

export default function PostCard(props) {
  const classes = useStyles();
  const { id } = useParams();

  const [post, setPost] = useState({
    title: '',
    description: '',
    opening: '',
    noOfHours: '',
    domain: '',
    createdBy: id,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const [checked, setChecked] = React.useState(true);

  const handleChangeOption = (event) => {
    setChecked(!checked);
    setPost({ ...post, area: event.target.value });
  };

  const handleCreate = async (evt) => {
    try {
      // evt.preventDefault();
      console.log(post);
      const response = await axios.post(
        'http://localhost:5000/api/post-requirement',
        post
      );
      if (response.status === 200) {
        alert('Requirement Posted successful !');
        // navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h4' color='textSecondary'>
          Post a requirement:
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='title'
                variant='outlined'
                required
                fullWidth
                id='title'
                label='Title'
                autoFocus
                value={post.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='description'
                variant='outlined'
                required
                fullWidth
                id='description'
                label='Description'
                autoFocus
                value={post.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='numberOfOpenings'
                label='Number of opening'
                name='opening'
                autoComplete='no_of_hours'
                value={post.opening}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='no_of_hrs'
                label='Hours you require from a volunteer'
                name='noOfHours'
                // autoComplete="no_of_hours"
                value={post.noOfHours}
                onChange={handleChange}
              />
            </Grid>

            <div>
              <FormControl component='fieldset'>
                <FormLabel
                  component='legend'
                  style={{ marginLeft: '-80px', marginTop: '10px' }}
                >
                  Area of Interest:
                </FormLabel>
                <RadioGroup
                  row
                  aria-label='position'
                  name='position'
                  defaultValue='top'
                  style={{ marginLeft: '10px' }}
                >
                  <FormControlLabel
                    value='0'
                    control={
                      <Radio
                        onChange={(e) => {
                          setPost({ ...post, domain: e.target.value });
                        }}
                        color='primary'
                      />
                    }
                    label='0'
                  />
                  <FormControlLabel
                    value='1'
                    control={
                      <Radio
                        onChange={(e) => {
                          setPost({ ...post, domain: e.target.value });
                        }}
                        color='primary'
                      />
                    }
                    label='1'
                  />

                  <FormControlLabel
                    value='2'
                    control={
                      <Radio
                        onChange={(e) => {
                          setPost({ ...post, domain: e.target.value });
                        }}
                        color='primary'
                      />
                    }
                    label='2'
                  />

                  <FormControlLabel
                    value='3'
                    control={
                      <Radio
                        onChange={(e) => {
                          setPost({ ...post, domain: e.target.value });
                        }}
                        color='primary'
                      />
                    }
                    label='3'
                  />

                  <FormControlLabel
                    value='4'
                    control={
                      <Radio
                        onChange={(e) => {
                          setPost({ ...post, domain: e.target.value });
                        }}
                        color='primary'
                      />
                    }
                    label='4'
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            style={{ backgroundColor: '#22577A', color: '#FFFFFF' }}
            className={classes.submit}
          >
            Post Requirement
          </Button>
        </form>
      </div>
    </Container>
  );
}
