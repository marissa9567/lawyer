import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../components/firebase'; // Ensure correct import path for your Firebase setup
import { doc, setDoc, getDoc } from 'firebase/firestore';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [shopBgColor, setShopBgColor] = useState('#ffffff'); // Default color
    const [loading, setLoading] = useState(true); // Loading state for fetching color

    // Fetch color on mount
    useEffect(() => {
        const fetchColor = async () => {
            try {
                const docRef = doc(db, 'settings', 'backgroundColor');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setShopBgColor(docSnap.data().color || '#ffffff'); // Default to white if no color is found
                }
            } catch (error) {
                console.error("Error fetching background color: ", error);
            } finally {
                setLoading(false); // Set loading to false once the fetching is complete
            }
        };

        fetchColor();
    }, []);

    // Save color whenever it changes
    useEffect(() => {
        const saveColor = async () => {
            if (loading) return; // Don't save while loading

            try {
                const docRef = doc(db, 'settings', 'backgroundColor');
                await setDoc(docRef, { color: shopBgColor }, { merge: true });
            } catch (error) {
                console.error("Error saving background color: ", error);
            }
        };

        saveColor();
    }, [shopBgColor]);

    return (
        <ColorContext.Provider value={{ shopBgColor, setShopBgColor }}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = () => useContext(ColorContext);
