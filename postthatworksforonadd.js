import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import Comments from '../components/Comments';
import yellowDots from '../images/yellowdots.jpg';
import ladyLiberty from '../images/ladyliberty.png';

const backgroundPatterns = [
    { value: 'none', label: 'None' },
    { value: 'yellowdots', label: 'Yellow Dots' },
    { value: 'ladyLiberty', label: 'Lady Liberty' },
    // Add more patterns as needed
];

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
    borderStyle,
    backgroundPattern,
    onDelete,
    imageUrl,
    articleUrl,
    articleImageUrl,
    commentsEnabled,
    onEdit, // Callback to handle post edit
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditingFont, setIsEditingFont] = useState(false);
    const [newTitleFontColor, setNewTitleFontColor] = useState(titleFontColor);
    const [newContentFontColor, setNewContentFontColor] = useState(contentFontColor);
    const [newTitleFontSize, setNewTitleFontSize] = useState(titleFontSize);
    const [newContentFontSize, setNewContentFontSize] = useState(contentFontSize);
    const [newTitleFontStyle, setNewTitleFontStyle] = useState(titleFontStyle);
    const [newContentFontStyle, setNewContentFontStyle] = useState(contentFontStyle);
    const [newArticleUrl, setNewArticleUrl] = useState(articleUrl);
    const [newArticleImageUrl, setNewArticleImageUrl] = useState(articleImageUrl);
    const [newBorderColor, setNewBorderColor] = useState(borderColor);
    const [newBorderWidth, setNewBorderWidth] = useState(borderWidth);
    const [newBorderStyle, setNewBorderStyle] = useState(borderStyle);
    const [newBackgroundPattern, setNewBackgroundPattern] = useState(backgroundPattern);
    const [newImageFile, setNewImageFile] = useState(null);

    const handleEditPost = () => {
        onEdit(id); // Call the edit function passed as a prop with the post ID
    };

    const handleFontColorChange = () => {
        setIsEditingFont(!isEditingFont); // Toggle the font editing mode
    };

    const handleTitleFontColorChange = (e) => {
        setNewTitleFontColor(e.target.value);
    };

    const handleContentFontColorChange = (e) => {
        setNewContentFontColor(e.target.value);
    };

    const handleDeletePost = async () => {
        try {
            await deleteDoc(doc(db, 'posts', id));
            onDelete(id);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleSaveFontColors = async () => {
        try {
            const postRef = doc(db, 'posts', id);
            await updateDoc(postRef, {
                titleFontColor: newTitleFontColor,
                contentFontColor: newContentFontColor,
                titleFontSize: newTitleFontSize,
                contentFontSize: newContentFontSize,
                titleFontStyle: newTitleFontStyle,
                contentFontStyle: newContentFontStyle,
                backgroundPattern: newBackgroundPattern, // Save background pattern
            });
            setIsEditingFont(false); // Close the font editing mode after saving
        } catch (error) {
            console.error("Error updating font properties:", error);
        }
    };

    const handleArticleUrlChange = (e) => {
        setNewArticleUrl(e.target.value);
    };

    const handleArticleImageUrlChange = (e) => {
        setNewArticleImageUrl(e.target.value);
    };

    const handleSaveArticleUrl = async () => {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
            articleUrl: newArticleUrl,
        });
    };

    const handleSaveArticleImageUrl = async () => {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
            articleImageUrl: newArticleImageUrl,
        });
    };

    const handleBorderColorChange = (e) => {
        setNewBorderColor(e.target.value);
    };

    const handleBorderWidthChange = (e) => {
        setNewBorderWidth(e.target.value);
    };

    const handleBorderStyleChange = (e) => {
        setNewBorderStyle(e.target.value);
    };

    const handleSaveBorderProperties = async () => {
        const postRef = doc(db, 'posts', id);
        await updateDoc(postRef, {
            borderColor: newBorderColor,
            borderWidth: newBorderWidth,
            borderStyle: newBorderStyle,
        });
    };

    // Handle background pattern change
    const handleBackgroundPatternChange = (e) => {
        setNewBackgroundPattern(e.target.value);
    };

    // Handle image file upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImageFile(file);
        }
    };

    const handleSaveImageUpload = async () => {
        if (newImageFile) {
            const formData = new FormData();
            formData.append('image', newImageFile);

            // You should replace this with your actual upload logic to Firebase or another service
            // For example, use Firebase Storage to upload the file and get the URL back
            const imageUrl = URL.createObjectURL(newImageFile); // Temporarily display the uploaded image

            const postRef = doc(db, 'posts', id);
            await updateDoc(postRef, {
                imageUrl: imageUrl, // Save the URL of the uploaded image
            });
            // Reset the file input
            setNewImageFile(null);
        }
    };

    return (
        <div
            style={{
                borderWidth: `${newBorderWidth}px`,
                borderColor: newBorderColor,
                borderStyle: newBorderStyle,
                borderRadius: `${borderSize}px`,
                padding: '10px',
                margin: '10px 0',
                background: newBackgroundPattern === 'yellowdots' ? `url(${yellowDots})` :
                            newBackgroundPattern === 'ladyLiberty' ? `url(${ladyLiberty})` : 'none',
            }}
        >
            <h2 style={{ color: newTitleFontColor, fontSize: `${newTitleFontSize}px`, fontFamily: newTitleFontStyle }}>
                {title}
            </h2>
            {imageUrl && <img src={imageUrl} alt="Post" style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} />}
            <p style={{ color: newContentFontColor, fontSize: `${newContentFontSize}px`, fontFamily: newContentFontStyle }}>
                {isExpanded ? content : `${content.substring(0, 100)}...`}
            </p>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Read Less' : 'Read More'}
            </button>

            {/* Article URL */}
            <div>
                <h4>Article URL:</h4>
                <input 
                    type="text" 
                    value={newArticleUrl} 
                    onChange={handleArticleUrlChange} 
                />
                <button onClick={handleSaveArticleUrl}>Save Article URL</button>
            </div>

            {/* Article Image URL */}
            <div>
                <h4>Article Image URL:</h4>
                <input 
                    type="text" 
                    value={newArticleImageUrl} 
                    onChange={handleArticleImageUrlChange} 
                />
                <button onClick={handleSaveArticleImageUrl}>Save Article Image URL</button>
                {newArticleImageUrl && (
                    <img src={newArticleImageUrl} alt="Article" style={{ width: '100%', borderRadius: '5px', marginTop: '10px' }} />
                )}
            </div>

            {/* Image File Upload */}
            <div>
                <h4>Upload Image:</h4>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button onClick={handleSaveImageUpload}>Save Uploaded Image</button>
            </div>

            {/* Border Properties Editing */}
            <div>
                <h4>Edit Border Properties:</h4>
                <label>
                    Border Color:
                    <input
                        type="color"
                        value={newBorderColor}
                        onChange={handleBorderColorChange}
                    />
                </label>
                <label>
                    Border Width:
                    <input
                        type="number"
                        value={newBorderWidth}
                        onChange={handleBorderWidthChange}
                    />
                </label>
                <label>
                    Border Style:
                    <select value={newBorderStyle} onChange={handleBorderStyleChange}>
                        <option value="solid">Solid</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                    </select>
                </label>
                <button onClick={handleSaveBorderProperties}>Save Border Properties</button>
            </div>

            {/* Background Pattern Editing */}
            <div>
                <h4>Edit Background Pattern:</h4>
                <select value={newBackgroundPattern} onChange={handleBackgroundPatternChange}>
                    {backgroundPatterns.map((pattern) => (
                        <option key={pattern.value} value={pattern.value}>
                            {pattern.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Font Color Edit Button */}
            <button onClick={handleFontColorChange}>
                {isEditingFont ? 'Close Font Color Editor' : 'Edit Font Colors'}
            </button>

            {/* Font Color Inputs (shown when editing mode is active) */}
            {isEditingFont && (
                <div>
                    <label>
                        Title Font Color:
                        <input
                            type="color"
                            value={newTitleFontColor}
                            onChange={handleTitleFontColorChange}
                        />
                    </label>
                    <label>
                        Content Font Color:
                        <input
                            type="color"
                            value={newContentFontColor}
                            onChange={handleContentFontColorChange}
                        />
                    </label>
                    <label>
                        Title Font Size:
                        <input
                            type="number"
                            value={newTitleFontSize}
                            onChange={(e) => setNewTitleFontSize(e.target.value)}
                        />
                    </label>
                    <label>
                        Content Font Size:
                        <input
                            type="number"
                            value={newContentFontSize}
                            onChange={(e) => setNewContentFontSize(e.target.value)}
                        />
                    </label>
                    <label>
                        Title Font Style:
                        <select value={newTitleFontStyle} onChange={(e) => setNewTitleFontStyle(e.target.value)}>
                            <option value="Arial">Arial</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                    </label>
                    <label>
                        Content Font Style:
                        <select value={newContentFontStyle} onChange={(e) => setNewContentFontStyle(e.target.value)}>
                            <option value="Arial">Arial</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                    </label>
                    <button onClick={handleSaveFontColors}>Save Changes</button>
                </div>
            )}

            {/* Comments Section */}
            {commentsEnabled && <Comments postId={id} />}

            <button onClick={handleDeletePost}>Delete Post</button>
        </div>
    );
};

export default Post;

