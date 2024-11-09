import "../styles/Card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cardcomponent({ items }) {
  return (
    <div className="card-container">
      {items.map(item => (
        <div
          key={item.id}
          className={`card-item ${item.id === 2 ? 'card-item-special' : ''}`}
        >
          <div className="logo1">
            <FontAwesomeIcon icon={item.Logo} />
          </div>
          <h3 className="item-title">{item.Title}</h3>
          <p className="item-subtitle">{item.Subtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Cardcomponent;
