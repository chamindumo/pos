import logo from './logo.svg';
import './App.css';
import Admin from './Components/Admin.js';
import Login from './Components/Login';
import ForgotPassword from './Components/Forgot_password';
import User from './Components/user.js';
import SignUp from './Components/SignUp.js';
import Additems from './Components/additems.js';
import AddStocks from './Components/addstocks.js';
import CheckStocks from './Components/checkstocks.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>

      <Routes>

        <Route path="/Admin" element={<Admin />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} /> 
        <Route path="/User" element={<User/>}/>
        <Route path="/Addnewuser" element={<SignUp/>}/>
        <Route path='/Additems' element={<Additems/>}/>
        <Route path='/AddStocks' element={<AddStocks/>}/>        
        <Route path='/CheckStocks' element={<CheckStocks/>}/>
      </Routes>
    </Router>
  );
}

export default App;
