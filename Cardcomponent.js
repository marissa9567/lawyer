import "../styles/Card.css";





    const Cardcomponent = ({ title, description, imageUrl }) => {
        return (
          <div className="CardContainer">
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p className="card-description">{description}</p>
            </div>
          </div>
        );
      };
      
      export default Cardcomponent;