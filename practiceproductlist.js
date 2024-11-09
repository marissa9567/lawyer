import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ProductCard from '../components/Productcard';
import ProductModal from '../components/ProductModal';
import { useAuth } from '../Context/AuthContext';
import '../styles/ProductList.css';

const ProductList = () => {
    const { currentUser } = useAuth();
    const isLoggedIn = !!currentUser;

    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(100);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Fetched Products:', productsList);
            setProducts(productsList);
            setFilteredProducts(productsList);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const results = products.filter((prod) => {
            const isCategoryMatch = prod.category && new RegExp(searchInput, 'i').test(prod.category);
            const isPriceMatch = prod.price <= maxPrice;
            return isCategoryMatch && isPriceMatch;
        });
        setFilteredProducts(results);
    }, [searchInput, products, maxPrice]);

    const handleAddImage = (file) => {
        console.log('Image added:', file);
        setImages((prevImages) => [...prevImages, file]);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedProduct(null);
        setImages([]);
    };

    const handleDeleteProduct = async (id, imagePath) => {
        if (!id) {
            console.error('Product ID is undefined. Cannot delete product.');
            return;
        }
    
        try {
            console.log(`Attempting to delete product with ID: ${id} and imagePath: ${imagePath}`);
            await deleteDoc(doc(db, 'products', id));
            console.log(`Product with ID: ${id} deleted from Firestore`);
            // Additional image deletion logic...
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
      
      
    const handleDeleteImage = (imageToDelete) => {
        setImages((prevImages) => prevImages.filter(image => image !== imageToDelete));
    };

    return (
        <div className="wholeaddinproductdisplay">
            <button onClick={() => setModalOpen(true)}>Add Product Image</button>
            {isModalOpen && selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={handleClose}
                    onAddImage={handleAddImage}
                    onDeleteImage={handleDeleteImage}
                    isLoggedIn={isLoggedIn}
                    isOnEditShopPage={true} // Pass true if on EditShop page
                />

                
            )}
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Search by category"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="search-input"
                    />
                    <div>
                        <label htmlFor="priceRange">Max Price: ${maxPrice}</label>
                        <input
                            type="range"
                            id="priceRange"
                            min="0"
                            max="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                    </div>
                    <div className="product-list">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div className="product-card" key={product.id}>
                                    <ProductCard
                                        product={product}
                                        onDelete={() => handleDeleteProduct(product.id, product.imagePath)} 
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setModalOpen(true);
                                            setImages([]);
                                        }}



/>

                                    
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
