import React, { useState, useEffect } from 'react';
import { storage } from '../components/firebase'; // Ensure to import your Firebase storage config
import Patterns from "../components/Patterns";
import { getStorage, uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useAuth } from '../Context/AuthContext';
import { getDatabase, ref as dbRef, set, onValue } from 'firebase/database';

const Post = ({ 
    id, 
    titlecontent, 
    content, 
    titlefontSize, 
    titlefontColor, 
    fontSize, 
    fontColor, 
    borderColor, 
    borderWidth, 
    borderStyle, 
    onDelete, 
    onEdit 
}) => {
    const { currentUser } = useAuth();
    const db = getDatabase();

    const [imageUrl, setImageUrl] = useState('');
    const [imageInfo, setImageInfo] = useState('');
    const [showFullText, setShowFullText] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [isEditing, setIsEditing] = useState(false);
    const [newTitleFontColor, setNewTitleFontColor] = useState(titlefontColor);
    const [newTitleFontSize, setNewTitleFontSize] = useState(titlefontSize);
    const [newFontColor, setNewFontColor] = useState(fontColor);
    const [newFontSize, setNewFontSize] = useState(fontSize);
    const [newBorderColor, setNewBorderColor] = useState(borderColor);
    const [newBorderWidth, setNewBorderWidth] = useState(borderWidth);
    const [newBorderStyle, setNewBorderStyle] = useState(borderStyle);
    const [uploadedImage, setUploadedImage] = useState(''); // Store the uploaded image URL
    const [image, setImage] = useState(null); // Store the selected file
    const [selectedPattern, setSelectedPattern] = useState('');
    const [uploading, setUploading] = useState(false); // Track uploading state

    useEffect(() => {
        const publicImageRef = dbRef(db, 'publicImages/lastUploadedImage');
        onValue(publicImageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setImageUrl(data.url);
                setImageInfo(data.info || '');
                setShowFullText(false);
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

    const uploadImage = async () => {
    if (!image || !currentUser) {
        console.log('No image selected or user is not authenticated');
        return;
    }

    const fileRef = storageRef(storage, `userImages/public/${Date.now()}-${image.name}`);
    setUploading(true);
    try {
        // Upload the file
        await uploadBytes(fileRef, image);
        console.log('File uploaded successfully.');

        // Get the download URL
        const url = await getDownloadURL(fileRef);
        setUploadedImage(url); // Set the uploaded image URL for preview
        console.log('Image URL obtained:', url);

        // Prepare image data with URL and any additional info
        const imageData = {
            url,
            info: imageInfo
        };

        // Save to Firebase Database
        await set(dbRef(db, 'publicImages/lastUploadedImage'), imageData);
        console.log('Image data saved to database:', imageData);
        alert('Image uploaded and saved successfully!');

    } catch (error) {
        console.error('Error during upload or database save:', error.message);
        alert(`Failed to upload image or save data: ${error.message}`);
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
            info: imageInfo
        };

        try {
            await set(dbRef(db, 'publicImages/lastUploadedImage'), imageData);
            alert('Additional information saved successfully!');
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

    const handleSave = () => {
        onEdit(id, {
            titlefontColor: newTitleFontColor,
            titlefontSize: newTitleFontSize,
            fontColor: newFontColor,
            fontSize: newFontSize,
            borderColor: newBorderColor,
            borderWidth: newBorderWidth,
            borderStyle: newBorderStyle,
            imageUrl: uploadedImage, // Save the uploaded image URL here
        });
        setIsEditing(false);
    };

    const handlePatternChange = (event) => {
        setSelectedPattern(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Set the selected file
        }
    };

    return (
        <div className="post" style={{ backgroundImage: `url(${selectedPattern})`, backgroundSize: 'cover' }}>
            {/* Show the uploaded image if available */}
            {uploadedImage && !isEditing && (
                <img src={uploadedImage} alt="Uploaded Post" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            )}
            
            {/* Show the file input and save button only when editing */}
            {isEditing && (
                <div>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    <button onClick={uploadImage} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Save Image'}
                    </button>
                </div>
            )}

            <select onChange={handlePatternChange} value={selectedPattern}>
                <option value="">Select Background Pattern</option>
                {Patterns.map((pattern) => (
                    <option key={pattern.value} value={pattern.url}>
                        {pattern.label}
                    </option>
                ))}
            </select>
            <div style={{ border: `${newBorderWidth}px ${newBorderStyle} ${newBorderColor}`, padding: '10px', margin: '10px' }}>
                <h2 style={{ fontSize: `${newTitleFontSize}px`, color: newTitleFontColor }}>
                    {titlecontent}
                </h2>
                <p style={{ fontSize: `${newFontSize}px`, color: newFontColor }}>
                    {content}
                </p>

                {isEditing ? (
                    <div>
                        <h4>Edit Font and Border Properties:</h4>
                        <div>
                            <label>
                                Title Font Color:
                                <input type="color" value={newTitleFontColor} onChange={(e) => setNewTitleFontColor(e.target.value)} />
                            </label>
                            <label>
                                Title Font Size:
                                <input type="number" value={newTitleFontSize} onChange={(e) => setNewTitleFontSize(e.target.value)} min="1" />
                            </label>
                        </div>
                        <div>
                            <label>
                                Font Color:
                                <input type="color" value={newFontColor} onChange={(e) => setNewFontColor(e.target.value)} />
                            </label>
                            <label>
                                Font Size:
                                <input type="number" value={newFontSize} onChange={(e) => setNewFontSize(e.target.value)} min="1" />
                            </label>
                        </div>
                        <div>
                            <label>
                                Border Color:
                                <input type="color" value={newBorderColor} onChange={(e) => setNewBorderColor(e.target.value)} />
                            </label>
                            <label>
                                Border Width:
                                <input type="number" value={newBorderWidth} onChange={(e) => setNewBorderWidth(e.target.value)} min="0" />
                            </label>
                            <label>
                                Border Style:
                                <select value={newBorderStyle} onChange={(e) => setNewBorderStyle(e.target.value)}>
                                    <option value="solid">Solid</option>
                                    <option value="dashed">Dashed</option>
                                    <option value="dotted">Dotted</option>
                                </select>
                            </label>
                        </div>
                        <button onClick={handleSave}>Save Changes</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
};

export default Post;
