import React from 'react';
import { Link } from 'react-router-dom';
import MenuItems from "./MenuItems";
import { menu_items } from "../../menu_items";
import logoo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <div className="nav">
        <div className="logo_main">
          <Link to="/">
            <img src={logoo} alt="Logo" />
          </Link>
        </div>
        
        <div className="nav-content">
          <ul className="menus">
            {menu_items.map((menu, index) => {
              const depthLevel = 0;
              return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
            })}
          </ul>
          
          <div className="login-container">
            <Link to="/login" className="login">
              Login/Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

