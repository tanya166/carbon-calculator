import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './offsetting.css';
import axios from 'axios';
import Image1 from '../assets/img1.png'; 
import Image7 from '../assets/pic-1.png'; 
import Image8 from '../assets/pic-2.png'; 
import BackgroundImage from '../assets/bgi.png'; 

const Offsetting = () => {
  const [showFaq1, setShowFaq1] = useState(false);
  const [showFaq2, setShowFaq2] = useState(false);
  const [showFaq3, setShowFaq3] = useState(false);
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/table2');
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

  const toggleFaq1 = () => setShowFaq1(!showFaq1);
  const toggleFaq2 = () => setShowFaq2(!showFaq2);
  const toggleFaq3 = () => setShowFaq3(!showFaq3);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const section = document.querySelector(`.${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="header" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className="headd">
          <h1 className="title">CARBON</h1>
          <h1 className="blank">OFFSETTING</h1>
        </div>
        <p className="subtitle">
        Offset for a greener tomorrow—start carbon offsetting today! Reduce your footprint, empower the planet, and pave the way to a sustainable future.
        </p>
      </div>
      <div className="content">
        <div className="section">
          <div className="hea">
            <h2 className="hea1">Join the green revolution — Start </h2>
            <h2 className="hea6">CARBON</h2>
            <h2 className="hea7">OFFSETTING</h2>
            <h2 className="hea1">today!</h2>
          </div>
          <div className="first_sec">
            <div className='firstparr'>
              <div className="first_text">
                <div className="offsett">
                  <div className="hor">
                    <div className='c-offset'>
                    <h2 className="hea2">CARBON</h2>
                    <h2 className="hea3">OFFSETTING</h2>
                  </div>
                  </div>
                </div>
                <div className="text5">
                  {
                    posts.filter(post => post.id === 1)
                      .map((post) => (
                        <div key={post.id} className='b1'>
                          <p className='b1'>{post.text_1}</p>
                        </div>
                      ))
                  }
                </div>
                <div className="boxed">
                  {
                    posts.filter(post => post.id === 1)
                      .map((post) => (
                        <div key={post.id} className='b1'>
                          <p className='b1'>{post.text_2}</p>
                        </div>
                      ))
                  }
                </div>
              </div>
              <img src={Image1} className="img1" alt="Negotiation" />
            </div>
            <div className='secondparr'>
              <div className="first_text">
                <div className="offsett">
                  <div className="hor">
                    <h2 className='hea4'>Why do we need</h2>
                    <div className='c-offset'>
                    <h2 className="hea8">CARBON</h2>
                    <h2 className="hea9">OFFSETTING</h2>
                    </div>
                    <h2 className='hea4'>?</h2>
                  </div>
                </div>
                <div className="text5">
                  {
                    posts.filter(post => post.id === 2)
                      .map((post) => (
                        <div key={post.id} className='b1'>
                          <p className='b1'>{post.text_1}</p>
                        </div>
                      ))
                  }
                </div>
                <div className="boxed">
                  {
                    posts.filter(post => post.id === 2)
                      .map((post) => (
                        <div key={post.id} className='b1'>
                          <p className='b1'>{post.text_2}</p>
                        </div>
                      ))
                  }
                </div>
              </div>
              <img src={Image8} className="img2" alt="Negotiation" />
            </div>
            <div className='thirdparr'>
              <div className="first_text">
                <div className="offsett">
                  <div className="hor">
                    <h2 className='hea5'>How do we</h2>
                    <h2 className="hea3">OFFSET</h2>
                    <h2 className='hea4'>?</h2>
                  </div>
                </div>
                <div className="text5">
                  {
                    posts.filter(post => post.id === 3)
                      .map((post) => (
                        <div key={post.id} className='b1'>
                          <p className='b1'>{post.text_1}</p>
                        </div>
                      ))
                  }
                </div>
                <div className="boxed">
                  {
                    posts.filter(post => post.id === 3)
                      .map((post) => (
                        <div key={post.id} className='b1'>
                          <p className='b1'>{post.text_1}</p>
                        </div>
                      ))
                  }
                </div>
              </div>
              <img src={Image7} className="img3" alt="Negotiation" />
            </div>
          </div>
        </div>
        <div className="section">
          <p className="call-to-action">
          To know more about it , you can send us your doubts at our email or use our chatbot !
          </p>
        </div>
        <div className="sectionn1">
          <h2 className='faqq'>FAQ's</h2>
          <div className="faq">
            <button className="faq-title" onClick={toggleFaq1}>
            Can individuals offset their carbon footprint?
      
              <span>{showFaq1 ? '▲' : '▼'}</span>
            </button>
            {showFaq1 && (
              <div className="faq-content">
                <p className="desc">
                Yes, many platforms and organizations allow individuals to calculate and offset their personal carbon footprint through certified projects.
                </p>
              </div>
            )}
          </div>
          <div className="faq">
            <button className="faq-title" onClick={toggleFaq2}>
            What are the benefits of carbon offsetting?
              <span>{showFaq2 ? '▲' : '▼'}</span>
            </button>
            {showFaq2 && (
              <div className="faq-content">
                <p className="desc">
                Carbon offsetting offers significant benefits by supporting projects that reduce greenhouse gas emissions, promoting sustainable practices, and fostering global climate action. It helps mitigate climate change impacts, supports renewable energy adoption, and encourages environmental stewardship on a global scale.
                </p>
              </div>
            )}
          </div>
          <div className="faq">
            <button className="faq-title" onClick={toggleFaq3}>
            What is the difference between carbon offsetting and carbon neutrality?
              <span>{showFaq3 ? '▲' : '▼'}</span>
            </button>
            {showFaq3 && (
              <div className="faq-content">
                <p className="desc">
               
Carbon offsetting involves compensating for carbon emissions by investing in projects that reduce emissions elsewhere. Carbon neutrality goes further by aiming to balance carbon emissions with an equivalent amount of carbon removal or offsets, striving for a net-zero carbon footprint.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offsetting;



