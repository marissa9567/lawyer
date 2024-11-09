import "../styles/Home.css";

import Header1 from "../components/Header1"
import Card from "../pages/Card";
import Successstories from '../pages/Successstories';
import Imageslider from "../components/Imageslider";
import Question from "../components/Question";
import Footer from "../components/Footer";
import Mobilesuccessstories from "../pages/Mobilesuccessstories";
import Navbar from "../components/Navbar";
import "../styles/Home.css";


function Home(){

    return (
        <div className="homecontainer">
      <Navbar/>
     <Header1/>
     <Card/>
     <Mobilesuccessstories/>
     <Successstories/>
     <Imageslider/>
     <Question/>
     <div className="homefooter">
     <Footer/>  
     </div>
    
       </div>
    )
}

export default Home