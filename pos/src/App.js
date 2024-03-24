import logo from './logo.svg';
import './App.css';
import Admin from './Components/Admin.js';
import Login from './Components/Login';
import ForgotPassword from './Components/Forgot_password';
import Addnewuser from './Components/Addnewuser.js';
import User from './Components/user/user.js';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>

      <Routes>

        <Route path="/Admin" element={<Admin />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/Addnewuser" element={<Addnewuser/>}/>  
        <Route path="/User" element={<User/>}/>

      </Routes>
    </Router>
  );
}

export default App;
