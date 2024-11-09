import React, { useState, useEffect } from 'react';

const Post = ({ post, onDeletePost, onUpdatePost }) => {
    const [isEditing, setIsEditing] = useState(false);

    // State variables for title and content fonts
    const [titleFontColor, setTitleFontColor] = useState(post.titleFontColor);
    const [titleFontStyle, setTitleFontStyle] = useState(post.titleFontStyle);
    const [titleFontSize, setTitleFontSize] = useState(post.titleFontSize);

    const [contentFontColor, setContentFontColor] = useState(post.contentFontColor);
    const [contentFontStyle, setContentFontStyle] = useState(post.contentFontStyle);
    const [contentFontSize, setContentFontSize] = useState(post.contentFontSize);

    // Reset local state when the post prop changes
    useEffect(() => {
        setTitleFontColor(post.titleFontColor);
        setTitleFontStyle(post.titleFontStyle);
        setTitleFontSize(post.titleFontSize);

        setContentFontColor(post.contentFontColor);
        setContentFontStyle(post.contentFontStyle);
        setContentFontSize(post.contentFontSize);
    }, [post]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            ...post,
            titleFontColor,
            titleFontStyle,
            titleFontSize,
            contentFontColor,
            contentFontStyle,
            contentFontSize,
        };
        onUpdatePost(updatedPost); // Call the parent function to update the post
        setIsEditing(false); // Close the edit form
    };

    return (
        <div>
            <h2 style={{ color: titleFontColor, fontSize: titleFontSize, fontStyle: titleFontStyle }}>
                {post.title}
            </h2>
            <p style={{ color: contentFontColor, fontSize: contentFontSize, fontStyle: contentFontStyle }}>
                {post.content}
            </p>
            <button onClick={() => onDeletePost(post.id)}>Delete</button>
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Font'}
            </button>

            {isEditing && (
                <form onSubmit={handleEditSubmit}>
                    <h3>Edit Title Font</h3>
                    <label>
                        Title Font Color:
                        <input
                            type="color"
                            value={titleFontColor}
                            onChange={(e) => setTitleFontColor(e.target.value)}
                        />
                    </label>
                    <label>
                        Title Font Style:
                        <select
                            value={titleFontStyle}
                            onChange={(e) => setTitleFontStyle(e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="bold">Bold</option>
                        </select>
                    </label>
                    <label>
                        Title Font Size:
                        <input
                            type="number"
                            value={parseInt(titleFontSize)} // Ensure fontSize is a number
                            onChange={(e) => setTitleFontSize(`${e.target.value}px`)} // Convert to px
                        />
                    </label>

                    <h3>Edit Content Font</h3>
                    <label>
                        Content Font Color:
                        <input
                            type="color"
                            value={contentFontColor}
                            onChange={(e) => setContentFontColor(e.target.value)}
                        />
                    </label>
                    <label>
                        Content Font Style:
                        <select
                            value={contentFontStyle}
                            onChange={(e) => setContentFontStyle(e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="bold">Bold</option>
                        </select>
                    </label>
                    <label>
                        Content Font Size:
                        <input
                            type="number"
                            value={parseInt(contentFontSize)} // Ensure fontSize is a number
                            onChange={(e) => setContentFontSize(`${e.target.value}px`)} // Convert to px
                        />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            )}
        </div>
    );
};

export default Post;
