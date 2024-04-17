import React, { useState } from "react";
import Profile from '../Components/Assests/profile.png';
import HomeIcon from '../Components/Assests/home.png';
import ItemIcon from '../Components/Assests/item.png';
import PromotionIcon from '../Components/Assests/promotion.png';
import AddUserIcon from '../Components/Assests/adduser.png';
import StockIcon from '../Components/Assests/stock.png';
import BankIcon from '../Components/Assests/bank.png';
import DiscountIcon from '../Components/Assests/discount.png';

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
                            <p>Udayana Sajani</p>
                            <button className='sidebar-button' onClick=''>LOG OUT</button>
                        </div>
                    )}
                </div>


            </div>
            <div className="sidebar">
                <button className='sidebar-button' onClick=''>
                    <img src={HomeIcon} alt="Home" className="sidebar-icon" />
                        DASHBOARD
                </button>
                <button className='sidebar-button' onClick=''>
                    <img src={ItemIcon} alt="Item" className="sidebar-icon" />
                        ALLITEMS
                </button>
                <button className='sidebar-button' onClick=''>
                    <img src={PromotionIcon} alt="Item" className="sidebar-icon" />
                        PROMOTON
                </button>
                <button className='sidebar-button' onClick=''>
                    <img src={AddUserIcon} alt="Item" className="sidebar-icon" />
                        ADDUSER
                </button>
                <button className='sidebar-button' onClick=''>
                    <img src={StockIcon} alt="Item" className="sidebar-icon" />
                        STOCK
                </button>
                <button className='sidebar-button' onClick=''>
                    <img src={BankIcon} alt="Item" className="sidebar-icon" />
                        BANKS
                </button>
                <button className='sidebar-button' onClick=''>
                    <img src={DiscountIcon} alt="Item" className="sidebar-icon" />
                        DISCOUNT
                </button>
            </div>
        </nav>

    );
};

export default Header;
