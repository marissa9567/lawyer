import React, { useState } from 'react';
import '../styles/FAQ.css'; // Optional: Add your CSS styles here
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How do I change the background of the shop homepage?",
            answer: "go to the shop in th enavbar.At the top of the shop page you will see a button that says select backgrund color.Pick your color and press the save color button.It should save your color."
        },
        {
            question: "Where do I make a product card for the store?",
            answer: "Go to the edit shop in the navbar.From there you can design how you want your product card to look like."
        },
        {
            question: "How do I see the store once I submit my products?",
            answer: "Once you save your product card in the edit shop page,go to the shop page in the navbar.Once there you should see your product card displayed."
        },
        {
            question: "How can I add additional information about the product?",
            answer: "You can click your product card and it opens up the module and you can fill it out with additional information about your product.Make sure you save it."
        },
        {
            question: "How can I edit the product card?",
            answer: "Click on your product card in the shop and it opens the module. Clicking the edit content edits the information that shws on the front of the card in the store."
        },
        {
            question: "How can I add the size of the product?",
            answer: "When you click the product card in the store, it opens up a module.You may need to scroll but you will see a button edit addition info.In there you can add the size. ;"
        },
        {
            question: "what is the price filter?",
            answer: "The price filter is a tool for customer to filter what prices they want to view."
        },
        {
            question: "Where how product cards appear on a page?",
            answer: "I have it set to 20 per page before it starts up on the next page.It allows 5 in a row"
        },
        {
            question: "Where do I delete a product card?",
            answer: "You can go to edit shop in navbar.Once there, find the product you want to delete and click the delete button on it"
        },
        {
            question: "What is the search by category?",
            answer: "It allows customers to narrow down their search by typing in a certain category they want."
        },
        
    ];
    
    
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions about Shop</h2>
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

            <div className='linkcontainershop'>
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

export default FAQ;
