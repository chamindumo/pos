import logo from './logo.svg';
import './App.css';
import Admin from './Components/Admin.js';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>

      <Routes>

        <Route path="/Admin" element={<Admin />} />
  

      </Routes>
    </Router>
  );
}

export default App;
