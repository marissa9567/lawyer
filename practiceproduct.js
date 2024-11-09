import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase'; // Ensure correct import of Firestore
import { collection, getDocs } from 'firebase/firestore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productDocs = await getDocs(productsCollection);
      const productsList = productDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      setFilteredProducts(productsList); // Initially set filtered products to all products
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search input
    const results = products.filter(product =>
      product.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchInput, products]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by category"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.imageUrl} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
