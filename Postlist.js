import React, { useState } from 'react';
import Post from './Post';

const PostList = ({ posts }) => {
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
        backgroundPattern: 'none',
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: '#000000',
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    editFormData={editFormData}
                    setEditFormData={setEditFormData}
                    onChange={handleEditChange}
                />
            ))}
        </div>
    );
};

export default PostList;
