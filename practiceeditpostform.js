import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore'; 
import { storage } from '../components/firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../components/firebase'; 

const CollapsibleEditPostForm = ({ editFormData, setEditFormData, onChange, post }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(editFormData.imageUrl);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                const imageUrl = await getDownloadURL(storageRef);
                setEditFormData(prev => ({ ...prev, imageUrl }));
                setPreviewImage(imageUrl);
            } catch (error) {
                console.error("Error uploading image: ", error);
                alert("Failed to upload image.");
            }
        } else {
            alert("Please upload a valid image file.");
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const postRef = doc(db, 'posts', post.id);
    
        const updateData = Object.fromEntries(
            Object.entries(editFormData).filter(([_, value]) => value !== undefined)
        );
    
        try {
            await updateDoc(postRef, updateData);
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Error updating post: ", error);
            alert("Error updating post: " + error.message);
        }
    };

    return (
        <div className="collapsible-container">
            <button onClick={toggleOpen}>
                {isOpen ? 'Hide Edit Form' : 'Show Edit Form'}
            </button>
            {isOpen && (
                <form onSubmit={handleEditSubmit} className="editpostform-container">
                    <label>
                        Title:
                        <input type="text" name="title" value={editFormData.title} onChange={onChange} />
                    </label>
                    <label>
                        Title Font Color:
                        <input type="color" name="titleFontColor" value={editFormData.titleFontColor} onChange={onChange} />
                    </label>
                    <label>
                        Title Font Style:
                        <select name="titleFontStyle" value={editFormData.titleFontStyle} onChange={onChange}>
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="bold">Bold</option>
                        </select>
                    </label>
                    <label>
                        Title Font Size:
                        <input type="number" name="titleFontSize" value={editFormData.titleFontSize} onChange={onChange} />
                    </label>
                    <label>
                        Content:
                        <textarea name="content" value={editFormData.content} onChange={onChange} />
                    </label>
                    <label>
                        Content Font Color:
                        <input type="color" name="contentFontColor" value={editFormData.contentFontColor} onChange={onChange} />
                    </label>
                    <label>
                        Content Font Style:
                        <select name="contentFontStyle" value={editFormData.contentFontStyle} onChange={onChange}>
                            <option value="normal">Normal</option>
                            <option value="italic">Italic</option>
                            <option value="bold">Bold</option>
                        </select>
                    </label>
                    <label>
                        Content Font Size:
                        <input type="number" name="contentFontSize" value={editFormData.contentFontSize} onChange={onChange} />
                    </label>
                    <label>
                        Upload Image:
                        <input type="file" onChange={handleImageChange} />
                    </label>
                    {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100px', height: 'auto' }} />}
                    <label>
                        Article Image URL:
                        <input type="text" name="imageUrl" value={editFormData.imageUrl} onChange={onChange} />
                    </label>
                    <label>
                        Article URL:
                        <input type="text" name="articleUrl" value={editFormData.articleUrl} onChange={onChange} />
                    </label>
                    <label>
                        Background Pattern:
                        <select name="backgroundPattern" value={editFormData.backgroundPattern} onChange={onChange}>
                            <option value="none">None</option>
                            <option value="yellowdots">Yellow Dots</option>
                            <option value="stars">Stars</option>
                            {/* Add other patterns here */}
                        </select>
                    </label>
                    <label>
                        Border Width:
                        <input type="number" name="borderWidth" value={editFormData.borderWidth} onChange={onChange} />
                    </label>
                    <label>
                        Border Style:
                        <select name="borderStyle" value={editFormData.borderStyle} onChange={onChange}>
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                            <option value="dotted">Dotted</option>
                        </select>
                    </label>
                    <label>
                        Border Color:
                        <input type="color" name="borderColor" value={editFormData.borderColor} onChange={onChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default CollapsibleEditPostForm;
