import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString } from 'firebase/storage';
import ProductCard from '../components/Productcard';
import '../styles/Edit.css';
import { useAuth } from '../Context/AuthContext'; 
import AddProduct from '../components/AddProduct';

const Edit = () => {
    const { currentUser } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorInfoInput, setAuthorInfoInput] = useState('');
    const [authorImage, setAuthorImage] = useState(null);
    const authorDocId = "yourAuthorDocId"; // Replace with your actual document ID
    const storage = getStorage();

    useEffect(() => {
        fetchProducts();
        fetchAuthorInfo();
    }, []);

    const fetchProducts = async () => {
        try {
            const productsCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productsCollection);
            const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAuthorInfo = async () => {
        try {
            const authorDocRef = doc(db, 'authorInfo', authorDocId);
            const authorDoc = await getDoc(authorDocRef);
            if (authorDoc.exists()) {
                const data = authorDoc.data();
                setAuthorInfoInput(data.info);
                setAuthorImage(data.imageUrl || null);
            }
        } catch (error) {
            console.error('Error fetching author info:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, 'products', id));
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleAuthorInfoSubmit = async (e) => {
        e.preventDefault();
        const authorDocRef = doc(db, 'authorInfo', authorDocId);
        try {
            let updates = { info: authorInfoInput };
            if (authorImage) {
                const imageUrl = await uploadImage(authorImage);
                updates.imageUrl = imageUrl;
            }
            await setDoc(authorDocRef, updates, { merge: true });
            alert('Author info updated successfully!');
        } catch (error) {
            console.error('Error updating author info:', error);
        }
    };

    const uploadImage = async (image) => {
        const storageRef = ref(storage, `authorImages/${Date.now()}-${image.name}`);
        await uploadString(storageRef, image, 'data_url');
        return await storageRef.getDownloadURL();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAuthorImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-shop-container">
            <h1>Edit Shop</h1>
            {currentUser ? <h2>Welcome, {currentUser.email}</h2> : <p>Please log in to view your dashboard.</p>}

            <h2>Products</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : products.length > 0 ? (
                <div className="product-list-edit">
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            product={product} 
                            onDelete={() => handleDeleteProduct(product.id)} 
                            isEditable={true}
                        />
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}

            <AddProduct />
        </div>
    );
};

export default Edit;
