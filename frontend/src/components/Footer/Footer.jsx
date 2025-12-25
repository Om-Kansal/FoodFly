import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo' src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum impedit quibusdam quas molestias incidunt corrupti unde alias iusto magni esse dolore ut obcaecati neque, tenetur molestiae nemo quasi ducimus odio.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 85236974</li>
                    <li>contact@foodfly.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">copyright 2025 &copy; foodfly.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer