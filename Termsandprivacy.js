import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase'; // Adjust the path as needed
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../Context/AuthContext';
const InputComponent = () => {
    const [inputValue, setInputValue] = useState('');
    const [savedValues, setSavedValues] = useState([]);
    const [borderStyle, setBorderStyle] = useState('solid');
    const [borderColor, setBorderColor] = useState('#4CAF50');
    const [borderWidth, setBorderWidth] = useState('2px');
    const [fontSize, setFontSize] = useState('16px');
    const { currentUser } = useAuth();
    const auth = getAuth();
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSave = async () => {
        try {
            await addDoc(collection(db, "yourCollectionName"), {
                value: inputValue,
                borderStyle: borderStyle,
                borderColor: borderColor,
                borderWidth: borderWidth,
                fontSize: fontSize,
            });
            setInputValue('');
            fetchSavedValues();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "yourCollectionName", id));
            fetchSavedValues(); // Refresh the list after deletion
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const fetchSavedValues = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "yourCollectionName"));
            const values = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id, // Include document ID
            }));
            setSavedValues(values);
        } catch (e) {
            console.error("Error fetching documents: ", e);
        }
    };

    useEffect(() => {
        fetchSavedValues();
    }, []);

    const borderStyleObject = {
        borderStyle: borderStyle,
        borderColor: borderColor,
        borderWidth: borderWidth,
        padding: '8px',
        borderRadius: '4px',
        fontSize: fontSize,
    };

    return (
        <div>
            <div>
            {currentUser && (
                <label>
                    Border Style:
                    
                   
                    <select onChange={(e) => setBorderStyle(e.target.value)} value={borderStyle}>
                        <option value="solid">Solid</option>
                        <option value="dotted">Dotted</option>
                        <option value="dashed">Dashed</option>
                    </select>
                    
                </label>
            )}
           {currentUser && (
                <label>
                    Border Color:
                    <input 
                        type="color" 
                        onChange={(e) => setBorderColor(e.target.value)} 
                        value={borderColor} 
                    />
                </label>
           )}
           {currentUser && (
                <label>
                    Border Width:
                    
                    <select onChange={(e) => setBorderWidth(e.target.value)} value={borderWidth}>
                        <option value="1px">1px</option>
                        <option value="2px">2px</option>
                        <option value="3px">3px</option>
                        <option value="4px">4px</option>
                    </select>
                    
                </label>
    )}

{currentUser && (
                <label>
                    Font Size:
                    {currentUser && (
                    <select onChange={(e) => setFontSize(e.target.value)} value={fontSize}>
                        <option value="5px">5px</option>
                        <option value="10px">10px</option>
                        <option value="16px">16px</option>
                        <option value="20px">20px</option>
                        <option value="40px">40px</option>
                        
                    </select>
                    )}
                </label>
)}
            </div>
            {currentUser && (
            <input 
                type="text" 
                value={inputValue} 
                onChange={handleChange} 
                placeholder="Type something..." 
                style={borderStyleObject} 
            />
            )}
             {currentUser && (
            <button onClick={handleSave}>Save</button>)}
            {savedValues.length > 0 && (
                <div>
             
                    <ul>
                        {savedValues.map((item) => (
                            <li key={item.id} style={{ border: `${item.borderWidth} ${item.borderStyle} ${item.borderColor}`, fontSize: item.fontSize }}>
                                {item.value}

                                {currentUser && (
                                <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>
                                    Delete
                                </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InputComponent;
