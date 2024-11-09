import React, { useEffect, useState } from 'react';
import { db, storage } from '../components/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc,getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useColor } from '../Context/ColorContext'; 
import '../styles/Home.css';
import Stars from '../images/stars.jpg'; 
import yellowdots from '../images/yellowdots.jpg'; 
import coloreddots from '../images/coloreddots.jpg'; 
import flag from '../images/flag.jpg'; 
import greenlight from '../images/greenlight.png'; 
import hobbies from '../images/hobbies.jpg'; 
import mountain from '../images/mountain.jpg'; 
import night from '../images/night.jpg'; 
import political from '../images/political.jpg'; 
import political1 from '../images/political1.jpg'; 
import redtexture from '../images/redtexture.png'; 
import retro from '../images/retrobackground.jpg'; 
import rights from '../images/rights.jpg'; 
import wisemen from '../images/wisemen.jpg'; 
import wood from '../images/wood.jpg';

const backgroundPatterns = [
    { value: 'none', label: 'None' },
    { value: 'yellowdots', label: 'Yellow Dots', image: yellowdots },
    { value: 'stars', label: 'Stars', image: Stars },
    { value: 'coloreddots', label: 'Colored Dots', image: coloreddots },
    { value: 'flag', label: 'Flag', image: flag },
    { value: 'greenlight', label: 'Green Light', image: greenlight },
    { value: 'hobbies', label: 'Hobbies', image: hobbies },
    { value: 'mountain', label: 'Mountain', image: mountain },
    { value: 'night', label: 'Night', image: night },
    { value: 'political', label: 'Political', image: political },
    { value: 'political1', label: 'Political 1', image: political1 },
    { value: 'redtexture', label: 'Red Texture', image: redtexture },
    { value: 'retro', label: 'Retro', image: retro },
    { value: 'rights', label: 'Rights', image: rights },
    { value: 'wisemen', label: 'Wisemen', image: wisemen },
    { value: 'wood', label: 'Wood', image: wood },
];

const getBackgroundImage = (pattern) => {
    const patternMap = {
        yellowdots,
        stars: Stars,
        coloreddots,
        flag,
        greenlight,
        hobbies,
        mountain,
        night,
        political,
        political1,
        redtexture,
        retro,
        rights,
        wisemen,
        wood,
    };
    
    return patternMap[pattern] || null;
};

const EditPostForm = ({ editFormData, onChange, onSubmit, onImageChange }) => (
    <form onSubmit={onSubmit}>
        <label>
            Title: <input type="text" name="title" value={editFormData.title} onChange={onChange} />
        </label>
        <label>
            Content: <textarea name="content" value={editFormData.content} onChange={onChange}></textarea>
        </label>
        <label>
            Upload Image: <input type="file" onChange={onImageChange} />
        </label>
        <label>
            Image URL: <input type="text" name="imageUrl" value={editFormData.imageUrl} onChange={onChange} />
        </label>
        <label>
            Article URL: <input type="text" name="articleUrl" value={editFormData.articleUrl} onChange={onChange} />
        </label>
        <label>
            Title Font Color: <input type="color" name="titleFontColor" value={editFormData.titleFontColor} onChange={onChange} />
        </label>
        <label>
            Title Font Style: 
            <select name="titleFontStyle" value={editFormData.titleFontStyle} onChange={onChange}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="bold">Bold</option>
            </select>
        </label>
        <label>
            Title Font Size: <input type="number" name="titleFontSize" value={editFormData.titleFontSize} onChange={onChange} />
        </label>
        <label>
            Content Font Color: <input type="color" name="contentFontColor" value={editFormData.contentFontColor} onChange={onChange} />
        </label>
        <label>
            Content Font Style: 
            <select name="contentFontStyle" value={editFormData.contentFontStyle} onChange={onChange}>
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="bold">Bold</option>
            </select>
        </label>
        <label>
            Content Font Size: <input type="number" name="contentFontSize" value={editFormData.contentFontSize} onChange={onChange} />
        </label>
        <label>
            Background Pattern:
            <select name="backgroundPattern" value={editFormData.backgroundPattern} onChange={onChange}>
                {backgroundPatterns.map((pattern) => (
                    <option key={pattern.value} value={pattern.value}>{pattern.label}</option>
                ))}
            </select>
        </label>
        <label>
            Border Color: <input type="color" name="borderColor" value={editFormData.borderColor} onChange={onChange} />
        </label>
        <label>
            Border Style: 
            <select name="borderStyle" value={editFormData.borderStyle} onChange={onChange}>
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
            </select>
        </label>
        <label>
            Border Width: <input type="number" name="borderWidth" value={editFormData.borderWidth} onChange={onChange} />
        </label>
        <button type="submit">Save</button>
    </form>
);

