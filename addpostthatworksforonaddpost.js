import React, { useState } from 'react';

const AddPost = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleFontColor, setTitleFontColor] = useState('#000000'); // Default color
    const [titleFontSize, setTitleFontSize] = useState(16); // Default font size
    const [titleFontStyle, setTitleFontStyle] = useState('Arial'); // Default font style
    const [contentFontColor, setContentFontColor] = useState('#000000'); // Default color
    const [contentFontSize, setContentFontSize] = useState(14); // Default font size
    const [contentFontStyle, setContentFontStyle] = useState('Arial'); // Default font style
    const [borderWidth, setBorderWidth] = useState(1); // Default border width
    const [borderColor, setBorderColor] = useState('#000000'); // Default border color
    const [borderSize, setBorderSize] = useState(5); // Default border radius

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
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
        };
        onAddPost(newPost);
        // Reset the form or handle the post submission as needed
        setTitle('');
        setContent('');
        setTitleFontColor('#000000');
        setTitleFontSize(16);
        setTitleFontStyle('Arial');
        setContentFontColor('#000000');
        setContentFontSize(14);
        setContentFontStyle('Arial');
        setBorderWidth(1);
        setBorderColor('#000000');
        setBorderSize(5);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Post Content"
            />
            {/* Title Style Inputs */}
            <input
                type="color"
                value={titleFontColor}
                onChange={(e) => setTitleFontColor(e.target.value)}
                title="Title Font Color"
            />
            <input
                type="number"
                value={titleFontSize}
                onChange={(e) => setTitleFontSize(e.target.value)}
                placeholder="Title Font Size (px)"
            />
            <input
                type="text"
                value={titleFontStyle}
                onChange={(e) => setTitleFontStyle(e.target.value)}
                placeholder="Title Font Style (e.g., Arial, Times New Roman)"
            />
            {/* Content Style Inputs */}
            <input
                type="color"
                value={contentFontColor}
                onChange={(e) => setContentFontColor(e.target.value)}
                title="Content Font Color"
            />
            <input
                type="number"
                value={contentFontSize}
                onChange={(e) => setContentFontSize(e.target.value)}
                placeholder="Content Font Size (px)"
            />
            <input
                type="text"
                value={contentFontStyle}
                onChange={(e) => setContentFontStyle(e.target.value)}
                placeholder="Content Font Style (e.g., Arial, Times New Roman)"
            />
            {/* Border Style Inputs */}
            <input
                type="number"
                value={borderWidth}
                onChange={(e) => setBorderWidth(e.target.value)}
                placeholder="Border Width (px)"
            />
            <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                title="Border Color"
            />
            <input
                type="number"
                value={borderSize}
                onChange={(e) => setBorderSize(e.target.value)}
                placeholder="Border Radius (px)"
            />
            <button type="submit">Add Post</button>
        </form>
    );
};

export default AddPost;

