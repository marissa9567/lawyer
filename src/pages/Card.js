import Cardcomponent from "../components/Cardcomponent";
import "../styles/Card.css";
import { faCalendar } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import { faTablet } from '@fortawesome/free-solid-svg-icons'; // 
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // 


function Card() {
  const items = [
    { id: 1, Logo: faCalendar, Title: "Schedule a Free Consultation", Subtitle: "Get Started ->" },
    { id: 2, Logo: faTablet, Title: "Tell Us About Your Case", Subtitle: "Get Started ->" },
    { id: 3, Logo: faPhone, Title: "Contact Us with WhatsApp Us", Subtitle: "Get Started ->" },
  ];

  return (
   <div className="Card-Title">
      <h2 style={{color:"white",marginTop:"100px",marginLeft:"500px"}}>Get in Touch</h2>
      <h1 style={{color:"white",marginLeft:"430px"}}>Let Us Fight For You</h1>
   
    
      <Cardcomponent items={items} />
    </div>
  );
}

export default Card;
