import React from 'react';
import '../styles/card.css';
const Card = (props) => {
  return (
    <div className='card'>
      <img className='avatar' style={{marginTop: '20px'}} src={props.imgSrc} alt='user'></img>
      <div className=''>
        <h4>
          <b className="name">{props.name}</b>
        </h4>
        <p><b>Email : </b>{props.emai}</p>
        <p><b>Contact : </b>{props.phn}</p>
        <p><b>Good Points : </b>{props.points}</p>
      </div>
      <a className='btn right'>
      
      </a>
    </div>
  );
};



export default Card;
