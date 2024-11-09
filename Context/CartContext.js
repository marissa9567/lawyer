import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc } from '../components/firebase'; // Firebase imports
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext); // Access the CartContext
};

export const useCart = () => {
  const { cart, addToCart, removeFromCart } = useCartContext();
  return { cart, addToCart, removeFromCart }; // Return state and actions for use in other components
};

export const CartProvider = ({ children }) => {
  const userId = 'user123'; // Example user ID, use actual user context or auth
  const [cart, setCart] = useState([]); // Default as empty array
  const [loading, setLoading] = useState(true);

  // Ensure all items in cart have a UUID (for consistency)
  const ensureUuidForCartItems = (cartItems) => {
    return cartItems.map((item) => ({
      ...item,
      uuid: item.uuid || uuidv4(), // Assign UUID if missing
    }));
  };

  // Calculate total amount considering item quantity
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0); 
  };

  // Load cart from localStorage or Firebase when component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart && savedCart.length > 0) {
      const cartWithUuids = ensureUuidForCartItems(savedCart);
      setCart(cartWithUuids); // Load from localStorage
      setLoading(false); // Mark as loaded
    } else {
      loadCartFromFirebase(); // If no saved cart, load from Firebase
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart && cart.length > 0) {
      const cartWithUuids = ensureUuidForCartItems(cart); // Ensure all items have a UUID
      localStorage.setItem('cart', JSON.stringify(cartWithUuids)); // Save updated cart to localStorage
    }
  }, [cart]);

  const addToCart = (product, selectedColor, selectedSize) => {
    const cartItem = {
      uuid: uuidv4(),  // Generate a unique UUID for each item
      id: product.id,  // Product ID
      name: product.name,  // Product name
      price: product.price,  // Product price
      selectedColor,  // Store the selected color
      selectedSize,  // Store the selected size
      imageUrl: product.imageUrl,  // Product image URL
      quantity: 1, // Initialize quantity
    };

    const existingItem = cart.find(
      (item) =>
        item.id === cartItem.id &&
        item.selectedColor === cartItem.selectedColor &&
        item.selectedSize === cartItem.selectedSize
    );

    if (existingItem) {
      // If item exists, update quantity
      setCart(
        cart.map((item) =>
          item.id === cartItem.id &&
          item.selectedColor === cartItem.selectedColor &&
          item.selectedSize === cartItem.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add the new item if it's not in the cart
      setCart((prevCart) => [...prevCart, cartItem]);
    }
  };

  const saveCartToFirebase = async (updatedCart) => {
    try {
      const cartRef = doc(db, 'carts', userId); // Reference to the cart document in Firestore

      // Get current cart data
      const cartSnapshot = await getDoc(cartRef);
      let cartData = [];

      if (cartSnapshot.exists()) {
        cartData = cartSnapshot.data().items;  // Get existing items
      }

      // Merge the new cart item with existing cart items
      const mergedCart = [...cartData, ...updatedCart.filter(item => !cartData.some(existingItem => existingItem.id === item.id))];

      // Save the merged cart to Firebase
      await setDoc(cartRef, { items: mergedCart });
      console.log('Cart saved to Firebase:', mergedCart);
    } catch (error) {
      console.error('Error saving cart to Firebase:', error);
    }
  };

  const loadCartFromFirebase = async () => {
    try {
      const cartRef = doc(db, 'carts', userId); // Reference to the cart document in Firestore
      const cartSnapshot = await getDoc(cartRef);

      if (cartSnapshot.exists()) {
        let cartData = cartSnapshot.data().items;
        cartData = ensureUuidForCartItems(cartData); // Ensure all items have a UUID
        setCart(cartData); // Update state with data from Firebase
        console.log('Loaded cart from Firebase:', cartData);
      } else {
        console.log('No cart data found for this user.');
        setCart([]); // Set to empty array if no data found
      }
      setLoading(false); // Mark as loaded after fetching from Firebase
    } catch (error) {
      console.error('Error loading cart from Firebase:', error);
      setLoading(false); // Ensure loading state is updated even if an error occurs
    }
  };

  const removeFromCart = async (productId, selectedColor, selectedSize) => {
    const updatedCart = cart.filter(
      (product) =>
        product.id !== productId ||
        product.selectedColor !== selectedColor ||
        product.selectedSize !== selectedSize
    );
    console.log('Removing item from cart:', productId);
    setCart(updatedCart); // Update local state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
    await saveCartToFirebase(updatedCart); // Save updated cart to Firebase
  };

  const removeItem = (uuid) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.uuid !== uuid);
      // Update localStorage or any persistent state
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  return (
    <CartContext.Provider value={{ cart, removeItem, calculateTotalAmount, addToCart, removeFromCart, loadCartFromFirebase, loading }}>
      {children}
    </CartContext.Provider>
  );
};
