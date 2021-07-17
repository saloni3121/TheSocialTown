import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Work from '../images/work.png'
import ReactPlayer from 'react-player';

const useStyles = makeStyles({
  root: {
    maxWidth: 265,
    marginLeft: '50px',
  },
  media: {
    height: 140,
  },
  title: {
    marginBottom: '15px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  precaution: {
    marginTop: '50px',
  },
  video: {
    display: 'inline-block',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '40px',
  },
  container2: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
});

function Card2() {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant='h4'
        style={{ color: '#000' }}
        component='p'
        className={classes.title}
      >
        Be Our Impact Partner
      </Typography>
      <div className={classes.container}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image='https://images.unsplash.com/photo-1554232456-8727aae0cfa4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
              title='Contemplative Reptile'
            />
            <CardContent>
              <Typography gutterBottom variant='h6' component='h2'>
              Companies
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
              Identify the right cause to support
Donate, or become a partner
Employees can volunteer
Giving back to the society
Collaborate with Change agents
Full transparency and traceability
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image='https://images.unsplash.com/photo-1461532257246-777de18cd58b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80'
              title='Contemplative Reptile'
            />
            <CardContent>
              <Typography gutterBottom variant='h6' component='h2'>
               
Volunteers
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
              Create a detailed profile
Collaborate with causes
Volunteering hours tracking
Activities at your convenience
Acknowledgement of participation
Recognition and Rewards
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image='https://images.unsplash.com/photo-1622027508445-d41a7bdf20ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
              title='Contemplative Reptile'
            />
            <CardContent>
              <Typography gutterBottom variant='h6' component='h2'>
              Non Profits
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
              Interact with mentors
Conduct learning sessions
Frequent information updates
Reach out to volunteers
Garner financial backing
Collaborate with other stakeholders
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
     
    
      
      <img style={{marginTop: '40px'}}src={Work}></img>
      <div id='precaution' className={classes.precaution}>
        <Typography
          variant='h4'
          style={{ color: '#000' }}
          component='p'
          className={classes.title}
        >
          How you can volunteer virtually
        </Typography>
        <ReactPlayer
          className={classes.video}
          url='https://www.youtube.com/watch?v=tirp8Hpv5oA'
        />
        <ReactPlayer
          className={classes.video}
          url='https://www.youtube.com/watch?v=PCVA1tkxC0k'
        />
      </div>
    </>
  );
}

export default Card2;
