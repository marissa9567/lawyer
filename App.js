import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { AuthorProvider } from './Context/AuthorContext';
import { ColorProvider } from './Context/ColorContext';
import { ArticleProvider } from './Context/ArticleContext'; // Import your ArticleProvider
import ErrorBoundary from './components/ErrorBoundary'; 
import AppWrapper from './components/Appwrapper';
import { auth, db } from './components/firebase'; 
import { collection, onSnapshot } from 'firebase/firestore'; 
import { ImageProvider } from './Context/ImageContext';

const stripePromise = loadStripe('YOUR_STRIPE_KEY');

function App() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [username, setUsername] = useState('');

    // Fetch posts (same as before)

    // Authentication state listener (same as before)

    return (
        <Elements stripe={stripePromise}>
            <ArticleProvider> {/* Ensure ArticleProvider wraps all other providers */}
                <AuthProvider>
                    <CartProvider>
                        <AuthorProvider>
                            <ColorProvider>
                                <ErrorBoundary>
                                    <ImageProvider>
                                    <AppWrapper loading={loadingPosts} isLoggedIn={isLoggedIn} posts={posts} />
                                    </ImageProvider>
                                </ErrorBoundary>
                            </ColorProvider>
                        </AuthorProvider>
                    </CartProvider>
                </AuthProvider>
            </ArticleProvider>
        </Elements>
    );
}

export default App;
