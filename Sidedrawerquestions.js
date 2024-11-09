import React, { useState } from 'react';
import '../styles/FAQ.css'; // Optional: Add your CSS styles here
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
const Sidedrawermessages = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "what is the side drawer?",
            answer: "It is a pullout drawer on the side of the page and is labeled with a > .Once that arrow is clicked, the drawer pulls out.You can then add in extra links or images you may want to add."
        },
        {
            question: "What do I use the side drawer for?",
            answer: "You can add in extra images or articles"
        },
       
       
          ];
    
    
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                    <div className="faq-question" onClick={() => toggleAnswer(index)}>
                        <h3>{faq.question}</h3>
                        <span>{openIndex === index ? '-' : '+'}</span>
                    </div>
                    {openIndex === index && (
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    )}

                </div>
            ))}

            <div className='linkcontainersidedrawer'>
            <li ><Link  to="/FAQ">Questions about Blog</Link></li>
            <li ><Link  to="/Shopquestions">Questions about Store</Link></li>
            <li ><Link  to="/Cartquestions">Questions about Cart and Checkout</Link></li>
            <li ><Link  to="/Footerquestions">Questions about Footer</Link></li>
            <li ><Link  to="/Aboutquestions">Questions about the About Page</Link></li>
            <li ><Link  to="/Backendquestions">Questions about the Backend</Link></li>
            <li ><Link  to="/Contactmessages">Questions about contact messages</Link></li>
            <li ><Link  to="/Sidedrawerquestions">Questions about the side drawers</Link></li>
            <li ><Link  to="/Stripequestions">Questions about Stripe</Link></li>
            <li ><Link  to="/Termsandprivacyquestions">Questions about the terms and privacy</Link></li>


            </div>
            
        </div>
    );
};

export default Sidedrawermessages;
