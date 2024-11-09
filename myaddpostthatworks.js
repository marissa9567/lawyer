import React, { useState } from 'react';
import { db } from '../components/firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddPost = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [articleUrl, setArticleUrl] = useState('');
    const [articleImageUrl, setArticleImageUrl] = useState('');
    const [titleFontColor, setTitleFontColor] = useState('#000000');
    const [titleFontSize, setTitleFontSize] = useState(24);
    const [titleFontStyle, setTitleFontStyle] = useState('Arial');
    const [contentFontColor, setContentFontColor] = useState('#000000');
    const [contentFontSize, setContentFontSize] = useState(16);
    const [contentFontStyle, setContentFontStyle] = useState('Arial');
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderSize, setBorderSize] = useState(5);
    const [backgroundPattern, setBackgroundPattern] = useState('none');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getBackgroundPattern = (pattern) => {
        switch (pattern) {
            case 'yellowdots':
                return 'url("../images/yellowdots.jpg")';
            case 'stars':
                return 'url("../images/stars.jpg")';
            case 'coloreddots':
                return 'url("../images/coloreddots.jpg")';
            case 'flag':
                return 'url("../images/flag.jpg")';
            case 'greenlight':
                return 'url("../images/greenlight.jpg")';
            case 'hobbies':
                return 'url("../images/hobbies.jpg")';
            case 'mountain':
                return 'url("../images/mountain.jpg")';
            case 'night':
                return 'url("../images/night.jpg")';
            case 'political':
                return 'url("../images/political.jpg")';
            case 'political1':
                return 'url("../images/political1.jpg")';
            case 'redtexture':
                return 'url("../images/redtexture.jpg")';
            case 'retro':
                return 'url("../images/retro.jpg")';
            case 'rights':
                return 'url("../images/rights.jpg")';
            case 'wisemen':
                return 'url("../images/wisemen.jpg")';
            case 'wood':
                return 'url("../images/wood.jpg")';
            default:
                return 'none';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
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
                backgroundPattern,
                imageUrl,
                articleUrl,
                articleImageUrl,
            };
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            onAddPost({ id: docRef.id, ...newPost });

            // Reset form fields
            setTitle('');
            setContent('');
            setImageUrl('');
            setArticleUrl('');
            setArticleImageUrl('');
            setTitleFontColor('#000000');
            setTitleFontSize(24);
            setTitleFontStyle('Arial');
            setContentFontColor('#000000');
            setContentFontSize(16);
            setContentFontStyle('Arial');
            setBorderWidth(1);
            setBorderColor('#000000');
            setBorderSize(5);
            setBackgroundPattern('none');
        } catch (error) {
            console.error("Error adding post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                />
                <input
                    type="file"
                    onChange={handleImageUpload}
                />
                {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '100px', margin: '10px 0' }} />}
                
                <input
                    type="url"
                    value={articleUrl}
                    onChange={(e) => setArticleUrl(e.target.value)}
                    placeholder="Article URL"
                />
                <input
                    type="url"
                    value={articleImageUrl}
                    onChange={(e) => setArticleImageUrl(e.target.value)}
                    placeholder="Article Image URL"
                />
                {articleImageUrl && <img src={articleImageUrl} alt="Article" style={{ width: '100px', margin: '10px 0' }} />}

                {/* Title Font Properties */}
                <div>
                    <label>Title Font Color:</label>
                    <input
                        type="color"
                        value={titleFontColor}
                        onChange={(e) => setTitleFontColor(e.target.value)}
                    />
                    <label>Title Font Size:</label>
                    <input
                        type="number"
                        value={titleFontSize}
                        onChange={(e) => setTitleFontSize(e.target.value)}
                    />
                    <label>Title Font Style:</label>
                    <select
                        value={titleFontStyle}
                        onChange={(e) => setTitleFontStyle(e.target.value)}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>

                {/* Content Font Properties */}
                <div>
                    <label>Content Font Color:</label>
                    <input
                        type="color"
                        value={contentFontColor}
                        onChange={(e) => setContentFontColor(e.target.value)}
                    />
                    <label>Content Font Size:</label>
                    <input
                        type="number"
                        value={contentFontSize}
                        onChange={(e) => setContentFontSize(e.target.value)}
                    />
                    <label>Content Font Style:</label>
                    <select
                        value={contentFontStyle}
                        onChange={(e) => setContentFontStyle(e.target.value)}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>

                {/* Border Properties */}
                <div>
                    <label>Border Width:</label>
                    <input
                        type="number"
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(e.target.value)}
                    />
                    <label>Border Color:</label>
                    <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                    />
                    <label>Border Size:</label>
                    <input
                        type="number"
                        value={borderSize}
                        onChange={(e) => setBorderSize(e.target.value)}
                    />
                </div>

                {/* Background Pattern Selection */}
                <div>
                    <label>Background Pattern:</label>
                    <select 
                        value={backgroundPattern} 
                        onChange={(e) => setBackgroundPattern(e.target.value)} 
                    >
                        <option value="none">None</option>
                        <option value="yellowdots">Yellow Dots</option>
                        <option value="stars">Stars</option>
                        <option value="coloreddots">Colored Dots</option>
                        <option value="flag">Flag</option>
                        <option value="greenlight">Green Light</option>
                        <option value="hobbies">Hobbies</option>
                        <option value="mountain">Mountain</option>
                        <option value="night">Night</option>
                        <option value="political">Political</option>
                        <option value="political1">Political 1</option>
                        <option value="redtexture">Red Texture</option>
                        <option value="retro">Retro</option>
                        <option value="rights">Rights</option>
                        <option value="wisemen">Wisemen</option>
                        <option value="wood">Wood</option>
                    </select>
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Add Post'}
                </button>
            </form>

            <h2>Preview</h2>
            <div style={{
                borderWidth: `${borderWidth}px`,
                borderColor: borderColor,
                borderStyle: 'solid',
                borderRadius: `${borderSize}px`,
                padding: '10px',
                margin: '10px 0',
                background: getBackgroundPattern(backgroundPattern),
                color: contentFontColor,
                fontFamily: contentFontStyle,
                fontSize: `${contentFontSize}px`,
            }}>
                <h2 style={{
                    color: titleFontColor,
                    fontSize: `${titleFontSize}px`,
                    fontFamily: titleFontStyle,
                }}>{title || "Preview Title"}</h2>
                <p style={{
                    color: contentFontColor,
                    fontSize: `${contentFontSize}px`,
                    fontFamily: contentFontStyle,
                }}>{content || "Preview content goes here."}</p>
                {imageUrl && <img src={imageUrl} alt="Preview" style={{ width: '100%', borderRadius: '5px' }} />}
                {articleUrl && (
                    <div>
                        <a href={articleUrl} target="_blank" rel="noopener noreferrer">Read more</a>
                        {articleImageUrl && <img src={articleImageUrl} alt="Article" style={{ width: '100%', borderRadius: '5px' }} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPost;
