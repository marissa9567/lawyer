import "../styles/Results.css";
import Navbar from "../components/Navbar";
import Statueofliberty from "../images/statueofliberty.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faCheck } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

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
            <div className="ourresults-nav">
             <Navbar/>     
            </div>
          
            <div className="header-container">
                <div>
                    <h1 className="title-results">OUR RESULTS</h1>
                    <p className="title-exploreoutcomes">Explore the significant outcomes we've achieved for our clients</p>
              
                    
            </div>
                    <div className="outer-card">
         
                {list.map((item, index) => (
                    <div className="card" key={index}>
                        <span className="spancontainer">{item.Money}</span>  <span className="spancontaineraccident">{item.Accident}</span>
                    </div>
                ))}
            </div>
            </div>
            <div className="div-three">
            <div className="left-div">
                <img src={Statueofliberty} alt="statue"  className="statueimg"/>

            </div>
            <div className="right-div">
                <h1 className="right-div-whychooseus">Why Choose Us?</h1>
                <p className="right-div-choosinglawfirm">Choosing the right lawfirm to represent you can make all the difference.At NYLitigation we:</p>
                <ul style={{marginLeft:"-80px"}}>
                        <ul className="ulcard">
                        <FontAwesomeIcon icon={faCheck} className="checkmark" /> Offer personalized attention to each client
                            </ul>
                        <ul  className="ulcard">
                        <FontAwesomeIcon icon={faCheck} className="checkmark" /> Have a proven track record of success
                        </ul>
                        <ul  className="ulcard">
                        <FontAwesomeIcon icon={faCheck} className="checkmark" /> Work on a contingency fee basis - you dont pay unless we win
                        </ul>
                        <ul  className="ulcard">
                        <FontAwesomeIcon icon={faCheck} className="checkmark" /> Provide compassionate and dedicated legal representation
                        </ul>
                    </ul>
                    
            </div>
                    <div className="div-contact">
                  <h1 className="getstarted1">Ready to Get Started?</h1>
                  <p className="contactus1">Injured?Contact us today</p>
                  <p className="contactus2">Our experienced attorneys will help you</p>
                  <p className="contactus3"> get the compensation you deserve</p>
                  <button className="consultation-button">Free consultation</button>
         </div>
            </div>
         <div className="ourresults-footer">
            <Footer/>
         </div>
            </div>
   
    );
}

export default Ourresults;
