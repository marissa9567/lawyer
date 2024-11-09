import "../styles/Ourlawyers.css";
import Navbar from "../components/Navbar";
import lawyer2 from "../images/lawyer2.png";
import Footer from "../components/Footer";

function Ourlawyers(){

    return(
       
       
        <div className="lawyerscontainer">
           <div className="navcontainer">
           <Navbar/>
           </div>
        <div className="introductioncontainer">

        
<h1 className="intro" >Meet Our Dedicated Legal Team</h1> 
<p className="intro2">Expert Attorneys Commited to Your Success and Justice</p> 
</div>
            <div className="Leftlawyer">
             <img src={lawyer2}alt="lawyer" className="leftlawyerimg"/>
             <h4 className="Samnameleft">Sam Shlivko</h4>
             <h5 className="position-left">attorney</h5>
             <p className="leftlawyerabout">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      
       </div>
            <div className="Rightlawyer">
             <img src={lawyer2}alt="lawyer" className="rightlawyerimg"/>
             <h4 className="Samnameright">Sam Shlivko</h4>
             <h5 className="position-right">attorney</h5>
             <p className="rightlawyerabout">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
           
     </div>
  
     <div className="footercontainer1">
  <Footer/>
</div>
     </div>

    )
}

export default Ourlawyers