import React from 'react';

const PostCard = ({ post, onDeletePost }) => {
    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => onDeletePost(post.id)}>Delete Post</button>
        </div>
    );
};

export default PostCard;
