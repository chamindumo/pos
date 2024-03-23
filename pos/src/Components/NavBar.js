// NavBar.js
import React, { useState } from 'react';
import Admin from './Admin.css';
//import './Table.ccs';
import img_Dashboard from './img_dashbord.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [showTable, setShowTable] = useState(false); // State to toggle table visibility
    const [tableData, setTableData] = useState([]); // State to store table data


    const handleLogoClick = () => {
        // Handle the click event here (e.g., navigate to another page, toggle a menu, etc.)
        setIsSidePanelOpen(!isSidePanelOpen);
    };
    const handleclick = () => {
  console.log('Button clicked!');
  const data = [
    { id: 1, name: 'Alice', age: 40},
    { id: 2, name: 'Bob', age: 38 },
    { id: 3, name: 'Charlie', age: 40 },
  ];
  setTableData(data); // Set table data
  setShowTable(true); // Show the table
};
const hideTable = () => {
setShowTable(false); // Hide the table
};

  function MyTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {/* Check if data is defined before mapping over it */}
        {data && data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

    const navStyle = {
        background: '#91bfee',
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
      <div style={{ width: '200px', height: '100vh', background: '#91bfee', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <div className='Sidebar'>
          
        <button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  DASHBOARD
</button>
          
<button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  ITEMS
</button>
<button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  PROMOTIONS
</button>
<button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  ADD USER
</button>
<button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  STOCK
</button>
<button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  BANKS
</button>
<button
          className={Admin.Btn_side}
          onClick={handleclick}
          style={{
          backgroundColor: '#4297eb',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          margin: '4px 2px',
          cursor: 'pointer'
    }}
>
  DISCOUNT
</button>

        </div>
        
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
        backgroundColor: '#91bfee', // Background color behind the icon
        width: '100%', // Set the width of the icon container
        height:'35px',
      }}
    >
      <img src="./Icon/icons8-menu-30.png" alt="Logo" style={{ marginRight: 'auto' }} />
    </a>
   {/* Conditionally render the table */}
   {showTable && (
        <div style={{ marginLeft: '220px' }}>
          <button onClick={hideTable}>Hide Table</button>
          <MyTable data={tableData} />
        </div>
      )}

    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {/* Your list items go here */}
    </ul>
  </div>

  );
};

export default NavBar;