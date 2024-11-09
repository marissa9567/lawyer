import React, { useState } from 'react';
import '../styles/FAQ.css'; // Optional: Add your CSS styles here
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
const Backend = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is firebase?",
            answer: "Firebase is a platform developed by Google that provides a suite of tools and services to help developers build and manage applications more efficiently. It offers a range of features that simplify common tasks in app development, such as backend management, real-time database storage, authentication, and hosting. Here’s a breakdown of its key components:"
        },
        {
            question: "How do I see what I am saving in firebase?",
            answer: "Go to the Firebase Console.Log in with your Google account associated with your Firebase project.Click on the project you want to inspect. If you don’t have any projects yet, you’ll need to create one.Firestore: Click on Firestore Database.You’ll see a collection of documents. Click on a collection to view the documents it contains.Click on a document to see its fields and values. You can also edit or delete documents from here."
        },
        {
            question: "Can I delete from firebase?",
            answer: "    Log in to Firebase Console: Go to Firebase Console and select your project.Navigate to Firestore Database: Click on Firestore Database from the left sidebar.Find the Collection: Click on the collection containing the document you want to delete.Select the Document: Click on the document you wish to delete.Delete the Document:Click the three vertical dots (more options) in the top-right corner of the document view.Select Delete Document.Confirm the deletion."
        },
        {
            question: "What is storage in firebase?",
            answer: "Firebase Storage is a service provided by Firebase that allows you to store and serve user-generated content, such as images, videos, audio files, and other types of files. It is built on Google Cloud Storage, offering a reliable and secure way to manage and access large amounts of data. "
        },
        {
            question: "How do I get to storage in firebase?",
            answer: "Go to Firebase Console:Open your web browser and go to the Firebase Console.Sign in with your Google account if you aren’t already logged in.Select Your Project:Once you're in the Firebase Console, you’ll see a list of your projects.Click on the project that you want to access.Navigate to Storage:In the left sidebar, find and click on Storage. If you don’t see it immediately, you may need to click on the Show Menu icon (three horizontal lines) at the top left to expand the menu.This will take you to the Firebase Storage dashboard.Manage Files:Here, you can see all the files you've uploaded to Firebase Storage.."
        },
        {
            question: "what is firebase database?",
            answer: " It is part of Firebase, a platform developed by Google to help developers build and manage mobile and web applications. "
        },
        {
            question: "What is authentication in Firebase?",
            answer: "Authentication in Firebase is a service that helps you manage user authentication for your applications. It provides a way to securely sign up, sign in, and manage users, making it easier to build applications that require user accounts. "
        },
        {
            question: "How can I add a user in firebase to be an authenticated user for my blog/store?",
            answer: "In the Firebase Console, navigate to 'Authentication' in the left sidebar.Click on the 'Sign-in method' tab.Enable the authentication methods you want to use (Email/Password, Google, Facebook, etc.)."
        },
        {
            question: "How can I reset my password for firebase?",
            answer: "    In the left-hand menu, click on Authentication.Go to the Users tab.Find the User:In the list of users, find the user whose password you want to reset. You can use the search bar to quickly locate them by email or display name.Reset Password:Click on the three dots (more actions) next to the user's entry and select Reset password.A dialog will appear, prompting you to enter a new password.Enter the new password and confirm it, then click Reset Password."
        },
        {
            question: "How much does firebase cost?",
            answer: " Firebase Free Tier (Spark Plan)Cost: Free Usage Limits:Firebase Authentication: Up to 10,000 monthly active users.Cloud Firestore: 1 GB of storage, 50,000 reads, 20,000 writes, and 20,000 deletes per day.Firebase Realtime Database: 1 GB of storage and 100,000 simultaneous connections.Cloud Functions: 2 million invocations per month.Hosting: 1 GB of stored data and 1 GB of data transfer per month.Cloud Storage: 1 GB of storage and 1 GB of downloads per month.2. Firebase Blaze Plan (Pay As You Go)Cost: Pay for what you use (no fixed monthly fee)Usage and Pricing:Firebase Authentication: Pay per verification for phone numbers (after the first 10,000 monthly active users).Cloud Firestore:$0.06 per GB stored per month.$0.12 per 100,000 document reads.$0.18 per 100,000 document writes.$0.02 per 100,000 document deletes.Realtime Database:$5 per GB stored per month.$1 for every 1,000,000 downloads.Cloud Functions:$0.40 per million invocations, $0.0000025 per GB-second, and $0.00001 per CPU-second.Hosting:$0.026 per GB stored per month and $0.15 per GB transferred.Cloud Storage:$0.026 per GB stored per month and additional charges for downloads and operations.1 GB (gigabyte) is equal to 1,024 MB (megabytes). I added a converter into the code that makes file uploads 10 mb or less "
        },
        {
            question: "How can I see my usage and billing info in firebase",
            answer: "Navigate to Billing:In the left sidebar, click on Billing under the 'Build' or 'Project Settings' section.This will take you to Google Cloud's Billing overview for your project.Under Reports or Usage in the billing dashboard, you’ll see detailed usage metrics, including data on storage, functions, authentication, and more."
        },
    ];
    
    
    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions about Backend</h2>
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

            <div className='linkcontainerbackend'>
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

export default Backend;
