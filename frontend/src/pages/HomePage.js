import React,{useState} from 'react';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js';
import Card1 from '../components/Card1.js';
import Card2 from '../components/Card2';
import Messenger from '../components/Messenger'
function Home(props) {
  const [isopen,setOpen]=useState(false);
  const togglePop=()=>{
    setOpen(!isopen);
  }
  return (
    <div>
      <Navbar loggedIn={false} />
      <Card1 />
      <Card2 />
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
      <Footer />
    </div>
  );
}

export default Home;
