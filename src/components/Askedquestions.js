import "../styles/Askedquestions.css";
import { useState } from "react";

function Askedquestions() {
    const [openQuestions, setOpenQuestions] = useState([false, false, false, false, false]);

    const toggleQuestion = (index) => {
        setOpenQuestions(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const questions = [
        "What types of cases does NYLitigation handle?",
        "How do I schedule a consultation with NYLitigation?",
        "What should I bring to my initial consultation?",
        "How does NYLitigation charge for its services?",
        "How long will it take to resolve my case?"
    ];

    return (
        <div className="Askedquestions-container">
            <div className="leftside">
               <h1 style={{backgroundcolor: "rgb(3, 3, 64)",padding:"40px",fontSize:"30px",color:"white", position:"absolute", width:"350px"}}>Frequently Asked Questions</h1>
                <p style={{marginTop:"150px",paddingRight:"40px",paddingLeft:"40px",fontSize:"16px",color:"white", position:"absolute", width:"250px"}}>Have a question that is not answered? You can contact us at: 
            <p style={{textDecoration:"underline",marginTop:"-1px",color:"yellow"}}> info@nylitigation.com  </p></p>
            </div>
            <div className="right">
            {questions.map((question, index) => (
                !openQuestions[index] ? (
                    <div key={index} className={`question${index + 1}`}>
                        <p className="paragraph">{question}</p>
                        <button className="button"onClick={() => toggleQuestion(index)}>+</button>
                    </div>
                ) : null
            ))} 
           </div>
        
        </div>
         
    );
}

export default Askedquestions;
