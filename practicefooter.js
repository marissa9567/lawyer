import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, arrayUnion, arrayRemove, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../components/firebase';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../Context/AuthContext';

function Footer({ onDeleteAll }) {
    const [title1, setTitle1] = useState('');
    const [title2, setTitle2] = useState('');
    const [titles, setTitles] = useState([]);
    const [styles, setStyles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [fontSize1, setFontSize1] = useState('16px');
    const [fontSize2, setFontSize2] = useState('16px');
    const [fontStyle1, setFontStyle1] = useState('');
    const [fontStyle2, setFontStyle2] = useState('');
    const [fontColor1, setFontColor1] = useState('#000000');
    const [fontColor2, setFontColor2] = useState('#000000');
    const [userId, setUserId] = useState(null); // Ensure this is initialized
    const [error, setError] = useState('');
    const { currentUser } = useAuth();
    const auth = getAuth();

    // Fetch public titles
    const fetchPublicTitles = async () => {
        const publicDocRef = doc(db, 'public', 'sharedTitles');
        const docSnap = await getDoc(publicDocRef);
        
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.titles) {
                setTitles(data.titles);
                setStyles(data.styles || []);
            }
        } else {
            console.log("No public titles found.");
        }
    };

    useEffect(() => {
        fetchPublicTitles();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setUserId(currentUser.uid); // Set userId when user is logged in
            const userDocRef = doc(db, 'users', currentUser.uid);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                setTitles(doc.data()?.titles || []);
                setStyles(doc.data()?.styles || []);
            });
            return () => unsubscribe(); // Cleanup on unmount
        } else {
            const publicDocRef = doc(db, 'public', 'sharedTitles');
            const unsubscribe = onSnapshot(publicDocRef, (doc) => {
                setTitles(doc.data()?.titles || []);
                setStyles(doc.data()?.styles || []);
            });
            return () => unsubscribe(); // Cleanup on unmount
        }
    }, [currentUser]);
    const resetForm = () => {
        setTitle1('');
        setTitle2('');
        setFontSize1('16px');
        setFontSize2('16px');
        setFontStyle1('');
        setFontStyle2('');
        setFontColor1('#000000');
        setFontColor2('#000000');
    };
    const handleDelete = async (titleToDelete, index) => {
        const titleIndex = titles.indexOf(titleToDelete);
        if (titleIndex === -1) return; // Ensure the title exists in the list

        try {
            const userDocRef = doc(db, 'users', userId);
            const styleToDelete = styles[index]; // Use the passed index here

            await updateDoc(userDocRef, {
                titles: arrayRemove(titleToDelete),
                styles: arrayRemove(styleToDelete),
            });

            // Update local state
            setTitles((prev) => prev.filter((_, idx) => idx !== titleIndex));
            setStyles((prev) => prev.filter((_, idx) => idx !== index));
        } catch (error) {
            console.error('Error deleting title:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        if (!title1.trim() || !title2.trim()) {
            setError('Both titles are required.');
            return;
        }
    
        const newTitles = [title1, title2];
        const newStyles = [
            { fontSize: fontSize1, fontStyle: fontStyle1, fontColor: fontColor1 },
            { fontSize: fontSize2, fontStyle: fontStyle2, fontColor: fontColor2 },
        ];
    
        console.log("Submitting Titles:", newTitles, "Styles:", newStyles); // Debugging log
    
        try {
            if (currentUser) {
                console.log("Current User ID:", currentUser.uid); // Debugging log
                await saveTitlesToUser(newTitles, newStyles);
            } else {
                await saveTitlesToPublic(newTitles, newStyles);
            }
    
            // Update local state to include new titles and styles
            setTitles((prev) => [...prev, ...newTitles]);
            setStyles((prev) => [...prev, ...newStyles]);
    
            // Reset form after successful submission
            resetForm();
        } catch (err) {
            setError('Failed to save titles. Please try again later.');
            console.error('Error saving titles:', err);
        }
    };
    
    const saveTitlesToUser = async (newTitles, newStyles) => {
        try {
            if (!userId) {
                console.error('User ID is not defined when saving to user:', userId); // Debugging log
                return;
            }
    
            const userDocRef = doc(db, 'users', userId);
            await setDoc(userDocRef, {
                titles: arrayUnion(...newTitles),
                styles: arrayUnion(...newStyles),
            }, { merge: true });
            console.log("User titles saved successfully:", newTitles); // Debugging log
        } catch (error) {
            console.error('Error saving titles to Firebase:', error);
        }
    };
    
    const saveTitlesToPublic = async (newTitles, newStyles) => {
        try {
            const publicDocRef = doc(db, 'public', 'sharedTitles');
            await setDoc(publicDocRef, {
                titles: arrayUnion(...newTitles),
                styles: arrayUnion(...newStyles),
            }, { merge: true });
            console.log("Public titles saved successfully:", newTitles); // Debugging log
        } catch (error) {
            console.error('Error saving titles to public Firebase:', error);
        }
    };
    



    
    return (
        <div className="footer">
            <div className="footer-components-container">
                <button onClick={() => setIsOpen(!isOpen)} className="collapsible-button">
                    {isOpen ? "−" : "+"}
                </button>
                {isOpen && (
                    <form onSubmit={handleSubmit} className="title-input-form">
                        <input
                            type="text"
                            value={title1}
                            onChange={(e) => setTitle1(e.target.value)}
                            placeholder="Add your first title here"
                        />
                        <input
                            type="text"
                            value={title2}
                            onChange={(e) => setTitle2(e.target.value)}
                            placeholder="Add your second title here"
                        />
                        <button type="submit">Submit Titles</button>
                        {error && <p>{error}</p>}
                    </form>
                )}
                <div className="title-list">
                    {titles.map((title, index) => (
                        <div key={title} style={{
                            fontSize: styles[index]?.fontSize || '16px',
                            fontStyle: styles[index]?.fontStyle || 'normal',
                            color: styles[index]?.fontColor || '#000000',
                        }}>
                            {title}
                            <button onClick={() => handleDelete(title, index)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Footer;
