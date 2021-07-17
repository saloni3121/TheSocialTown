import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import faker from 'faker';
import SidebarNgo from '../components/SidebarNgo';
import CardRequireNgo from '../components/CardRequireNgo';
import PostCard from '../components/PostCard';
import '../styles/ngo.css';
import '../styles/corporate.css';
import Messenger from '../components/Messenger'
function NgoPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [allPosts, setAllPosts] = useState([]);
  const [ngoPosts, setNgoPosts] = useState([]);
  const [error,setError] = useState('')
  const [profileInfo, setProfileInfo] = useState([]);
  const [isopen,setOpen]=useState(false);
  const togglePop=()=>{
    setOpen(!isopen);
  }
  useEffect(() => {
    async function fetchData() {
      // evt.preventDefault();
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${id}`);
        const profileInfo = res.data;
        setProfileInfo(profileInfo);
        const response = await axios.get(`http://localhost:5000/api/all-posts`);
        const allPosts = response.data;
        console.log(res.data);
        setAllPosts(allPosts);
        const ngoPosts = allPosts.filter((post) => post.createdBy === id);
        setNgoPosts(ngoPosts);
      } catch (error) {
        if (error.response) {
          if (error.response.data.type === 'Unauthorized') {
            navigate('/login');
          } else setError(error.response.data.message);
        } else setError('An Error Occured');
      }
    }
    fetchData();
  }, []);

  return (
    <div className='row'>
      <div className='col s9 m4 l2'>
        <SidebarNgo
          avatar={faker.image.nature()}
          name={profileInfo.name}
          email={profileInfo.email}
          phone={profileInfo.phone}
          web={profileInfo.website}
          area={profileInfo.areaOfInterest}
        ></SidebarNgo>
      </div>

      {/* <div className="mainData">
                
                <Card></Card>
                
                <div>
                <div class="row">
                    <div class="col">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                        <span class="card-title">Card Title</span>
                        <p>I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
          </div> */}

      <div className='col s10 m4 l10 ' style={{marginLeft: '-80px'}}>
        <h3 className='col s12 m4 l10' style={{marginLeft: '-40px',marginBottom: '20px'}}>Recent Requirements : </h3>
        <div className='post right'>
          <PostCard></PostCard>
        </div>
          
        {ngoPosts.map((post) => (
          <CardRequireNgo
            name={post.title}
            des={post.description}
            hrs={post.noOfHours}
            vol={post.opening}
            applied={post.appliedVolunteers.length}
            access='close'
          ></CardRequireNgo>
        ))}
        {/* <CardRequire name={faker.name.firstName()}  des={faker.name.jobDescriptor()} access="close"></CardRequire>
            <CardRequire name={faker.name.firstName()}  des={faker.name.jobDescriptor()} access="close"></CardRequire>
            <CardRequire name={faker.name.firstName()}  des={faker.name.jobDescriptor()} access="close"></CardRequire>
            <CardRequire name={faker.name.firstName()}  des={faker.name.jobDescriptor()} access="close"></CardRequire> */}

        {/* {what you have do here is get the card data thw requirements they have posted }  */}
      
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
    </div>
  );
}

export default NgoPage;
