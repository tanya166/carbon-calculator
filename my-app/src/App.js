import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Offsetting from './components/Offsetting'; 
import Signup from './components/Signup'; 
import 'font-awesome/css/font-awesome.min.css';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className='bodyy'>
        <Navbar />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/offsetting" element={<Offsetting/>} />
          <Route path="/" element={<Home/>} /> 
          <Route path="/hel" element={<Home/>} />
         
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/About" element={<About/>}/>   
        </Routes> 
        <Footer />
      
      </div>
    </Router>
  );
}

export default App;

