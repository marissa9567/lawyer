// Cardcomponent.js
import "../styles/Card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cardcomponent({ items }) {
  return (
    <div className="Card-container">
      {items.map((item, index) => (
        <div key={index} className="card-item">
          {item.Logo && <FontAwesomeIcon icon={item.Logo} size="2x" className="logo"/>} {/* Render the icon if it exists */}
          <h1 style= {{fontSize:"15px", marginLeft:"40px",color:"white"}}>{item.Title}</h1>
          <p style= {{fontSize:"10px", marginLeft:"100px", color:"white"}}>{item.Subtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Cardcomponent;
