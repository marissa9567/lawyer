import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import ShopNavbar from "../components/Shopnav";
import SearchBar from '../components/Searchbarcomponent'; 
import ProductCard from '../components/Productcard';
import Pagination from '../components/Pagination';
import ProductModal from "../components/ProductModal";
import "../styles/Shophomepage.css";
import { useAuth } from '../Context/AuthContext';
import { useParams } from 'react-router-dom';

const ShopHomePage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [shopBgColor, setShopBgColor] = useState('#ffffff');
    const { currentUser } = useAuth();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false); // State for collapsible

    // Fetch products and background color
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productSnapshot = await getDocs(productsCollection);
                const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchBackgroundColor = async () => {
            try {
                const defaultDocRef = doc(db, 'defaultColors', 'shopColor');
                const defaultDoc = await getDoc(defaultDocRef);
                if (defaultDoc.exists()) {
                    const data = defaultDoc.data();
                    setShopBgColor(data.color || '#ffffff');
                }
            } catch (error) {
                console.error("Error fetching background color:", error);
            }
        };

        fetchProducts();
        fetchBackgroundColor();
    }, []);

    // Filter products based on category, search term, and price range
    const filteredProducts = products.filter(product => {
        const matchesCategory = category ? product.category === category : true;
        const matchesSearch = searchTerm 
            ? (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;

        const matchesPrice = (minPrice === '' || product.price >= Number(minPrice)) &&
                             (maxPrice === '' || product.price <= Number(maxPrice));

        return matchesCategory && matchesSearch && matchesPrice;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleColorChange = (newColor) => {
        setShopBgColor(newColor);
    };

    const handleSubmitColor = async () => {
        try {
            const defaultDocRef = doc(db, 'defaultColors', 'shopColor');
            await setDoc(defaultDocRef, { color: shopBgColor }, { merge: true });
            console.log(`Color saved to Firestore: ${shopBgColor}`);
            alert('Color saved successfully!');
        } catch (error) {
            console.error("Error saving background color to Firestore:", error);
            alert('Failed to save color. Please try again.');
        }
    };

    const togglePriceFilter = () => {
        setIsPriceFilterOpen(prev => !prev);
    };

    return (
        <div className="shop-container" style={{ backgroundColor: shopBgColor, minHeight: '120vh' }}>
            {currentUser && (
                <div className="color-picker-div">
                    <label className="color-button-label" htmlFor="colorPicker">Select Background Color:</label>
                    <input 
                        id="colorPicker"
                        type="color"
                        onChange={(e) => handleColorChange(e.target.value)}
                        value={shopBgColor}
                    />
                    <button className='color-changer-submit-button' onClick={handleSubmitColor}>Save Color</button>
                </div>
            )}
           
<div className="shop-searchbar">
    
    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
</div>
            <div className="collapsible-price-filter">
                <button className="toggle-button" onClick={togglePriceFilter}>
                    {isPriceFilterOpen ? 'Hide Price Filter' : 'Show Price Filter'}
                </button>
                {isPriceFilterOpen && (
                    <div className="price-filter">
                        <label className='minprice-label'>
                            Min Price:
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="0"
                                className="minprice-input"
                            />
                        </label>
                        <label className='maxprice-label'>
                            Max Price:
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="100"
                                className="maxprice-input"
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="shop-product-grid">
                {currentProducts.map(product => (
                    <div 
                        className="shop-product-cards" 
                        key={product.id} 
                        onClick={() => handleProductClick(product)}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className='shop-pagination'>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
           </div>
        </div>
    );
};

export default ShopHomePage;
