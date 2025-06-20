import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { token, setToken } = useContext(StoreContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setDropdownVisible(false);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
      
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />

        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className="dot"></div>

          {!token ? (
            <button className='button' onClick={() => setShowLogin(true)}>sign in</button>
          ) : (
            <div
              className='navbar-profile'
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <img src={assets.profile_icon} alt="Profile" />

              {dropdownVisible && (
                <ul className="nav-profile-dropdown">
                  <li><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
                  <hr />
                  <li onClick={handleLogout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
