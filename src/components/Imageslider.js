import React, { useState } from 'react';
import "../styles/Imageslider.css";
import Robert from "../images/Robert.jpg";
import Person from "../images/person.jpeg";

// Sample quotes array
const quotes = [
  {
    quote: "'NYLitigation handled my case with utmost professionalism and secured the best outcome for me'",
    author: "Robert Johnson",
    settlement: "Settlement Amount: $3 million",
    image: Robert
  },
  { 
    quote: "'NYLitigation handled my case with utmost professionalism and secured the best outcome for me'",
    author: "Robert DiNero",
    settlement: "Settlement Amount: $3 million",
    image: Person
  },
  {
    quote: "'NYLitigation handled my case with utmost professionalism and secured the best outcome for me'",
    author: "Robert Johnson",
    settlement: "Settlement Amount: $3 million",
    image: Robert
  }
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

  // Function to go to specific slide by clicking the dot
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className='container'>
      <div className="slider">
        <div>
          <h1 className="h1title1">Whats Our Clients Say</h1>
          <p className="ptitle1">Hear from those who have experienced the NYLitigation difference</p>
        
        </div>

     

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

    

        {/* Dots for slide navigation */}
        <div className="dots">
          {quotes.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
