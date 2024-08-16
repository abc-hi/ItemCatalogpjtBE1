import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import navProfile from '../../assets/nav-Profile.png'

const Navbar = () => {
    return (
        <div className='Navbar'>
            <img src={logo} alt="" className="logo" />
            <img src={navProfile} alt="" className="nav-Profile" />
            
        </div>
    );
};

export default Navbar;