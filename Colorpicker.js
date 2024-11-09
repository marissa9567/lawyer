import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ColorPicker = () => {
    const [selectedColor, setSelectedColor] = useState('#ffffff'); // Default color

    useEffect(() => {
        const fetchColor = async () => {
            const colorDoc = doc(db, 'defaultColors', 'colorId');
            const docSnap = await getDoc(colorDoc);

            if (docSnap.exists()) {
                setSelectedColor(docSnap.data().color);
            } else {
                console.log('No such document! Creating default.');
                // Optionally create the document if it doesn't exist
                await setDoc(colorDoc, { color: selectedColor });
            }
        };

        fetchColor();
    }, []);

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleColorSubmit = async () => {
        try {
            await setDoc(doc(db, 'defaultColors', 'colorId'), { color: selectedColor }, { merge: true });
            console.log('Color saved successfully!');
        } catch (error) {
            console.error("Error saving color to Firebase:", error);
        }
    };

    return (
        <div>
            <label htmlFor="colorPicker">Select Background Color:</label>
            <input 
                type="color" 
                id="colorPicker" 
                value={selectedColor} 
                onChange={handleColorChange} 
            />
            <button onClick={handleColorSubmit}>Save Color</button>
        </div>
    );
};

export default ColorPicker;
