import React, { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import Comments from './Comments';
import CollapsibleEditPostForm from './Editpostform';
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
const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditFormData(prev => ({ ...prev, [name]: value }));
};
const Post = ({ post, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, 'posts', post.id));
            onDelete(post.id);
        } catch (error) {
            console.error("Error deleting post: ", error);
            alert("Failed to delete post. Please try again.");
        }
    };

    const backgroundImage = post.backgroundPattern && post.backgroundPattern !== 'none' 
        ? `url(${getBackgroundImage(post.backgroundPattern)})` 
        : 'none';

    return (
        <div style={{
            border: `${post.borderWidth}px ${post.borderStyle} ${post.borderColor}`,
            padding: '10px',
            margin: '10px 0',
            backgroundImage,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <h2 style={{
                fontSize: `${post.titleFontSize}px`,
                fontFamily: post.titleFontStyle,
                color: post.titleFontColor
            }}>{post.title}</h2>
            <p style={{
                fontSize: `${post.contentFontSize}px`,
                fontFamily: post.contentFontStyle,
                color: post.contentFontColor
            }}>{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" style={{ width: '100%', height: 'auto' }} />}
            {post.articleUrl && (
                <p>
                    <a href={post.articleUrl} target="_blank" rel="noopener noreferrer">
                        Read Full Article
                    </a>
                </p>
            )}
            <p>{post.date}</p>
            <Comments postId={post.id} />
            <button onClick={() => {
                setIsEditing(!isEditing);
                if (!isEditing) onEdit(post);
            }}>
                {isEditing ? 'Cancel Edit' : 'Edit Post'}
            </button>
            <button onClick={handleDelete}>Delete Post</button>
            
            {isEditing && (
                <CollapsibleEditPostForm
                    editFormData={{
                        title: post.title,
                        content: post.content,
                        imageUrl: post.imageUrl || '',
                        articleUrl: post.articleUrl || '',
                        titleFontColor: post.titleFontColor,
                        titleFontStyle: post.titleFontStyle,
                        titleFontSize: post.titleFontSize,
                        contentFontColor: post.contentFontColor,
                        contentFontStyle: post.contentFontStyle,
                        contentFontSize: post.contentFontSize,
                        backgroundPattern: post.backgroundPattern || 'none',
                        borderWidth: post.borderWidth,
                        borderStyle: post.borderStyle,
                        borderColor: post.borderColor,
                    }}
                    setEditFormData={() => {}}
                    onChange={() => {}}
                    post={post}
                />
            )}
        </div>
    );
};

export default Post;
