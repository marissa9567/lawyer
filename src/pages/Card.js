import Cardcomponent from "../components/Cardcomponent";
import "../styles/Card.css";
import { faCalendar } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { faTablet } from '@fortawesome/free-solid-svg-icons'; // 
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // 


function Card() {
  const items = [
    { id: 1, Logo: faCalendar, Title: "Schedule a Free Consultation", Subtitle: "Get Started ->" },
    { id: 2, Logo: faPhone, Title: "Contact Us with WhatsApp Us", Subtitle: "Get Started ->" },
    {id: 3, Logo: faTablet, Title: "Tell Us About Your Case", Subtitle: "Get Started ->" },
  ];

  return (
   <div className="Card-Title1">
      <h2 className="cardtitleh2" >Get in Touch</h2>
      <h1 className="cardtitleh1" >Let Us Fight For You</h1>
   
    
      <Cardcomponent items={items} />
    </div>
  );
}

export default Card;
