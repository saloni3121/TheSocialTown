import React, { useState, useEffect } from 'react';
import axios from 'axios';
import faker from 'faker';
import '../styles/admin.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DenseAppBar from '../components/AppBar';
import { Typography } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


function AdminPage() {

  const classes = useStyles();

  const [allUsers, setAllUsers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [enrolledVolunteers,setEnrolledVolunteers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/all-users`);
        const allUsers = response.data;
        console.log(response.data);
        setAllUsers(allUsers);
        setNgos(allUsers.filter((user) => user.role === 'NGO'));
        setCorporates(allUsers.filter((user) => user.role === 'Corporate'));
        setVolunteers(allUsers.filter((user) => user.role === 'Volunteer'));
        // // const res = await axios.get(
        // //   `http://localhost:5000/api/all-enrolled-volunteers`
        // );
        // console.log(res.data)
        // setEnrolledVolunteers(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
    <DenseAppBar/>
    <div>
      <div className='dataSet' style={{width: '80%',marginLeft: '155px'}}>
        <div className='center-align'>
          <h6>Total no. of volunteers</h6>
          <h2>{volunteers.length}</h2>
        </div>
        <div className='center-align'>
          <h6>Number of NGO's benefited</h6>
          <h2>{ngos.length}</h2>
        </div>
        <div className='center-align'>
          <h6>Number of corporates enrolled</h6>
          <h2>{corporates.length}</h2>
        </div>
      </div>
      <div className='dataSet'>
        <div className=' center-align'>
        <Typography variant="h4" color="inherit" style={{ marginTop: '20px',marginBottom: '20px'}}>
            Top Performers
          </Typography>
          <TableContainer component={Paper} style={{marginBottom: '50px'}}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact Number</StyledTableCell>
            <StyledTableCell align="center">Good Points</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {volunteers
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((option, index) => (
                <>
                  <StyledTableRow key={option.name}>
              <StyledTableCell align="center">{option.name}</StyledTableCell>
              <StyledTableCell align="center">{option.email}</StyledTableCell>
              <StyledTableCell align="center">{option.phone}</StyledTableCell>
              <StyledTableCell align="center">{option.points}</StyledTableCell>
            </StyledTableRow>
                </>
              ))}
              </TableBody>
      </Table>
    </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminPage;
