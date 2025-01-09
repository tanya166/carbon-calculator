import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import homee from '../assets/home.png';
import train from '../assets/train.png';
import flight from '../assets/flight.png';
import car from '../assets/car.png';
import bus from '../assets/bike.png';
import Form from './Form';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img7 from '../assets/img7.png';
import img8 from '../assets/img8.png';
import img9 from '../assets/img9.png';
import img10 from '../assets/img10.png';
import Chat from './Chat';

const Home = () => {
  const [activeForm, setActiveForm] = useState('form1');
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const [selectedTransport, setSelectedTransport] = useState(null); 
  const handleImageClick = (form) => {
    if (form !== activeForm) {
      setAnimate(true);
      setTimeout(() => {
        setActiveForm(form);
        setAnimate(false);
      }, 500);
    }
  }

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const section = document.querySelector(`.${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const handleTransportClick = (transport) => {
    setSelectedTransport(transport);
  };

  return (
    <>
      <div className="first_part">
        <div className="content">
          <div className='row1'>
            <div className='card-1'>
              <div className='card1'>
                <div className='front'><img src={img2} className='flip-img1' alt="card1 front" /></div>
                <div className='back'>
                  <div className='back-text'style={{ backgroundImage: `url(${img8})` }}></div>
                  </div>
              </div>
            </div>
            <div className='card-2'>
              <div className='card2'>
                <div className='front'><img src={img3} className='flip-img2' alt="card2 front" /></div>
                <div className='back'><div className='back-text2' style={{ backgroundImage: `url(${img7})` }}></div></div>
              </div>
            </div>
          </div>
          <div className='row2'>
            <div className='card-4'>
              <div className='card4'>
                <div className='front'><img src={img5} className='flip-img4' alt="card4 front" /></div>
                <div className='back'><div className='back-text3' style={{ backgroundImage: `url(${img9})` }}></div></div>
              </div>
            </div>
            <div className='card-5'>
              <div className='card5'>
                <div className='front'><img src={img4} className='flip-img5' alt="card5 front" /></div>
                <div className='back'><div className='back-text4' style={{ backgroundImage: `url(${img10})` }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="middle_part">
        <div className="h">Calculate your Carbon Footprint</div>
        <div className="h2">
          Use our interactive calculator to learn your carbon footprint and actions to take to reduce it
        </div>
        <div className="h3">
           Carbon footprint calculations are typically based on annual emissions from the previous 12 months.
        </div>
        <div className="h3_modes">
          Choose your mode:
        </div>
        <div className="modes">
          <div className="app">
            <div className="image-container">
              {/* <img src={homee} className='pic' alt="home" onClick={() => handleImageClick('Form')} /> */}
              <img src={homee} className={`pic ${selectedTransport === 'Form' ? 'selected' : ''}`} alt="home" onClick={() => { handleImageClick('Form'); handleTransportClick('Form'); }} />
              <img src={flight} className={`pic ${selectedTransport === 'Form2' ? 'selected' : ''}`} alt="flight" onClick={() => { handleImageClick('Form2'); handleTransportClick('Form2'); }} />
              <img src={car} className={`pic ${selectedTransport === 'Form3' ? 'selected' : ''}`} alt="train" onClick={() => { handleImageClick('Form3'); handleTransportClick('Form3'); }} />
              <img src={bus} className={`pic ${selectedTransport === 'Form4' ? 'selected' : ''}`} alt="bus" onClick={() => { handleImageClick('Form4'); handleTransportClick('Form4'); }} />
              <img src={train} className={`pic ${selectedTransport === 'Form5' ? 'selected' : ''}`} alt="car" onClick={() => { handleImageClick('Form5'); handleTransportClick('Form5'); }} />
            </div>
            <div className={`form-container ${animate ? 'slide' : ''}`}>
              {activeForm === 'Form' && (
                <div className="form">
                  <Form />
                </div>
              )}
              {activeForm === 'Form2' && (
                <div className="form">
                  <Form2 />
                </div>
              )}
              {activeForm === 'Form3' && (
                <div className="form">
                  <Form3 />
                </div>
              )}
              {activeForm === 'Form4' && (
                <div className="form">
                  <Form4 />
                </div>
              )}
              {activeForm === 'Form5' && (
                <div className="form">
                  <Form5 />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div><Chat/></div>
    </>
  );
};

export default Home;
