import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component in the pages directory
import Navbar from "./components/Navbar";
import Ourresults from './pages/Ourresults';
import Footer from './components/Footer';
import "./styles/App.css";
import Ourlawyers from "./pages/Ourlawyers";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourresults" element={<Ourresults/>}/>
        <Route path="/ourlawyers" element={<Ourlawyers/>}/>
      </Routes>
      <div className='footer-app'>
       <Footer/>   
      </div>
    
    </Router>
  );
}

export default App;
