import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="containers">
        <div className="rowz">
          <div className="col-md-4">
            <h4 className="footer1">About Us</h4>
            <p className='footer-p'>Empowering individuals to calculate and mitigate their carbon footprint, promoting environmental stewardship one calculation at a time..</p>
          </div>
          <div className="col-md-4">
            <h4 className="footer2">Quick Links</h4>
            <ul className="list-name">
              <li className='list-1'><a href="/">Home</a></li>
              <li className='list-1'><a href="About">About</a></li>
         
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="footer2">Follow Us</h4>
            <ul className="list-name">
              <li className='list-1'>
                <a href="https://www.linkedin.com/in/tanya-bhardwaj-9a2449244/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin" aria-hidden="true" /> LinkedIn
                </a>
              </li>
              <li className='list-1'>
                <a href="https://www.instagram.com/yourprofile/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram" aria-hidden="true" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="rowz">
          <div className="col-md-12">
            <p className="copyright">Copyright &copy; 2023 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

