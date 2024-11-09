import React, { useState, useEffect } from 'react';
import { database } from '../components/firebase'; // Adjust the path based on your file structure
import { ref, onValue, push, remove } from 'firebase/database';
import "../styles/Footer.css";

const Footer = () => {
    const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapse
    const [title, setTitle] = useState('');
    const [fontColor, setFontColor] = useState('#000000');
    const [fontSize, setFontSize] = useState('16px');
    const [fontStyle, setFontStyle] = useState('normal');
    const [textDecoration, setTextDecoration] = useState('none');
    const [textShadow, setTextShadow] = useState('none');
    const [titles, setTitles] = useState([]);

    const handleSubmit = () => {
        const newTitle = {
            title,
            fontColor,
            fontSize,
            fontStyle,
            textDecoration,
            textShadow,
        };

        push(ref(database, 'titles'), newTitle); // Use push to add to the database
        setTitle(''); // Clear input after submit
    };

    useEffect(() => {
        const titlesRef = ref(database, 'titles');
        const unsubscribe = onValue(titlesRef, (snapshot) => {
            const titlesData = snapshot.val();
            const titlesList = [];
    
            if (titlesData) {
                for (let id in titlesData) {
                    titlesList.push({ id, ...titlesData[id] });
                }
            }
    
            setTitles(titlesList);
        });
    
        return () => unsubscribe(); // Ensure the listener is removed on unmount
    }, []);
    
    const handleDelete = (id) => {
        const itemRef = ref(database, `titles/${id}`);

        remove(itemRef)
            .then(() => {
                console.log("Delete successful");
            })
            .catch((error) => {
                console.error("Delete failed: ", error);
            });
    };

    // Toggle the collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className='footer'>
          <ul className='footer-leftside'>
            <li className='leftside'><a href="/">Blog</a></li>
            <li className='leftside'><a href="/shophomepage">Shop</a></li>
            <li className='leftside'><a href="/about">About</a></li>
          </ul>
          <ul className='footer-rightside'>
            <li className='rightside'><a href="/track">tracker</a></li>
            <li className='rightside'><a href="/contactus">Contact</a></li>
            <li className='rightside'><a href="/termsandprivacy">Privacy Policy</a></li>
          </ul>
           <button className="footer-toggle-button" onClick={toggleCollapse}>
    {isCollapsed ? 'Show edit' : 'Hide edit'}
</button>
            {!isCollapsed && (
                <div className='title-container'>
                    <h2 className='add-title-footer'>Add a Title</h2>
                    <input
                    className='footer-title-input'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />
                    <div>
                    <input
                        className='font-color-input'
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                    /></div>
                    <select className="select-text-size"onChange={(e) => setFontSize(e.target.value)} value={fontSize}>
                         <option value="16px">Select font size</option>
                        <option value="16px">16px</option>
                        <option value="20px">20px</option>
                        <option value="24px">24px</option>
                    </select>
                    <select className="select-text-style"onChange={(e) => setFontStyle(e.target.value)} value={fontStyle}>
                    <option value="normal">Select font style</option>
                    <option value="italic">Italic</option>
                        <option value="normal">Normal</option>
                        <option value="italic">Italic</option>
                    </select>
                    <select className="select-text-decoration"onChange={(e) => setTextDecoration(e.target.value)} value={textDecoration}>
                    <option value="none">select text decoration</option>
                    <option value="underline">Underline</option>
                        <option value="none">None</option>
                        <option value="underline">Underline</option>
                        <option value="line-through">Strikethrough</option>
                    </select>
                    <select className="select-text-shadow"onChange={(e) => setTextShadow(e.target.value)} value={textShadow}>
                    <option value="none">Select Text Shadow</option>
                        <option value="none">None</option>
                        <option value="2px 2px 4px rgba(0, 0, 0, 0.3)">Simple Shadow</option>
                        <option value="4px 4px 8px rgba(0, 0, 0, 0.5)">Bold Shadow</option>
                    </select>
                    <button className="footer-submit"onClick={handleSubmit}>Submit</button>

                  
                </div>
            )}  

<div className="titles-container">
    {titles.map((item) => (
        <div key={item.id} className="title-item">
            <p
                style={{
                    color: item.fontColor,
                    fontSize: item.fontSize,
                    fontStyle: item.fontStyle,
                    textDecoration: item.textDecoration,
                    textShadow: typeof item.textShadow === 'string' ? item.textShadow : 'none',
                }}
            >
                {item.title}
            </p>
            <button className="footer-delete"onClick={() => handleDelete(item.id)}>x</button>
        </div>
    ))}
</div>

           
     
      
        </div>
    );
};

export default Footer;
