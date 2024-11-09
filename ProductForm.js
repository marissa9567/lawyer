import React, { useState } from 'react';
import { db, doc, updateDoc, getDoc, setDoc } from '../components/firebase'; // Import setDoc to create document if missing
import { arrayUnion } from 'firebase/firestore'; 
import { useAuth } from '../Context/AuthContext'; 

const ProductForm = ({ productId }) => {
  const { currentUser } = useAuth();
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const handleAddColor = async () => {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }
    
    if (currentUser) {
      try {
        const productRef = doc(db, 'products', productId);
        // Fetch the document snapshot using getDoc
        const docSnap = await getDoc(productRef); 
        if (!docSnap.exists()) {
          console.error('No such document! Creating a new one.');
          // Optionally, create the document if it doesn't exist
          await setDoc(productRef, { colors: [] }); // Initialize an empty colors array
        }
        // Update the document if it exists
        await updateDoc(productRef, {
          colors: arrayUnion(color), // Add color to the colors array in Firestore
        });
        setColor(''); // Clear the color input after adding color
      } catch (error) {
        console.error('Error adding color:', error);
      }
    } else {
      alert("Please log in to add colors.");
    }
  };

  const handleAddSize = async () => {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }
    
    if (currentUser) {
      try {
        const productRef = doc(db, 'products', productId);
        // Fetch the document snapshot using getDoc
        const docSnap = await getDoc(productRef);
        if (!docSnap.exists()) {
          console.error('No such document! Creating a new one.');
          // Optionally, create the document if it doesn't exist
          await setDoc(productRef, { sizes: [] }); // Initialize an empty sizes array
        }
        // Update the document if it exists
        await updateDoc(productRef, {
          sizes: arrayUnion(size), // Add size to the sizes array in Firestore
        });
        setSize(''); // Clear the size input after adding size
      } catch (error) {
        console.error('Error adding size:', error);
      }
    } else {
      alert("Please log in to add sizes.");
    }
  };

  return (
    <div>
      <h3>Add Color and Size</h3>
      <input
        type="text"
        placeholder="Add color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleAddColor}>Add Color</button>
      <input
        type="text"
        placeholder="Add size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <button onClick={handleAddSize}>Add Size</button>
    </div>
  );
};

export default ProductForm;
