// src/pages/ShopHomePage.js
import { useEffect, useState } from "react";
import { db } from '../components/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ShopNavbar from "../components/Shopnav";
import DropdownShop from "../components/Dropdownshop";
import ProductCard from '../components/Productcard'; // Import the ProductCard component
import Pagination from '../components/Pagination'; // Import the Pagination component
import ProductModal from "../components/ProductModal"; // Import the ProductModal component

const ShopHomePage = ({ isLoggedIn, handleAddImage }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20; // Set the number of products per page
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productsCollection);
            const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
        };

        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="shop-container">
            <ShopNavbar />
            <DropdownShop />
            
            <div className="product-grid">
                {currentProducts.map(product => (
                    <div key={product.id} onClick={() => handleProductClick(product)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <ProductModal 
                    product={selectedProduct} 
                    onClose={() => setIsModalOpen(false)} 
                    onAddImage={handleAddImage} // Keep the image upload functionality
                    isLoggedIn={isLoggedIn}
                />
            )}

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage} // Update current page when clicked
            />
        </div>
    );
}

export default ShopHomePage;
