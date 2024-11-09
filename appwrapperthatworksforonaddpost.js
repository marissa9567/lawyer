import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import About from '../components/About';
import Contactus from '../components/Contactus';
import Messagelist from '../components/Messagelist';
import AddPost from '../components/AddPost';
import Colorpicker from '../components/Colorpicker';
import ShopHomePage from '../pages/Shophomepage';
import Cart from '../components/Cart';
import Login from '../components/Login';
import CheckoutForm from '../components/Checkoutform';
import Edit from '../components/Edit';
import Register from '../components/Register';
import UserDashboard from '../components/Userdashboard';
import Tracking from '../components/Tracking';
import OrderTracking from '../components/Ordertracking';
import ProtectedRoute from '../components/Protectedroute';
import Termsandprivacy from '../components/Termsandprivacy';
import DisplayImage from '../components/Displayimage';
import ProductModal from '../components/ProductModal';
import ItemComponent from '../components/Itemcomponent';
import Sidedrawer from '../components/Sidedrawer';
import Todo from '../components/Todo';
import Usecomments from '../components/Usecomments';
import Collapsiblecommentform from '../components/Collapsiblecommentform';
import Messageform from '../components/Messageform';
import Displaymessage from '../components/Displaymessage';

import { db } from '../components/firebase'; // Adjust this path if necessary
import { collection, addDoc, getDocs } from 'firebase/firestore';

import BlogCard from '../components/Blogcard';
import BlogModal from '../components/Blogmodal';

import Posts from '../components/Posts';
import Postform from '../components/Postform';
import Comments from '../components/Comments';
import Postlist from '../components/Postlist';
import Rightdrawer from '../components/Rightdrawer';
import { 
    fetchPosts, 
    deletePostFromFirestore,
} from '../components/firestore';

const AppWrapper = () => {
    const { currentUser } = useAuth();
    const isLoggedIn = !!currentUser;
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpenRight, setIsDrawerOpenRight] = useState(false);
    const addPost = async (newPost) => {
        console.log("Adding post:", newPost);
        try {
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            console.log("Post written with ID: ", docRef.id);
            setPosts((prevPosts) => [...prevPosts, { id: docRef.id, ...newPost }]);
        } catch (error) {
            console.error("Error adding post to Firestore:", error);
        }
    };
    // Ensure you are logging onAddPost
    console.log("onAddPost prop:", addPost); // Log the addPost function
    

    useEffect(() => {
        const fetchPostsData = async () => {
            setLoading(true);
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostsData();
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(prevState => !prevState);
    };

    const toggleRightDrawer = () => {
        setIsDrawerOpenRight(prevState => !prevState);
    };

    const deletePost = async (postId) => {
        try {
            await deletePostFromFirestore(postId);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {currentUser && (
                <>
                    <button onClick={toggleDrawer}>Toggle Drawer</button>
                    <button onClick={toggleRightDrawer}>Toggle Right Drawer</button>
                </>
            )}
            <Router>
                <Navbar />
                {currentUser && <Sidedrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />}
                {currentUser && <Rightdrawer isOpened={isDrawerOpenRight} onClosed={toggleRightDrawer} />}
                <Routes>
             
           
                    <Route path="/termsandprivacy" element={<Termsandprivacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blogmodal" element={<BlogModal />} />
                    <Route path="/rightdrawer" element={<Rightdrawer />} />
                    <Route path="/postlist" element={<Postlist />} />
                    <Route path="/blogcard" element={<BlogCard />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/postform" element={<Postform />} />
                    <Route path="/comments" element={<Comments />} />
                    <Route path="/contactus" element={<Contactus />} />
                    
    
                    <Route path="/" element={<Home posts={posts} />} />
                    <Route path="/addpost" element={<AddPost onAddPost={addPost} />} />

                    <Route path="/messagelist" element={<Messagelist />} />
                    <Route path="/addpost" element={<AddPost onAddPost={AddPost} />} />
                    <Route path="/colorpicker" element={<Colorpicker />} />
                    <Route path="/shophomepage" element={<ShopHomePage />} />
                    <Route path="/cart" element={<Cart />} />
               
                    <Route path="/collapsiblecommentform" element={<Collapsiblecommentform />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/itemcomponent" element={<ItemComponent />} />
                    <Route path="/checkoutform" element={<CheckoutForm />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />} />
                    <Route path="/track" element={<Tracking />} />
                    <Route path="/messageform" element={<Messageform />} />
                    <Route path="/displayimage" element={<DisplayImage />} />
                    <Route path="/usecomments" element={<Usecomments />} />
                    <Route path="/displaymessage" element={<Displaymessage />} />
                    <Route path="/productmodule" element={<ProductModal />} />
                    <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default AppWrapper;
