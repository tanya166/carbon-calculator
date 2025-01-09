import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './About.css';
import one from '../assets/helpp.png';
import two from '../assets/we.png';
import three from '../assets/contact.png';
import four from '../assets/bot.png';
import support from '../assets/support.png';
import contact_us from '../assets/contact_us.png';
import one1 from '../assets/one1.png';
import two2 from '../assets/two2.png';
import me from '../assets/me.png';
import mee from '../assets/mee.png';
import Chat from './Chat'; // Import the Chat component

const About = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // State to manage chatbot visibility
  const [showAlert, setShowAlert] = useState(false); // State to manage showing alert
  const [email, setEmail] = useState(''); // State to manage email input
  const [message, setMessage] = useState(''); // State to manage message input

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/details');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const section = document.querySelector(`.${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const scrollToSection = (className) => {
    const section = document.querySelector(`.${className}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openChatMessage = () => {
    alert("Click on the chatbot icon on the bottom right of the screen!");
  }

  const handleChatBotClick = () => {
    setIsChatOpen(true); // Set isChatOpen to true to display the chatbot
    setShowAlert(true); // Set showAlert to true to display the alert
  }

  // Reset showAlert state after alert is displayed
  useEffect(() => {
    if (showAlert) {
      openChatMessage();
      setShowAlert(false); // Reset showAlert after displaying alert
    }
  }, [showAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/contact', { email, message });
      alert(response.data.msg);
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting support request:', error);
      alert('Failed to submit support request');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className='aboutt'>
        <div className='aboutus'>About us</div>
        <div className='circles'>
          <div className='deets'>
            <button onClick={() => scrollToSection('text-part')} className='c1' style={{ backgroundImage: `url(${two})` }}>
            </button>
            <div className='b-name'>How do we help?</div>
          </div>
          <div className='deets'>
            <button className='c2' onClick={() => scrollToSection('who')} style={{ backgroundImage: `url(${one})` }}>
            </button>
            <div className='b-name'>Who are we?</div>
          </div>
          <div className='deets'>
            <button className='c3' onClick={() => scrollToSection('c_us')} style={{ backgroundImage: `url(${three})` }}>
            </button>
            <div className='b-name'>Contact us</div>
          </div>
          <div className='deets'>
            <button className='c4' onClick={handleChatBotClick} style={{ backgroundImage: `url(${four})` }}>
            </button>
            <div className='b-name'>Chat bot</div>
          </div>
        </div>
      </div>
      <div className='how_We'>
        <div className='text-part'>
          <h2 className='ipsum'>How do we help?</h2>
          <div className='lorem'>
            {
              posts.filter(post => post.id === 1)
                .map((post) => (
                  <div key={post.id} className='z1'>
                    <p className='z1'>{post.text}</p>
                  </div>
                ))
            }
          </div>
        </div>
        <div className="container11">
          <div className="rectangle11"></div>
          <img src={one1} className="one1" alt="one1" />
          <img src={two2} className="two2" alt="two2" />
        </div>
      </div>
      <div className='who' style={{ backgroundImage: `url(${me})` }}>
        <div className='italic'>About me</div>
        <div className='meee'>
          <img src={mee} className='pic_me' alt="mee" />
          <div className='us_desc'>
            {
              posts.filter(post => post.id === 2)
                .map((post) => (
                  <div key={post.id} className='z1'>
                    <p className='z1'>{post.text}</p>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
      <div className='c_us' style={{ backgroundImage: `url(${contact_us})` }}>
        <div className='are-a'>
          <div className='Contact-text'>
            <h1 className='us'>Contact us</h1>
            <div className='text7'>
              <div className='email'> E-mail :</div>
              <div className='giv-email'> <input type='text' className='contact-input1' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className='contact-1'>
                Want to reach out to us?
              </div>
              <div className='write-ur-problme'>
                (Write your problem to us)
              </div>
              <input type='text' className='contact-input' value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type='submit' className='submit-1' onClick={handleSubmit}>Submit</button>
          </div>
          <img src={support} className='support' alt="support" />
        </div>
      </div>
      {isChatOpen && <Chat />}
    </>
  );
};

export default About;

