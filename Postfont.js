import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase'; // Adjust the path as necessary
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Postfont = ({
    id,
    initialContent,
    initialFontSize,
    initialFontColor,
    initialFontStyle,
    initialTitle,
    initialTitleFontSize,
    initialTitleFontColor,
    initialTitleFontStyle
}) => {
    // Content font states
    const [content, setContent] = useState(initialContent || '');
    const [fontSize, setFontSize] = useState(initialFontSize || 16);
    const [fontColor, setFontColor] = useState(initialFontColor || 'black');
    const [fontStyle, setFontStyle] = useState(initialFontStyle || 'Arial');

    // Title font states
    const [titleContent, setTitleContent] = useState(initialTitle || '');
    const [titleFontSize, setTitleFontSize] = useState(initialTitleFontSize || 24);
    const [titleFontColor, setTitleFontColor] = useState(initialTitleFontColor || 'black');
    const [titleFontStyle, setTitleFontStyle] = useState(initialTitleFontStyle || 'Arial');

    useEffect(() => {
        // Fetch post data from Firebase when the component mounts
        const fetchPostData = async () => {
            const postRef = doc(db, 'posts', id);
            const postSnapshot = await getDoc(postRef);
            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();

                // Set content font states
                setContent(postData.content || '');
                setFontSize(postData.fontSize || 16);
                setFontColor(postData.fontColor || 'black');
                setFontStyle(postData.fontStyle || 'Arial');

                // Set title font states
                setTitleContent(postData.titleContent || '');
                setTitleFontSize(postData.titleFontSize || 24);
                setTitleFontColor(postData.titleFontColor || 'black');
                setTitleFontStyle(postData.titleFontStyle || 'Arial');
            }
        };

        fetchPostData();
    }, [id]);

    const handleSaveFontSettings = async () => {
        try {
            const postRef = doc(db, 'posts', id);
            await setDoc(postRef, {
                content: content,
                fontSize: fontSize,
                fontColor: fontColor,
                fontStyle: fontStyle,
                titleContent: titleContent,
                titleFontSize: titleFontSize,
                titleFontColor: titleFontColor,
                titleFontStyle: titleFontStyle,
            }, { merge: true }); // Merge to avoid overwriting the entire document
            alert('Post updated successfully!');
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };

    return (
        <div>
            {/* Title Editor */}
            <div style={{ marginBottom: '20px' }}>
                <label>Title</label>
                <textarea
                    value={titleContent}
                    onChange={(e) => setTitleContent(e.target.value)}
                    rows="2"
                    style={{ 
                        width: '100%', 
                        fontSize: `${titleFontSize}px`, 
                        color: titleFontColor, 
                        fontFamily: titleFontStyle 
                    }}
                    placeholder="Edit your post title..."
                />
                
                {/* Title Font Options */}
                <div>
                    <label>Title Font Size: </label>
                    <select value={titleFontSize} onChange={(e) => setTitleFontSize(e.target.value)}>
                        <option value={24}>Small</option>
                        <option value={30}>Medium</option>
                        <option value={40}>Large</option>
                    </select>
                </div>
                
                <div>
                    <label>Title Font Color: </label>
                    <input
                        type="color"
                        value={titleFontColor}
                        onChange={(e) => setTitleFontColor(e.target.value)}
                    />
                </div>

                <div>
                    <label>Title Font Style: </label>
                    <select value={titleFontStyle} onChange={(e) => setTitleFontStyle(e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                </div>
            </div>

            {/* Content Editor */}
            <div style={{ marginBottom: '20px' }}>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                    style={{ 
                        width: '100%', 
                        fontSize: `${fontSize}px`, 
                        color: fontColor, 
                        fontFamily: fontStyle 
                    }}
                    placeholder="Edit your post content..."
                />
                
                {/* Content Font Options */}
                <div>
                    <label>Content Font Size: </label>
                    <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                        <option value={16}>Small</option>
                        <option value={20}>Medium</option>
                        <option value={24}>Large</option>
                    </select>
                </div>

                <div>
                    <label>Content Font Color: </label>
                    <input
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                    />
                </div>

                <div>
                    <label>Content Font Style: </label>
                    <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                </div>
            </div>

            {/* Save Changes Button */}
            <button onClick={handleSaveFontSettings}>Save Changes</button>
        </div>
    );
};

export default Postfont;
