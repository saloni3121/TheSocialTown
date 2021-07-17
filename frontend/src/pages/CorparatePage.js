import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import faker from 'faker';
import Sidebar from '../components/SideBar';
import Card from '../components/Card';
import '../styles/corporate.css';
import Volunter from './VolunteerRegister';

function Corporate() {
  const { id } = useParams();


  const [isopen,setOpen]=useState(false);
  const [allVolunteers, setAllVolunteers] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [finalPoints, setFinalPoints] = useState([]);
  const togglePop=()=>{
    setOpen(!isopen);
  }

  function getArraySum(a){
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
}


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/enrolled-volunteers/${id}`
        );
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        const profileInfo = res.data;
        const allVolunteers = response.data;
        console.log(res.data);
        setProfileInfo(profileInfo);
        setAllVolunteers(allVolunteers);
        const total = allVolunteers.map((vol)=>{
            return(vol.points)
        })
        setFinalPoints (getArraySum(total));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  

  return (
    <div className='row'>
      <div className='col s12 m4 l2'>
        <Sidebar
          avatar={faker.image.avatar()}
          name={profileInfo.name}
          email={profileInfo.email}
          phone={profileInfo.phone}
          web={profileInfo.website}
          total={finalPoints}
        ></Sidebar>
      </div>
      <h3 className='conatiner'>Find your Employees:</h3>
      <div className="container">
          <div className="req">
        {allVolunteers.map((volunteer) => (
          <Card
            name={volunteer.name}
            imgSrc={faker.image.avatar()}
            emai={volunteer.email}
            area={volunteer.area}
            phn={volunteer.phone}
            points={volunteer.points}
          ></Card>
          
        ))}
        </div>
      </div>
      <div className='fixed-action-btn'>
        <a
          className='btn-floating btn-large red'
          onClick={togglePop}
        >
          <i className='large material-icons'>chat_bubble</i>
        </a>
      </div>
    </div>
  );
}

export default Corporate;
