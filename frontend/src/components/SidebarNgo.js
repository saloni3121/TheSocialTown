import React, { useState, useEffect, useLayoutEffect } from 'react';
import '../styles/sidebar.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import faker from 'faker';
import $ from 'jquery';
import M from 'materialize-css/dist/js/materialize.min.js';
const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const [isActive, setActive] = useState(false);
  const [area, setArea]= useState(props.area)

  const toggleClass = () => {
    setActive(!isActive);
  };

  console.log(props);
  function openNav() {
    setOpen(!open);
  }

  return (
    <div onClick={openNav} >
      <div className=' sidebar'>
        <button
          className='sidenav-trigger full hide-on-large-only '
          onClick={openNav}
        >
          <i className='material-icons'>menu</i>
        </button>
        <ul
          id='slide-out'
          className='center-align sidenav sidenav-fixed'
          styles={{
            transform: open ? 'translateX(0%)' : 'translateX(-105%)',
          }}
        >
          <li>
            <div className='user-view center-align'>
              <span>
                <img
                  src={props.avatar}
                  className='avatar circle responsive-img '
                />
              </span>
              <h2 className='black-text name'>{props.name}</h2>
              {/* <span className='black-text email'>{props.email}</span> */}
              {/* <span className='black-text email'>{props.org}</span> */}
            </div>
          </li>

          
          <li>
            <div className='divider' />
          </li>
          <li style={{marginTop: '10px'}}>
            <h6><b>Email ID</b></h6>
          <h6 className='black-text email'>{props.email}</h6>
          </li>
          <li style={{marginTop: '50px'}}>
            <h6><b>Website Link</b></h6>
          <h6 className='black-text email'>{props.web}</h6>
          </li>
          <li style={{marginTop: '50px'}}>
            <h6><b>Contact Number </b></h6>
          <h6 className='black-text email'>{props.phone}</h6>
          </li>
          {/* <ol>
            {area.map((domain)=>{
              <li>{domain}</li>
            })}
            
          </ol> */}
          {/* <li>
            <a href='#!' className='black-text'></a>
            {faker.name.jobType}
          </li> */}
          {/* <p className='waves-effect black-text wrap-content'>
            {`${faker.name.jobDescriptor()}`}
            <a href='tel'>{`${faker.phone.phoneNumber()}`}</a>
          </p> */}
          <Link to={'/login'} style={{textDecoration: 'none'}}>
          <Button  
              style={{backgroundColor: '#22577A', color: '#FFFFFF', marginTop: '100px', width: '50%'}} 
              variant="contained"
            > 
              Logout
            </Button>
          </Link>
        </ul>
        {/* <button className='btn'>Logout</button> */}
      </div>
    </div>
  );
};

export default Sidebar;
