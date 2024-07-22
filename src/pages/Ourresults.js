import "../styles/Results.css";

import Statueofliberty from "../images/statueofliberty.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faCheck } from "@fortawesome/free-solid-svg-icons";

function Ourresults() {
    const list = [
        { Money: "1.2M", Accident: "Car Accident" },
        { Money: "550K", Accident: "Spinal Cord Injury" },
        { Money: "450K", Accident: "Wrongful Death" },
        { Money: "425K", Accident: "Car Accident" },
        { Money: "380K", Accident: "Bike Accident" },
        { Money: "112K", Accident: "Stairway Accident" }
    ];

    return (
        <div className="main">
     
            <div className="header-container">
                <div>
                    <h1>OUR RESULTS</h1>
                    <p>Explore the significant outcomes we've achieved for our clients</p>
              
                    
            </div>

            <div className="awarded-card">
                {list.map((item, index) => (
                    <div className="card" key={index}>
                        <span style={{fontWeight:"bold",fontSize:"30px",color:"yellow"}}>{item.Money}</span>  <span style={{color:"white"}}>{item.Accident}</span>
                    </div>
                ))}
            </div>
            </div>
            <div className="div-three">
            <div className="left-div">
                <img src={Statueofliberty} alt="statue" style={{marginLeft:"15px",width:"350px", height:"410px", borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px"}}/>




            </div>
            <div className="right-div">
                <h1 style={{color:"white"}}>Why Choose Us?</h1>
                <p style={{color:"white"}}>Choosing the right lawfirm to represent you can make all the difference.At NYLitigation we:</p>
                <ul style={{marginLeft:"-80px"}}>
                        <ul style={{ color: "white" }}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: 'yellow' }} /> Offer personalized attention to each client
                            </ul>
                        <ul style={{ color: "white" }}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: 'yellow' }} /> Have a proven track record of success
                        </ul>
                        <ul style={{ color: "white" }}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: 'yellow' }} /> Work on a contingency fee basis - you dont pay unless we win
                        </ul>
                        <ul style={{ color: "white" }}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: 'yellow' }} /> Provide compassionate and dedicated legal representation
                        </ul>
                    </ul>
                    
            </div>
                  <h1 style={{color:"white", position:"absolute",marginTop:"490px",marginLeft:"470px"}}>Ready to Get Started</h1>
                  <p style={{width:"450px",color:"white", position:"absolute",marginTop:"540px",marginLeft:"380px"}}>Injured? Contact us today.Our experienced attorneys will help <p style={{marginLeft:"100px"}}>you get the compensation you deserve</p></p>
                  <button style={{backgroundColor:"yellow",borderRadius:"50px",color:"black",height:"50px",marginTop:"620px",marginLeft:"570px",position:"absolute"}}>Free consultation</button>
            </div>

            </div>
   
    );
}

export default Ourresults;
