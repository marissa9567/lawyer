import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../components/firebase'; // Adjust as necessary
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [shopColor, setShopColor] = useState('#FFFFFF'); // Default color

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                fetchUserShopColor(user.uid); // Fetch color when user logs in
            } else {
                resetShopColor(); // Reset color when user logs out
            }
        });
        return unsubscribe; // Clean up subscription on unmount
    }, []);

    const fetchUserShopColor = async (userId) => {
        const userDocRef = doc(db, 'users', userId);
        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.shopColor) {
                    setShopColor(data.shopColor); // Set the shop color from Firestore
                }
            }
        } catch (error) {
            console.error('Error fetching shop color:', error);
        }
    };

    const saveColorToFirebase = async (color) => {
        if (!currentUser) return; // Only save if there's a logged-in user
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await setDoc(userDocRef, { shopColor: color }, { merge: true });
        } catch (error) {
            console.error('Error saving color to Firebase:', error);
        }
    };

    const resetShopColor = async () => {
        const defaultColor = '#FFFFFF';
        setShopColor(defaultColor); // Reset to default color
        await saveColorToFirebase(defaultColor); // Save the default color to Firebase
    };

    const login = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; // Optionally rethrow to handle in the component
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            resetShopColor(); // Reset color on logout
        } catch (error) {
            console.error('Error logging out:', error);
            throw error; // Optionally rethrow to handle in the component
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, shopColor, setShopColor, saveColorToFirebase }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; // Return the context object directly
};
