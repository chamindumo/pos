import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Zero Corder</p>
      <div style={socialMediaStyle}>
        
        {/* Add more social media icons as needed */}
      </div>
    </footer>
    
  );
};

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px',
 // position: 'fixed',
  bottom: '0',
  width: '100%',
  height:'45px',
};
const socialMediaStyle = {
  marginTop: '10px',
};
export default Footer;