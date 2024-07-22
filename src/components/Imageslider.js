import React, { useState } from 'react';
import "../styles/Imageslider.css";
import Robert from "../images/Robert.jpg";

// Sample quotes array
const quotes = [
  {
    quote: "'NYLitigation handled my case with utmost professionalism and secured the best outcome for me'",
    author: "Robert Johnson",
    settlement: "Settlement Amount",
    image: Robert
  },
  {quote:"ff"}
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? quotes.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === quotes.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
  <div className='container'>
    <div className="slider">
      <div className='title'>
          <h1 style={{marginLeft:"30px"}}>Whats Our Clients Say</h1>
          <p style={{marginTop:"-15px", width:"400px"}}>Hear from those who have experienced the NYLitigation </p>
          <p style={{marginLeft:"150px"}}>difference.</p>
      </div>
    
      <button className="prev-button" onClick={goToPrevious}> <span className="prev-symbol">&lt;</span></button>
     
      <div className="quote-container">
        <div className="quote-text">{quotes[currentIndex].quote}</div>
        <div className="quote-details">
          <img src={quotes[currentIndex].image} alt={quotes[currentIndex].author} className='quote-image'/>
          <div className="quote-info">
            <p className="quote-author">{quotes[currentIndex].author}</p>
            <p className="quote-meta">{quotes[currentIndex].settlement}</p>
          </div>
        </div>
      </div>
   
      <button className="next-button" onClick={goToNext}>
        <span className="next-symbol">&gt;</span> {/* Unicode character for right-pointing triangle */}
      </button>
    </div>
    </div>
  );
};

export default ImageSlider;
