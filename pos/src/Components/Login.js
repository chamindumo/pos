import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom"

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

const fetchDataFromFirebase = async () => {
  const data = await getDocs(collection(db, 'user'));
  return data.docs.map(doc => doc.data());
};

const decrypt = (ciphertext, key) => {
  let plaintext = '';
  for (let i = 0; i < ciphertext.length; i++) {
    const charCode = ciphertext.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    plaintext += String.fromCharCode(charCode);
  }
  return plaintext;
};

const FirebaseDataComponent = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromFirebase();
      setFirebaseData(data);
    };

    fetchData();
  }, []);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const user = firebaseData.find(user => user.username === username);
    if (user) {
      const decryptedPassword = decrypt(user.password, user.username);
      if (decryptedPassword === password) {
        // Login successful
        setError('');
        navigate('/Admin');
        return;
      }
    }
    // Login failed
    setError('Invalid username or password');
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <div>
        <input type="text" value={username} onChange={handleUsernameChange} placeholder='UserName'/>
      </div>
      <div>
        <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password'/>
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <div>{error}</div>}
    </div>
  );
};
export default FirebaseDataComponent;
