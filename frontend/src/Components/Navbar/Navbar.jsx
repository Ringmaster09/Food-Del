import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='navbar'>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
       
      <ul className="navbar-menu">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="#menu">Menu</a>
        </li>
        <li>
          <a href="#mobile-app">Mobile App</a>
        </li>
        <li>
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
       
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
         
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Basket" />
          <div className="dot"></div>
        </Link>
         
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;