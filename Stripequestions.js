import React, { useState } from 'react';
import '../styles/FAQ.css'; // Optional: Add your CSS styles here
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
const Stripequestions= () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is stripe",
            answer: "Stripe is a technology company that provides tools to help businesses handle online payments. "
        },
        {
            question: "How much does stripe cost?",
            answer: "Transaction Fees:For online payments in the U.S., Stripe typically charges 2.9% + $0.30 per transaction for credit and debit card payments. This means that if a customer pays $100, Stripe takes $2.90 plus $0.30, leaving you with $96.80.For international cards, additional fees may apply (usually an extra 1%).Standard Fees: 2.9% + $0.30 per transaction for online payments in the U.S.In-Person Fees: 2.7% + $0.05 per transaction.No monthly or setup fees."
        },
        {
            question: "How is stripe connected to my project?",
            answer: "Connecting Stripe to a React application typically involves integrating Stripe's API for handling payments securely."
        },
        {
            question: "How do I see my balances in stripe?",
            answer: "After logging in, you will be directed to the Stripe Dashboard.On the left-hand menu, click on “Balance”. This section provides you with an overview of your current balance, pending balance, and available balance."
        },
        {
            question: "How do I set up my bank account in stripe?",
            answer: "Access Your Dashboard: Log into your Stripe dashboard. Navigate to Settings: Click on the gear icon in the top right corner to go to your account settings.Select Bank Accounts: Under the 'Payments' section, look for 'Bank accounts' or 'Payout settings.'Add Your Bank Account: Enter your bank account details (account number, routing number, etc.) and follow the prompts to verify it."

        },
        {
            question: "where is settings?",
            answer: "You can type it in to the search if you cant find it"
        },
        {
            question: "what do I need from stripe to connect it to my app?",
            answer: "publishable key and secret key."
        },
        {
            question: "How do I find the publishable and secret key?",
            answer: "Once logged in, you'll be directed to your Stripe dashboard.In the left-hand sidebar, look for the Developers section.Click on API keys under the Developers menu.You will see two sets of API keys: Publishable key: Used on the client-side to create payment forms. This key starts with pk_.Secret key: Used on the server-side to handle payments and create payment intents. This key starts with sk_."
        },
        
       
    ];
    
    
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions about Stripe</h2>
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

            <div className='linkcontainerstripe'>
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

export default Stripequestions;
