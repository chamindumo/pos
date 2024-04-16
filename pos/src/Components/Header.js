import React, { useState } from "react";
import Profile from '../Components/Assests/profile.png';

import './Header.css';

const Header = () => {
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const toggleProfilePopup = () => {
        setShowProfilePopup(!showProfilePopup);
    };

    return (
        <nav>
            <div>
                <div className="header">

                    {/* Add your image button here */}
                    <img src={Profile} alt="Profile" className="profile-image-button" onClick={toggleProfilePopup} />
                    {showProfilePopup && (
                        <div className="profile-popup">
                            {/* Your profile content goes here */}
                            <p>udayana</p>
                            <p>user</p>
                            <button className='sidebar-button' onClick=''>LOG OUT</button>
                        </div>
                    )}
                </div>


            </div>
            <div className="sidebar">
                <button className='sidebar-button' onClick=''>DASHBOARD</button>
                <button className='sidebar-button' onClick=''>ITEMS</button>
                <button className='sidebar-button' onClick=''>PROMOTON</button>
                <button className='sidebar-button' onClick=''>ADD USER</button>
                <button className='sidebar-button' onClick=''>STOCK</button>
                <button className='sidebar-button' onClick=''>BANKS</button>
                <button className='sidebar-button' onClick=''>DISCOUNT</button>
            </div>
        </nav>

    );
};

export default Header;
