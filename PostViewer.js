import React from 'react';

const PostViewer = ({ postData, onEdit, onDelete, borderSize, borderColor, borderStyle }) => {
    return (
        <div style={{
            border: `${borderSize}px ${borderStyle} ${borderColor}`,
            padding: '10px',
            margin: '10px 0'
        }}>
            <h2>{postData.titleContent}</h2>
            <p>{postData.content}</p>
            {postData.articleImageUrl && (
                <img src={postData.articleImageUrl} alt="Article" style={{ width: '100px' }} />
            )}
            <button onClick={onEdit}>Edit</button>
            <button onClick={() => onDelete(postData.id)}>Delete</button>
        </div>
    );
};
export default PostViewer;
