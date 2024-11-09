import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import ProductCard from '../components/Productcard';
import '../styles/Edit.css';
import { useNavigate } from 'react-router-dom';
import Shopnavbar from "../components/Shopnav";
import Dropdownshop from "../components/Dropdownshop";
import AddProduct from "../components/AddProduct";
import { useAuth } from '../Context/AuthContext'; // Import your AuthContext
console.log('Rendering EditShop');
const EditShop = () => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useAuth(); // Use your Auth context to check if logged in
  const navigate = useNavigate();
  // Fetch products from Firestore
  const fetchProducts = async () => {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
  };

  // Ensure useEffect is called unconditionally
  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);
  
  if (!isLoggedIn) {
    navigate('/loginpage'); // Redirect to login page
    return null; // Return null to prevent further rendering
  }

  // Handle deleting a product
  const handleDeleteProduct = async (id, imagePath) => {
    try {
      // Delete the product document from Firestore
      await deleteDoc(doc(db, 'products', id));

      // Delete the image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);

      // Refetch products to ensure UI is in sync
      fetchProducts(); // Refetch products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="edit-shop-container">
      <Shopnavbar />
      <Dropdownshop />
      <h1>Edit Shop</h1>
      <div className="product-list-edit">
        {products.map(product => (
          <div key={product.id}>
            <ProductCard 
              product={product} 
              onDelete={() => handleDeleteProduct(product.id, product.imagePath)} 
              isEditable={true} // Pass true since this is the edit page
            />
          </div>
        ))}
      </div>
      <AddProduct />
    </div>
  );
};

export default EditShop;
