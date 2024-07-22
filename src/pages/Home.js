import "../styles/Home.css";
import Header from "../components/Header";

import Card from "../pages/Card";
import Successstories from '../pages/Successstories';
import Imageslider from "../components/Imageslider";
import Askedquestions from "../components/Askedquestions";


function Home(){

    return (
        <div style={{height:100}}>
         <Header/>
         <Card/>
         <Successstories/>
         <Imageslider/>
         <Askedquestions/>
         
        </div>
       
    )
}

export default Home