import React from 'react'
import './Footer.css'
import assets from '../../assets/assets'; // Adjust path if needed

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=''/>
                <p>Tomato brings fresh, delicious meals straight to your door. From local favorites to gourmet cuisines, we connect you with the best restaurants in your area. Fast delivery, easy ordering, and exceptional taste – that's our promise. Download Tomato today and discover your next favorite meal!</p>
           <div className='footer-social-icons'>
             <img src={assets.facebook_icon} alt=""/>
             <img src={assets.twitter_icon}alt=""/>
             <img src={assets.linkedin_icon} alt=""/>

           </div>
            </div>
<div className='footer-content-centre'>
    <h2>COMPANY</h2>
    <ul>
        <li>Home</li>
          <li>About Us</li> 
          <li>Delivery</li>   
          <li>Privacy Policy</li>     
                   </ul>

</div>
            <div className='footer-content-right'>
             <h2>GET IN TOUCH</h2>
          <ul>
            <li>7668664586</li>
            <li>contact at priyanhchaudhary1@gmail.com</li>
          </ul>
        
            </div>

        </div>
        <hr/>
        <p className='footer-copyright'>copyright 2025 @tomato.com All Right Reserved</p>
    </div>
  )
}

export default Footer