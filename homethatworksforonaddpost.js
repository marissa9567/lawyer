// src/pages/Home.js

import React from 'react';
import Post from '../components/Post';

const Home = ({ posts, deletePost }) => {
    return (
        <div>
            {posts.map(post => (
                <Post 
                    key={post.id} 
                    title={post.title} 
                    content={post.content} 
                    styles={{
                        titleFontColor: post.titleFontColor,
                        titleFontSize: post.titleFontSize,
                        titleFontStyle: post.titleFontStyle,
                        contentFontColor: post.contentFontColor, // Ensure this is included
                        contentFontSize: post.contentFontSize, // Ensure this is included
                        contentFontStyle: post.contentFontStyle, // Ensure this is included
                        borderWidth: post.borderWidth,
                        borderColor: post.borderColor,
                        borderSize: post.borderSize,
                    }}
                    deletePost={() => deletePost(post.id)} // Optional: if you want to allow deletion from the home page
                />
            ))}
        </div>
    );
};

export default Home;
