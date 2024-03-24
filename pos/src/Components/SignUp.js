import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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
const database = getDatabase(app);

const encrypt = (plaintext, key) => {
  let ciphertext = '';
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    ciphertext += String.fromCharCode(charCode);
  }
  return ciphertext;
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    employeeid: '',
    mobile: '',
    nic: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const postUserDataToFirestore = async (formData) => {
    try {
      const encryptedPassword = encrypt(formData.password, formData.username); // Encrypt password using username as key
      const userData = { ...formData, password: encryptedPassword };
      const docRef = await addDoc(collection(db, 'user'), userData);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    postUserDataToFirestore(formData);
    setFormData({
      username: '',
      email: '',
      password: '',
      address: '',
      employeeid: '',
      mobile: '',
      nic: ''
    });
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Employee ID:</label>
          <input type="text" name="employeeid" value={formData.employeeid} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile:</label>
          <input type="tel" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div>
          <label>NIC:</label>
          <input type="text" name="nic" value={formData.nic} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
