import { db, storage } from '../components/firebase'; // Adjust the import path as needed



import {
    collection,
    addDoc,
    deleteDoc,
    getDocs,
    getDoc,
    doc,
    setDoc,
    onSnapshot,
    arrayUnion,
    updateDoc,
    arrayRemove
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';

// Function to save a post
export const savePost = async (post) => {
    try {
        const docRef = await addDoc(collection(db, 'posts'), post);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id; // Return the ID of the new post
    } catch (e) {
        console.error('Error adding document: ', e);
        throw e; // Rethrow the error for handling
    }
};
export const submitComment = async (postId, comment) => {
    try {
        const commentsCollectionRef = collection(db, 'posts', postId, 'comments');
        const docRef = await addDoc(commentsCollectionRef, comment);
        console.log('Comment submitted with ID: ', docRef.id);
    } catch (error) {
        console.error('Error submitting comment: ', error);
    }
};
export const fetchPosts = async () => {
    const postsCollectionRef = collection(db, 'posts');
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched posts:", posts); // Log the fetched posts
    return posts; // Return the posts
};

// Function to fetch products
export const getProductsFromFirestore = async () => {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return productList;
};

export const createPost = async (newPostData) => {
    try {
        const docRef = await addDoc(collection(db, 'posts'), newPostData);
        console.log('Post created with ID:', docRef.id);
        return docRef.id; // Return the new post ID if needed
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};


// Function to delete a post from Firestore
export const deletePostFromFirestore = async (postId) => {
    if (typeof postId !== 'string') {
        throw new Error("postId must be a string");
    }

    const postRef = doc(db, 'posts', postId);
    try {
        await deleteDoc(postRef);
        console.log(`Post with ID ${postId} has been deleted from Firestore.`);
    } catch (error) {
        console.error("Error deleting post from Firestore:", error);
        throw error; // Rethrow error for handling in calling function
    }
};


// Function to upload author image
export const uploadAuthorImage = async (file) => {
    try {
        const storageRef = ref(storage, `authorImages/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error uploading author image: ', error);
        throw new Error('Failed to upload image');
    }
};

// Function to get order details
export const getOrderDetails = async (orderId) => {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnapshot = await getDoc(orderRef);

    if (!orderSnapshot.exists()) {
        throw new Error('Order not found');
    }

    return { id: orderSnapshot.id, ...orderSnapshot.data() };
};

// Function to save user content and image URL
export const saveUserContent = async (uploadedImageUrl, userContent) => {
    try {
        const userDocRef = doc(db, 'users', userContent.userId);
        await setDoc(userDocRef, {
            imageUrl: uploadedImageUrl,
            content: userContent,
        }, { merge: true });
        console.log('User content saved with ID: ', userDocRef.id);
    } catch (error) {
        console.error('Error adding user content: ', error);
    }
};

export const updatePostInFirestore = async (postId, updatedFields) => {
    const postRef = doc(db, 'posts', postId); // Assuming your collection is named 'posts'
    await updateDoc(postRef, updatedFields);
};
// Function to subscribe to user document
export const subscribeToUserDocument = (currentUser, setTitles, setFontSize, setFontStyle, setFontColor) => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    return onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            console.log("Fetched data:", data);
            setTitles(data.titles || []);
            setFontSize(data.fontSize || '16px');
            setFontStyle(data.fontStyle || 'normal');
            setFontColor(data.fontColor || '#000000');
        } else {
            console.log("No document found!");
        }
    });
};
export const fetchPostsFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return posts;
};
// Function to save title to Firebase
export const saveTitleToFirebase = async (currentUser, title, fontSize, fontStyle, fontColor) => {
    if (!currentUser) return;
    try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        console.log("Saving title:", title);
        
        await setDoc(userDocRef, {
            titles: arrayUnion(title),
            fontSize,
            fontStyle,
            fontColor
        }, { merge: true });
        
        console.log("Saved title successfully.");
    } catch (error) {
        console.error('Error saving title to Firebase:', error);
    }
};
export const updatePostBackgroundPattern = async (postId, newBackgroundPattern) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
        backgroundPattern: newBackgroundPattern,
    });
};


export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

// Function to update a post's background pattern and image URL
export const updatePostWithImage = async (postId, newBackgroundPattern, imageUrl) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
        backgroundPattern: newBackgroundPattern,
        imageUrl: imageUrl,
    });
};