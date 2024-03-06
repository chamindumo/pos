import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage.js';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>

      <Routes>

        <Route path="/home" element={<HomePage />} />
  

      </Routes>
    </Router>
  );
}

export default App;
