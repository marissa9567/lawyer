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
import EditPost from '../components/Editpost';
import { deletePostFromFirestore, fetchPostsFromFirestore } from '../components/firestore'; // Adjust the path as necessary
import FAQ from "../components/FAQ";
import { db } from '../components/firebase'; // Adjust this path if necessary
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Shopquestions from "../components/Shopquestions";
import Backendquestions from "../components/Backendquestions";
import Contactmessages from "../components/Contactmessages";
import Stripequestions from "../components/Stripequestions";
import Aboutquestions from "../components/Aboutquestions";
import Cartquestions from "../components/Cartquestions";
import Termsandprivacyquestions from "../components/Termsandprivacyquestions"
import Sidedrawerquestions from "../components/Sidedrawerquestions"
import BlogCard from '../components/Blogcard';
import BlogModal from '../components/Blogmodal';
import "../styles/App.css";
import Posts from '../components/Posts';
import Postform from '../components/Postform';
import Comments from '../components/Comments';
import Postlist from '../components/Postlist';
import Rightdrawer from '../components/Rightdrawer';
import Footerquestions from '../components/Footerquestions';
import Drawercontent from "../components/Drawercontent";
import ColorManagement from '../components/ColorManagement';
import CartProvider from '../Context/CartContext';
import ProductCard from '../components/Productcard';
import Imageslider from "../components/Imageslider";
import Productmoduleimageuploader from './Productmoduleimageuploader';
const AppWrapper = () => {
    const { currentUser } = useAuth();
    const isLoggedIn = !!currentUser;
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerOpenRight, setIsDrawerOpenRight] = useState(false);
    const [titles, setTitles] = useState([]);
    const [styles, setStyles] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState({
        id: '1',
        name: 'Sample Product',
        title: 'Amazing Product',
        description: 'This is a sample description',
        price: 100,
        imageUrl: 'path/to/image.jpg',
        colors: ['Red', 'Blue'],
        sizes: ['S', 'M', 'L'],
        images: [],
      });
    const addPost = async (postData) => {
        try {
          await addDoc(collection(db, 'posts'), postData);
          console.log('Post added successfully');
        } catch (error) {
          console.error('Error adding post to Firestore:', error);
        }
      };
    const loadPosts = async () => {
        try {
            const fetchedPosts = await fetchPostsFromFirestore(); // Ensure this matches the function name
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
       // Function to handle adding a product to the cart

    const handleDeletePost = async (postId) => {
        console.log("Delete function called for post ID:", postId); // Log when delete is initiated
        try {
            console.log("Attempting to delete post with ID:", postId); // Log the postId
            await deletePostFromFirestore(postId);
            console.log(`Post with ID ${postId} deleted from Firestore successfully.`); // Confirm deletion
            setPosts(posts.filter(post => post.id !== postId)); // Update local state
        } catch (error) {
            console.error("Error deleting post:", error); // Log any errors
        }
    };
    

    useEffect(() => {
        loadPosts(); // Fetch posts on component mount
    }, []);
    useEffect(() => {
        const fetchPostsData = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'posts'));
                const postsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postsArray);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostsData();
    }, []);

    const toggleLeftDrawer = () => {
        setIsDrawerOpen(prevState => !prevState);
    };

    const toggleRightDrawer = () => {
        setIsDrawerOpenRight(prevState => !prevState);
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    const handleAddTitle = (newTitle, newStyle) => {
        // Ensure the title and style are defined before updating the state
        if (newTitle && newStyle) {
            setTitles([...titles, newTitle]);
            setStyles([...styles, newStyle]);
        }
    };

    const handleDeleteAll = () => {
        setTitles([]); // Clear all titles
        setStyles([]); // Clear all styles associated with the titles
    };

     // Function to handle adding a product to the cart
     const handleAddToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
        console.log('Added to cart:', product);
        alert('Product added to cart!');
    };


      const handleDelete = (productId) => {
        console.log('Deleted product with id:', productId);
      };
    
      const handleAddImage = (newImageUrl) => {
        console.log('New image added:', newImageUrl);
      };
    const handleRemoveFromCart = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };
      const deletePost = async (postId) => {
        try {
          await deletePostFromFirestore(postId); // Call your delete function
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // Update state
          console.log(`Post with ID ${postId} deleted successfully.`);
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      };
    return (
        <div>
 <div>
    
    </div>

     
                <>
                    {currentUser && (<button className="toggle-left-drawer" onClick={toggleLeftDrawer}> &lt;</button>)}
                   
                </>
            
            <Router>
                <Navbar />
                {currentUser && <Sidedrawer isOpen={isDrawerOpen} onClose={toggleLeftDrawer} />}
               
                <Routes>
                    <Route path="/editpost" element={<EditPost />} />
                    <Route path="/termsandprivacy" element={<Termsandprivacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/productmoduleimageuploader" element={<Productmoduleimageuploader />} />
                    <Route path="/drawercontent" element={<Drawercontent />} />
                    <Route path="/blogmodal" element={<BlogModal />} />
                    <Route path="/rightdrawer" element={<Rightdrawer />} />
                    <Route path="/postlist" element={<Postlist />} />
                    <Route path="/blogcard" element={<BlogCard />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/imageslider" element={<Imageslider />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/shopquestions" element={<Shopquestions />} />
                    <Route path="/backendquestions" element={<Backendquestions />} />
                    <Route path="/footerquestions" element={<Footerquestions />} />
                    <Route path="/contactmessages" element={<Contactmessages />} />
                    <Route path="/stripequestions" element={<Stripequestions />} />
                    <Route path="/aboutquestions" element={<Aboutquestions />} />
                    <Route path="/cartquestions" element={<Cartquestions />} />
                    <Route path="/termsandprivacyquestions" element={<Termsandprivacyquestions />} />
                    <Route path="/sidedrawerquestions" element={<Sidedrawerquestions />} />
                    <Route path="/postform" element={<Postform />} />
                    <Route path="/comments" element={<Comments />} />
                    <Route path="/contactus" element={<Contactus />} />
                    <Route path="/" element={<Home posts={posts} onDeletePost={handleDeletePost} />} />
                    <Route path="/addpost" element={<AddPost addPost={addPost} />} />
                    <Route path="/messagelist" element={<Messagelist />} />
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
                    <Route path="/productmodal" element={<ProductModal />} />
                    <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                </Routes>
           

            </Router>
        </div>
    );
};

export default AppWrapper;
