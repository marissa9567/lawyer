import React, { useState, useEffect } from 'react';
import { db, doc, updateDoc } from '../components/firebase';
import { arrayUnion } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';

const SizeAndColorSelection = ({
  productId,
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange
}) => {
  const { currentUser } = useAuth();
  const [color, setColor] = useState(selectedColor || ''); // Set default to selectedColor from parent
  const [size, setSize] = useState(selectedSize || ''); // Set default to selectedSize from parent
  const [colorAdded, setColorAdded] = useState(false); // Track if color has been added
  const [sizeAdded, setSizeAdded] = useState(false); // Track if size has been added

  // Handle adding color to Firestore
  const handleAddColor = async () => {
    if (!productId || !color) {
      console.error('Product ID or Color is undefined');
      return;
    }

    if (currentUser) {
      try {
        const productRef = doc(db, 'products', productId); // Reference the product document
        await updateDoc(productRef, {
          colors: arrayUnion(color) // Add color to the colors array in Firestore
        });
        setColorAdded(true); // Set colorAdded to true after successful addition
        setColor(''); // Clear the color input after adding color
      } catch (error) {
        console.error('Error adding color:', error);
      }
    } else {
      alert('Please log in to add colors.');
    }
  };

  // Handle adding size to Firestore
  const handleAddSize = async () => {
    if (!productId || !size) {
      console.error('Product ID or Size is undefined');
      return;
    }

    if (currentUser) {
      try {
        const productRef = doc(db, 'products', productId); // Reference the product document
        await updateDoc(productRef, {
          sizes: arrayUnion(size) // Add size to the sizes array in Firestore
        });
        setSizeAdded(true); // Set sizeAdded to true after successful addition
        setSize(''); // Clear the size input after adding size
      } catch (error) {
        console.error('Error adding size:', error);
      }
    } else {
      alert('Please log in to add sizes.');
    }
  };

  // Reset added states after a timeout (for user experience)
  useEffect(() => {
    if (colorAdded || sizeAdded) {
      setTimeout(() => {
        setColorAdded(false);
        setSizeAdded(false);
      }, 2000); // Reset after 2 seconds
    }
  }, [colorAdded, sizeAdded]);

  return (
    <div>
      {/* Color Selection */}
      <div>
        <label htmlFor="color">Color: </label>
        <select
          id="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)} // Propagate color change to parent
        >
          <option value="">Select Color</option>
          {colors?.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
        <button onClick={handleAddColor}>
          {colorAdded ? 'Color Added' : 'Add Color'}
        </button>
      </div>

      {/* Size Selection */}
      <div>
        <label htmlFor="size">Size: </label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value)} // Propagate size change to parent
        >
          <option value="">Select Size</option>
          {sizes?.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button onClick={handleAddSize}>
          {sizeAdded ? 'Size Added' : 'Add Size'}
        </button>
      </div>
    </div>
  );
};

export default SizeAndColorSelection;
