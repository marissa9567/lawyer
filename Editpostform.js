import React, { useEffect } from 'react';

const EditPostForm = ({ editFormData, setEditFormData, onChange, post, onUpdatePost }) => {

    // Update the form data when a new post is passed
    useEffect(() => {
        if (post) {
            setEditFormData({
                title: post.title || '',
                content: post.content || '',
                imageUrl: post.imageUrl || '',
                articleUrl: post.articleUrl || '',
                titleFontColor: post.titleFontColor || '#000000',
                titleFontStyle: post.titleFontStyle || 'normal',
                titleFontSize: post.titleFontSize || 16,
                contentFontColor: post.contentFontColor || '#000000',
                contentFontStyle: post.contentFontStyle || 'normal',
                contentFontSize: post.contentFontSize || 14,
                backgroundPattern: post.backgroundPattern || 'none',
                borderWidth: post.borderWidth || 1,
                borderStyle: post.borderStyle || 'solid',
                borderColor: post.borderColor || '#000000',
            });
        }
    }, [post, setEditFormData]);

    // Handle form submission
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedPost = {
            ...post,
            ...editFormData,
        };
        if (typeof onUpdatePost === 'function') { // Check if the function is passed correctly
            onUpdatePost(updatedPost); // Pass the updated post back to the parent component
        } else {
            console.error('onUpdatePost is not a function'); // Log an error if it's not a function
        }
    };

    return (
        <form onSubmit={handleEditSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    name="content"
                    value={editFormData.content}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={editFormData.imageUrl}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Article URL:</label>
                <input
                    type="text"
                    name="articleUrl"
                    value={editFormData.articleUrl}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Title Font Color:</label>
                <input
                    type="color"
                    name="titleFontColor"
                    value={editFormData.titleFontColor}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Title Font Size:</label>
                <input
                    type="number"
                    name="titleFontSize"
                    value={editFormData.titleFontSize}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Title Font Style:</label>
                <input
                    type="text"
                    name="titleFontStyle"
                    value={editFormData.titleFontStyle}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Content Font Color:</label>
                <input
                    type="color"
                    name="contentFontColor"
                    value={editFormData.contentFontColor}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Content Font Size:</label>
                <input
                    type="number"
                    name="contentFontSize"
                    value={editFormData.contentFontSize}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Content Font Style:</label>
                <input
                    type="text"
                    name="contentFontStyle"
                    value={editFormData.contentFontStyle}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Background Pattern:</label>
                <input
                    type="text"
                    name="backgroundPattern"
                    value={editFormData.backgroundPattern}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Border Width:</label>
                <input
                    type="number"
                    name="borderWidth"
                    value={editFormData.borderWidth}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Border Color:</label>
                <input
                    type="color"
                    name="borderColor"
                    value={editFormData.borderColor}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Border Style:</label>
                <input
                    type="text"
                    name="borderStyle"
                    value={editFormData.borderStyle}
                    onChange={onChange}
                />
            </div>
            <button type="submit">Update Post</button>
        </form>
    );
};

export default EditPostForm;
