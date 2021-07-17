import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import faker from 'faker';
import SidebarVol from '../components/SidebarVol';
import CardRequire from '../components/CardRequire';
import '../styles/corporate.css';
import Messenger from '../components/Messenger'
import '../styles/vol.css'
function VolunteerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [matchPosts, setMatchPosts] = useState([]);
  const [volunteerInfo, setVolunteerInfo] = useState([]);
  const [isopen,setOpen]=useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState('');
  const togglePop=()=>{
    setOpen(!isopen);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/api/all-posts`);
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        const allPosts = response.data;
        const volunteerInfo = res.data;
        console.log(response.data);
        setVolunteerInfo(volunteerInfo);
        setAllPosts(allPosts);
        const interests = volunteerInfo.areaOfInterest;
        const matchPosts = allPosts.filter((post) => {
          return interests.includes(post.domain);
        });
        const updatedPosts = matchPosts.map((post) => {
          const appliedVolunteers = post.appliedVolunteers;
          const foundVolunteer = appliedVolunteers.find(
            (volunteerId) => volunteerId === id
          );
          if (foundVolunteer) return { ...post, isApplied: true };
          return { ...post, isApplied: false };
        });
        setMatchPosts(updatedPosts);
      } catch (error) {
        if (error.response) {
          if (error.response.data.type === 'Unauthorized') {
            navigate('/login');
          } else setError(error.response.data.message);
        } else setError('An Error Occured');
      }
    }
    //   const ngoPosts = allPosts.filter(post => post.createdBy === id);
    //   setNgoPosts(ngoPosts);
    //   console.log(ngoPosts)
    fetchData();
  }, [isClicked]);

  const handleClick = async (evt, postId, volunteerId, hours) => {
    try {
      evt.preventDefault();
      let points
      if(isClicked){
        points = hours * -10;
      }else{
        points = hours * 10
      }
      // window.location.reload(false);
      //   const response = await axios.post(`http://localhost:5000/api/user/${volunteerId}`, {volunteerId});
      await axios.put(`http://localhost:5000/api/update-volunteer/${id}`, {
        volunteerId,
        points,
      });
      await axios.put(`http://localhost:5000/api/update-post`, {
        postId,
        volunteerId,
      });
      setIsClicked(!isClicked);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='row'>
      <div className='col s12 m4 l2'>
        <SidebarVol
          avatar={faker.image.avatar()}
          name={volunteerInfo.name}
          email={volunteerInfo.email}
          phone={volunteerInfo.phone}
          points={volunteerInfo.points}
        ></SidebarVol>
      </div>
      <h3 className='center-align'>Requirements posted by NGO</h3>
      <div className='container'>
        <div className="req1">
        {matchPosts.map((post) => (
          <CardRequire
            key={post._id}
            name={post.title}
            des={post.description}
            hours={post.noOfHours}
            postId={post._id}
            vol={post.opening}
            volunteerId={volunteerInfo._id}
            applied={post.appliedVolunteers.length}
            handleClick={handleClick}
            isApplied={post.isApplied}
          />
        ))}
       </div>
      </div>
      {
        isopen && <Messenger></Messenger>
      }
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

export default VolunteerPage;
