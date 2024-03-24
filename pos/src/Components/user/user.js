import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom"
import Usercss from './user.css'

// Initialize Firebase (make sure you replace the config with your own Firebase project config)
const firebaseConfig = {
    apiKey: "AIzaSyDEZFiBz7qdsjEY8TVIFia-eTj7-tTRLHs",
    authDomain: "pos-system-74091.firebaseapp.com",
    databaseURL: "https://pos-system-74091-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pos-system-74091",
    storageBucket: "pos-system-74091.appspot.com",
    messagingSenderId: "947884349220",
    appId: "1:947884349220:web:3a38f5908fb5cc8cca05b1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const User = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    // Fetch all items from Firestore
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, 'table'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllItems(items);
    };
    fetchItems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddToList = () => {
    if (selectedItem) {
      setItemList([...itemList, selectedItem]);
      setSelectedItem('');
    }
  };

  return (
    <div>
      <h2></h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* All Items */}
      <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Size</th>
              <th>Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item) => (
              <tr key={item.id} onClick={() => handleItemClick(item)}>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>


      {/* Add to List */}
      <button onClick={handleAddToList}>Add to List</button>

      {/* Display Item List */}
      <div>
        <h3>Item List</h3>
        <ul>
          {itemList.map((item, index) => (
            <li key={index}>{item.name} - {item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;