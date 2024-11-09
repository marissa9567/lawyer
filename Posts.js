import React, { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Ensure this path is correct

const Post = ({
    id,
    title,
    content,
    titleFontColor,
    titleFontSize,
    titleFontStyle,
    contentFontColor,
    contentFontSize,
    contentFontStyle,
    borderWidth,
    borderColor,
    borderSize,
    backgroundPattern,
    onDelete,
    imageUrl,
}) => {
    const [isExpanded, setIsExpanded] = useState(false); // State to track if content is expanded

    const handleDeletePost = async () => {
        if (onDelete) {
            await onDelete(id); // Call the onDelete function passed as a prop with the post ID
        }
    };

    return (
        <div style={{
            borderWidth: `${borderWidth}px`,
            borderColor: borderColor,
            borderStyle: 'solid',
            borderRadius: `${borderSize}px`,
            padding: '10px',
            margin: '10px 0',
            background: backgroundPattern,
        }}>
            <h2 style={{ color: titleFontColor, fontSize: `${titleFontSize}px`, fontFamily: titleFontStyle }}>
                {title}
            </h2>
            {imageUrl && <img src={imageUrl} alt="Post" style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} />}
            <p style={{ color: contentFontColor, fontSize: `${contentFontSize}px`, fontFamily: contentFontStyle }}>
                {isExpanded ? content : `${content.substring(0, 100)}...`}
            </p>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>
            <button onClick={handleDeletePost}>Delete Post</button> {/* Delete button inside Post component */}
        </div>
    );
};

export default Post;
