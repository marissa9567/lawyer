// src/components/ColorManagement.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Import Firestore
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const ColorManagement = () => {
    const [colors, setColors] = useState([]);
    const [newColor, setNewColor] = useState('');
    const [editColorId, setEditColorId] = useState(null);
    const [editColorValue, setEditColorValue] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'colors'), (snapshot) => {
            const colorList = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            }));
            setColors(colorList);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAddColor = async (e) => {
        e.preventDefault();
        if (newColor.trim() === '') return; // Prevent empty colors
        try {
            await addDoc(collection(db, 'colors'), { name: newColor });
            setNewColor(''); // Reset the input field
        } catch (error) {
            console.error('Error adding color: ', error);
        }
    };

    const handleEditColor = (color) => {
        setEditColorId(color.id);
        setEditColorValue(color.name);
    };

    const handleUpdateColor = async (e) => {
        e.preventDefault();
        if (editColorValue.trim() === '') return; // Prevent empty colors
        try {
            await updateDoc(doc(db, 'colors', editColorId), { name: editColorValue });
            setEditColorId(null); // Reset editing state
            setEditColorValue(''); // Reset input field
        } catch (error) {
            console.error('Error updating color: ', error);
        }
    };

    const handleDeleteColor = async (id) => {
        try {
            await deleteDoc(doc(db, 'colors', id));
        } catch (error) {
            console.error('Error deleting color: ', error);
        }
    };

    return (
        <div>
            <h2>Manage Colors</h2>
            <form onSubmit={handleAddColor}>
                <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter a new color"
                />
                <button type="submit">Add Color</button>
            </form>
            <ul>
                {colors.map(color => (
                    <li key={color.id}>
                        {editColorId === color.id ? (
                            <form onSubmit={handleUpdateColor}>
                                <input
                                    type="text"
                                    value={editColorValue}
                                    onChange={(e) => setEditColorValue(e.target.value)}
                                />
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditColorId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                {color.name}
                                <button onClick={() => handleEditColor(color)}>Edit</button>
                                <button onClick={() => handleDeleteColor(color.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ColorManagement;
