import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant='body2' style={{ color: '#fff' }} align='center'>
      {'Copyright © '}
      <Link
        color='inherit'
        href='https://material-ui.com/'
        style={{ textDecoration: 'none' }}
      >
        The Social Town
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#22577A',
    marginTop: '60px',
    padding: theme.spacing(3, 0),
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth='lg'>
        <Typography variant='h6' align='center' gutterBottom>
          {title}
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='textSecondary'
          component='p'
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

