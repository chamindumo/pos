// NavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    const handleLogoClick = () => {
        // Handle the click event here (e.g., navigate to another page, toggle a menu, etc.)
        setIsSidePanelOpen(!isSidePanelOpen);
    };
    const navStyle = {
        background: '#2B7BA8',
        padding: '10px',
        display: 'flex',
        justifyContent: 'flex-start', // Align items to the right
        width: '100%', // Make the navigation bar fit the page
        
      };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 50px',
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
    {/* Thick line with background color behind the icon image */}
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: '#000',
        zIndex: 0,
      }}
    />

    {/* Render the side panel based on the state */}
    {isSidePanelOpen && (
      <div style={{ width: '200px', height: '100vh', background: '#f0f0f0', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        {/* Add content for the side panel */}
        <p>Side Panel Content</p>
      </div>
    )}

    {/* Make the image clickable with an anchor tag */}
    <a
      href="#"
      onClick={handleLogoClick}
      style={{
        marginLeft: isSidePanelOpen ? '200px' : 0,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#2B7BA8', // Background color behind the icon
        width: '100%', // Set the width of the icon container
        height:'35px',
      }}
    >
      <img src="./Icon/icons8-menu-30.png" alt="Logo" style={{ marginRight: 'auto' }} />
    </a>

    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {/* Your list items go here */}
    </ul>
  </div>

  );
};

export default NavBar;