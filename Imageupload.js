import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../Context/AuthContext';
import { getDatabase, ref as dbRef, set, onValue } from 'firebase/database';
import "../styles/About.css";

const colors = [
    '#ffffff', '#ffcccc', '#ffcc99', '#ffff99', '#ccffcc',
    '#99ccff', '#ccccff', '#ff99cc', '#ffb3b3', '#b3b3ff'
];
const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove'];
const fontStyles = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];

const ImageUpload = () => {
    const { currentUser } = useAuth();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageInfo, setImageInfo] = useState('');
    const [showFullText, setShowFullText] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState('16px');
    const [fontStyle, setFontStyle] = useState('Arial');
    const [fontColor, setFontColor] = useState('#000000');
    const [borderWidth, setBorderWidth] = useState('1px');
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [isCollapsed, setIsCollapsed] = useState(true); // State to manage collapse
    const storage = getStorage();
    const db = getDatabase();

    useEffect(() => {
        const publicImageRef = dbRef(db, 'publicImages/lastUploadedImage');
        onValue(publicImageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setImageUrl(data.url);
                setImageInfo(data.info || '');
                setFontSize(data.fontSize || '16px');
                setFontStyle(data.fontStyle || 'Arial');
                setFontColor(data.fontColor || '#000000');
                setShowFullText(false);
                setBorderWidth(data.borderWidth || '1px');
                setBorderColor(data.borderColor || '#000000');
                setBorderStyle(data.borderStyle || 'solid');
            }
        });

        const colorRef = dbRef(db, 'settings/backgroundColor');
        onValue(colorRef, (snapshot) => {
            const colorData = snapshot.val();
            if (colorData) {
                setBackgroundColor(colorData);
            }
        });
    }, [db]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
   // Toggle the collapse state
   const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
};

    const uploadImage = async () => {
        if (!image || !currentUser) {
            console.log('No image or user is authenticated');
            return;
        }

        const storageRef = ref(storage, `userImages/public/${Date.now()}-${image.name}`);
        setUploading(true);
        try {
            await uploadString(storageRef, image, 'data_url');
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);

            const imageData = {
                url,
                info: imageInfo,
                fontSize,
                fontStyle,
                fontColor,
                borderWidth,
                borderColor,
                borderStyle
            };

            await set(dbRef(db, 'publicImages/lastUploadedImage'), imageData);
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image or saving data:', error.message);
            alert('Failed to upload image or save data. Check console for details: ' + error.message);
        } finally {
            setUploading(false);
            setImage(null);
            setImageInfo('');
        }
    };

    const saveTextInfo = async () => {
        if (!currentUser) {
            console.log('User is not authenticated');
            return;
        }

        const imageData = {
            url: imageUrl,
            info: imageInfo,
            fontSize,
            fontStyle,
            fontColor,
            borderWidth,
            borderColor,
            borderStyle
        };

        try {
            await set(dbRef(db, 'publicImages/lastUploadedImage'), imageData);
            alert('Additional information and font settings saved successfully!');
        } catch (error) {
            console.error('Error saving text info:', error.message);
            alert('Failed to save text info. Check console for details: ' + error.message);
        }
    };

    const handleColorChange = async (event) => {
        const newColor = event.target.value;
        setBackgroundColor(newColor);
        try {
            await set(dbRef(db, 'settings/backgroundColor'), newColor);
            console.log('Color saved successfully:', newColor);
        } catch (error) {
            console.error('Error saving background color:', error.message);
            alert('Failed to save background color. Check console for details.');
        }
    };

    return (
        <div className="image-upload-container" style={{ backgroundColor }}>
              <button className="footer-toggle-button" onClick={toggleCollapse}>
 
</button>

            {image && <img src={image} alt="Preview" className='image-preview' />}
       
                <textarea
                    className='about-text-box'
                    placeholder="Enter additional information"
                    value={imageInfo}
                    onChange={(e) => setImageInfo(e.target.value)}
                    style={{ fontSize, fontFamily: fontStyle, color: fontColor,  borderWidth,
                        borderColor,
                        borderStyle}}
                />
            )}

            {currentUser && <h2 className="image-upload-title">Upload Your Image</h2>}
            {currentUser && <input type="file" accept="image/*" onChange={handleImageUpload} className="uploaded-image" />}

            <div className="button-container">
                {currentUser && (
                    <button className="imageuploadbutton" onClick={uploadImage} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                )}
                {currentUser && (
                    <button className="save-text-button" onClick={saveTextInfo} disabled={!currentUser}>
                        Save Text Info
                    </button>
                )}
            </div>

            <div className="color-picker">
                {currentUser && (
                    <label className="color-picker-label" htmlFor="color-select">Choose a background color:</label>
                )}
                {currentUser && (
                    <select id="color-select" onChange={handleColorChange} value={backgroundColor} className="color-select">
                        {colors.map((color) => (
                            <option key={color} value={color} style={{ backgroundColor: color }}>
                                {color}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Font customization controls */}
            <div className="font-border-controls">
                {currentUser && (
                    <>
                        <label htmlFor="font-size">Font Size:</label>
                        <input
                            id="font-size"
                            type="number"
                            min="10"
                            max="40"
                            value={parseInt(fontSize)}
                            onChange={(e) => setFontSize(`${e.target.value}px`)}
                        />

                        <label htmlFor="font-style">Font Style:</label>
                        <select
                            id="font-style"
                            value={fontStyle}
                            onChange={(e) => setFontStyle(e.target.value)}
                        >
                            {fontStyles.map(style => (
                                <option key={style} value={style}>{style}</option>
                            ))}
                        </select>

                        <label htmlFor="font-color">Font Color:</label>
                        <input
                            id="font-color"
                            type="color"
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                        />
                           {/* Border Controls */}
                           <label htmlFor="border-width">Border Width:</label>
                        <input
                            id="border-width"
                            type="number"
                            min="0"
                            max="20"
                            value={parseInt(borderWidth)}
                            onChange={(e) => setBorderWidth(`${e.target.value}px`)}
                        />
<label htmlFor="border-style">Border Style:</label>
                        <select
                            id="border-style"
                            value={borderStyle}
                            onChange={(e) => setBorderStyle(e.target.value)}
                        >
                            {borderStyles.map(style => (
                                <option key={style} value={style}>{style}</option>
                            ))}
                        </select>
                        <label htmlFor="border-color">Border Color:</label>
                        <input
                            id="border-color"
                            type="color"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                        />
                    </>
                )}
            </div>
            <div className="image-upload-container">
            {currentUser && (
                <div 
                    className="border-container" 
                    style={{
                        borderWidth,
                        borderColor,
                        borderStyle,
                        padding: '10px',  // Optional padding inside border
                        display: 'inline-block'  // Ensures the border wraps closely around content
                    }}
                >
 {imageUrl && <img src={imageUrl} alt="Uploaded" className="image-1" />}
 {imageUrl && (
   <div className="image-container-about">
   <p
       className="additionalinfoaboutcontainer"
       style={{
           fontSize,
           fontFamily: fontStyle,
           color: fontColor
       }}
   >
{showFullText ? (
                                    <span className="text-span">{imageInfo}</span>
                                ) : (
                                    <span className="text-span1">{imageInfo.substring(0, 50)}...</span>
                                )}
                                </p>


    </div>




 )}







 

</div>
)}
            </div>
        
                </div>
         
    );
};

export default ImageUpload;
