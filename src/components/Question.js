import "../styles/Questions.css";
import { useState } from "react";

function Askedquestions() {
    // State to track the visibility of each answer (one per question)
    const [openQuestions, setOpenQuestions] = useState([false, false, false, false, false]);

    // Toggle the visibility of a specific answer
    const toggleQuestion = (index) => {
        setOpenQuestions(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // Questions and corresponding answers
    const questions = [
        {
            question: "What types of cases does NYLitigation handle?",
            answer: "NYLitigation specializes in personal injury cases, including car accidents, construction accidents, slip and fall incidents, and medical malpractice."
        },
        {
            question: "How do I schedule a consultation with NYLitigation?",
            answer: "You can schedule a consultation by contacting us through our website or by calling our office at the number provided."
        },
        {
            question: "What should I bring to my initial consultation?",
            answer: "Please bring any relevant documents, including medical records, police reports, or insurance information."
        },
        {
            question: "How does NYLitigation charge for its services?",
            answer: "We work on a contingency fee basis, meaning you don’t pay unless we win your case."
        },
        {
            question: "How long will it take to resolve my case?",
            answer: "The timeline varies depending on the complexity of the case. However, we aim to resolve most cases as quickly as possible while ensuring the best outcome."
        }
    ];

    return (
        <div className="Askedquestionscontainer">
            <h1 className="askedquestionh1s">Frequently Asked Questions</h1>
            <p className="askedquestionps">Have a question that is not answered? You can contact us at:</p>
            <p className="email">info@nylitigation.com</p>

            <div className="rightside">
                {questions.map((item, index) => (
                    <div key={index} className={`question${index + 1}`}>
                        {/* If the answer is not visible, show the question */}
                        {!openQuestions[index] ? (
                            <>
                                <p className="paragraph">{item.question}</p>
                                <button className="button-ques" onClick={() => toggleQuestion(index)}>
                                    +
                                </button>
                            </>
                        ) : (
                            // If the answer is visible, show the answer
                            <>
                                <p className="answer">{item.answer}</p>
                                <button className="button-ques" onClick={() => toggleQuestion(index)}>
                                    -
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Askedquestions;
