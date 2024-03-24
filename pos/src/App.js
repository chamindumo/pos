import logo from './logo.svg';
import './App.css';
import Admin from './Components/Admin.js';
import Login from './Components/Login';
import ForgotPassword from './Components/Forgot_password';
import Addnewuser from './Components/Addnewuser.js';
<<<<<<< HEAD
import User from './Components/user/user.js';
=======
import SignUp from './Components/SignUp.js';
>>>>>>> 235b02b1f7b37b091518ef98b6ad786b72e21e94

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>

      <Routes>

        <Route path="/Admin" element={<Admin />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
<<<<<<< HEAD
        <Route path="/Addnewuser" element={<Addnewuser/>}/>  
        <Route path="/User" element={<User/>}/>
=======
        <Route path="/Addnewuser" element={<SignUp/>}/>  

>>>>>>> 235b02b1f7b37b091518ef98b6ad786b72e21e94

      </Routes>
    </Router>
  );
}

export default App;