const HomePage = () => {
    const { shopBgColor } = useColor();
    const [posts, setPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        articleUrl: '',
        titleFontColor: '#000000',
        titleFontStyle: 'normal',
        titleFontSize: '16',
        contentFontColor: '#000000',
        contentFontStyle: 'normal',
        contentFontSize: '16',
        category: '',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: '1',
        backgroundPattern: 'none',
        imagePreview: null,
    });
    const [newComment, setNewComment] = useState({ name: '', text: '' });
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [readMorePostId, setReadMorePostId] = useState(null);
    const [reply, setReply] = useState({ name: '', text: '' });
    const [replyingTo, setReplyingTo] = useState(null);
    const [commentsDisabled, setCommentsDisabled] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: '',
    });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(postsData);
            updateCategories(postsData);
        });

        return () => unsubscribe();
    }, []);

    const updateCategories = (postsData) => {
        const allCategories = new Set(postsData.map(post => post.category).filter(Boolean));
        setCategories(Array.from(allCategories));
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredPosts = selectedCategory
        ? posts.filter(post => post.category === selectedCategory)
        : [];

    const handleEditPostClick = (post) => {
        setEditPostId(post.id);
        setEditFormData({ ...post, imagePreview: post.imageUrl });
    };

    const handleChange = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const toggleComments = () => {
        setCommentsDisabled(prevState => {
            const newState = !prevState;
            if (newState) {
                alert("Comments are disabled.");
            }
            return newState;
        });
    };

    const PostPreview = ({ formData }) => {
        const backgroundImage = getBackgroundImage(formData.backgroundPattern);
        return (
            <div className="post-preview" style={{ backgroundImage: `url(${backgroundImage})`, border: `${formData.borderWidth}px ${formData.borderStyle} ${formData.borderColor}` }}>
                <h2 style={{ color: formData.titleFontColor, fontSize: `${formData.titleFontSize}px`, fontStyle: formData.titleFontStyle }}>
                    {formData.title}
                </h2>
                <p style={{ color: formData.contentFontColor, fontSize: `${formData.contentFontSize}px`, fontStyle: formData.contentFontStyle }}>
                    {formData.content}
                </p>
                {formData.imageUrl && <img src={formData.imageUrl} alt="Post" />}
            </div>
        );
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setEditFormData({ ...editFormData, imageUrl: url });
        }
    };
    const handleCommentChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    const handleReplyChange = (e) => {
        setReply({ ...reply, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editPostId) {
            await setDoc(doc(db, 'posts', editPostId), editFormData);
        } else {
            await setDoc(doc(db, 'posts', Date.now().toString()), editFormData);
        }
        setEditPostId(null);
        setEditFormData({
            title: '',
            content: '',
            imageUrl: '',
            articleUrl: '',
            titleFontColor: '#000000',
            titleFontStyle: 'normal',
            titleFontSize: '16',
            contentFontColor: '#000000',
            contentFontStyle: 'normal',
            contentFontSize: '16',
            category: '',
            borderColor: '#000000',
            borderStyle: 'solid',
            borderWidth: '1',
            backgroundPattern: 'none',
            imagePreview: null,
        });
    };

    const handleDeletePost = async (postId) => {
        await deleteDoc(doc(db, 'posts', postId));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCommentSubmit = async (postId) => {
        const commentData = { ...newComment, postId, id: Date.now().toString() };
        const postRef = doc(db, 'posts', postId);
        await setDoc(postRef, { comments: [commentData] }, { merge: true });
        setNewComment({ name: '', text: '' }); // Reset new comment input
      };
      
      
      const handleReplySubmit = async (commentId, postId) => {
        const replyData = { ...reply, id: Date.now().toString() };
        const postRef = doc(db, 'posts', postId);
    
        // Fetch the existing post data
        const postSnapshot = await getDoc(postRef);
        if (postSnapshot.exists()) {
            const postData = postSnapshot.data();
    
            // Prepare the new replies array
            const existingReplies = postData.comments[commentId]?.replies || {};
            const updatedReplies = {
                ...existingReplies,
                [replyData.id]: replyData,
            };
    
            // Update the comment with the new reply
            await setDoc(postRef, {
                [`comments.${commentId}.replies`]: updatedReplies,
            }, { merge: true });
    
            setReply({ name: '', text: '' }); // Clear reply input
        } else {
            console.error("Post does not exist.");
        }
    };
    

    return (
        <div style={{ backgroundColor: shopBgColor }} className="home-page">
            <h1>My Blog</h1>
            <ul>
                {categories.map((category, index) => (
                    <li 
                        key={index} 
                        onClick={() => handleCategoryClick(category)} 
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        {category}
                    </li>
                ))}
            </ul>
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit}>
                {/* New post form fields */}
                <button type="submit">Submit Post</button>
            </form>
            <input type="text" placeholder="Search posts..." value={searchTerm} onChange={handleSearchChange} />
            <div>
                {posts.filter(post => post.title.includes(searchTerm)).map(post => (
                    <div key={post.id}>
                        <PostPreview formData={post} />
                        <button onClick={() => handleEditPostClick(post)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        <button onClick={toggleComments}>{commentsDisabled ? "Enable Comments" : "Disable Comments"}</button>
                        <h3>Comments</h3>
                        {post.comments && post.comments.map(comment => (
                            <div key={comment.id}>
                                <strong>{comment.name}</strong>: {comment.text}
                                <h4>Replies</h4>
                                {comment.replies && Object.values(comment.replies).map(reply => (
                                    <div key={reply.id} style={{ marginLeft: '20px' }}>
                                        <strong>{reply.name}</strong>: {reply.text}
                                    </div>
                                ))}
                               <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Your name" 
                                    onChange={handleReplyChange} 
                                    value={reply.name} 
                                />
                                <input 
                                    type="text" 
                                    name="text" 
                                    placeholder="Your reply" 
                                    onChange={handleReplyChange} 
                                    value={reply.text} 
                                />
                                <button onClick={() => handleReplySubmit(comment.id, post.id)}>Reply</button>
                            </div>
                        ))}
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your name" 
                            onChange={handleCommentChange} 
                            value={newComment.name} 
                        />
                        <input 
                            type="text" 
                            name="text" 
                            placeholder="Your comment" 
                            onChange={handleCommentChange} 
                            value={newComment.text} 
                        />
                        <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                    </div>
                ))}
            </div>
            {editPostId && (
                <EditPostForm 
                    editFormData={editFormData} 
                    onChange={handleEditChange} 
                    onSubmit={handleSubmit} 
                    onImageChange={handleImageChange} 
                />
            )}
        </div>
    );
};

export default HomePage;
/*comments work*/