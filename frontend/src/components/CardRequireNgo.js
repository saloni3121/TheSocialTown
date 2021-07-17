import React, { useState, useEffect } from 'react';

import '../styles/cardrequire.css';

function Card(props) {
  
  console.log(props);
  return (
    <div className='card1'style={{width: '40%'}} >
      <div className='container'>
        <h4>
          <b>{props.name}</b>
        </h4>
        <p><b>Description :</b>{props.des}</p>
        <p><b>Number of hours to be dedicated : </b>{props.hours}</p>
        <p><b>Number of Openings :</b> {props.vol}</p>
        <p><b>Number of Volunteers Applied :</b> {props.applied}</p>
      </div>
      <button
        className='btn right'
        onClick={(evt) =>
          props.handleClick(evt, props.postId, props.volunteerId, props.hours)
        }
      >
        {props.isApplied ? 'Withdraw' : 'Apply Now'}
      </button>
    </div>
  );
}

export default Card;
