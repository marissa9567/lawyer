import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Assuming you have a Home component in the pages directory
import Navbar from "./components/Navbar";
import Ourresults from './pages/Ourresults';
import Footer from './components/Footer';
import "./styles/App.css";
import Ourlawyers from "./pages/Ourlawyers";
import Question from './components/Question';
import ImageSlider from './components/Imageslider';
import Header1 from "./components/Header1";
import Card from "./pages/Card";
import Successstories from './pages/Successstories';
import SlidingImages from './pages/SlidingImages';
import Contactus from "./pages/Contactus";

function App() {
  return (


    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourresults" element={<Ourresults/>}/>
        <Route path="/ourlawyers" element={<Ourlawyers/>}/>
        <Route path="/contactus" element={<Contactus />} />
      </Routes>

      <div className="App">
    
      <header className="App-header">   </header>
      <main className="App-main"></main>
      <footer className="App-footer"></footer>
   
    </div>


    
   
    </Router>
  );
}

export default App;
