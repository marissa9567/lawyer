import "../styles/Mobilesuccessstories.css";
import RearendCollision from "../images/rearend-collision.jpg";
import Constructionworker from "../images/construction-worker-injured.jpg";
import Groceryslip from "../images/grocery-slip.jpg";
import { useState } from "react";

function Mobilesuccessstories() {
  const items = [
    {
      Image: RearendCollision,
      Title: "Settlement",
      Refund: "$1,200,000",
      Subtitle: "Man Injured in Rear-End Collision",
      Description:
        "A 52-year-old man was driving home from work when he was rear-ended by a distracted driver who failed to notice the traffic ahead. The impact caused severe whiplash and back injuries, requiring extensive medical treatment and rehabilitation. NYlitigation secured a settlement of $1,200,000 to cover his medical expenses, lost wages, and pain and suffering.",
    },
    {
      Image: Constructionworker,
      Title: "Settlement",
      Refund: "$2,300,000",
      Subtitle: "Construction Worker Injured on Site",
      Description:
        "A 35-year-old construction worker suffered severe injuries after falling from a scaffold due to improper safety measures. The injuries resulted in multiple fractures and long-term rehabilitation. NYLitigation successfully obtained a settlement of $2,300,000 to cover medical expenses, lost wages, and pain and suffering.",
    },
    {
      Image: Groceryslip,
      Title: "Settlement",
      Refund: "$750,000",
      Subtitle: "Grocery Store Slip and Fall",
      Description:
        "A 40-year-old woman slipped and fell in a grocery store due to a wet floor that was not properly marked. The fall caused significant injuries, including a broken hip and wrist. NYLitigation was able to secure a settlement of $750,000 to compensate for her medical bills, rehabilitation costs, and emotional distress.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to a specific slide by clicking on the dot
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="Storiescontainermobile1">
      <h1 className="oursuccessstorymobile1">Our Success Stories</h1>
      <p className="impactmobile1">
        Discover the impactful results we've achieved for our clients.
      </p>

      <div className="slidermobile1">
       
        <div className="itemcontainermobile1">
          <img
            src={items[currentIndex].Image}
            alt={items[currentIndex].Subtitle}
            className="storiesimgmobile1"
          />
          <p className="titleparagraphmobile1">{items[currentIndex].Title}</p>
          <p className="refundmobile1">{items[currentIndex].Refund}</p>
          <h3 className="subtitlemobile1">{items[currentIndex].Subtitle}</h3>
          <p className="descriptionmobile1">
            {items[currentIndex].Description}
          </p>
        </div>
      
      </div>

      {/* Dots for slide navigation */}
      <div className="dotsmobile1">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dotmobile1 ${index === currentIndex ? 'activemobile1' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Mobilesuccessstories;
