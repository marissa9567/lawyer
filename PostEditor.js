import React, { useState } from 'react';

const PostEditor = ({ postData, onSave, onCancel }) => {
    const [newData, setNewData] = useState({ ...postData }); // Clone initial data

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(newData); // Save the new data
    };

    return (
        <div>
            <h3>Edit Post</h3>
            <input
                type="text"
                name="titleContent"
                value={newData.titleContent}
                onChange={handleChange}
                placeholder="Title"
            />
            <textarea
                name="content"
                value={newData.content}
                onChange={handleChange}
                placeholder="Content"
            />
            <input
                type="text"
                name="articleImageUrl"
                value={newData.articleImageUrl}
                onChange={handleChange}
                placeholder="Image URL"
            />
            <input
                type="number"
                name="borderSize"
                value={newData.borderSize}
                onChange={handleChange}
                placeholder="Border Size"
            />
            <input
                type="color"
                name="borderColor"
                value={newData.borderColor}
                onChange={handleChange}
            />
            <select
                name="borderStyle"
                value={newData.borderStyle}
                onChange={handleChange}
            >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
            </select>
            <input
                type="number"
                name="fontSize"
                value={newData.fontSize}
                onChange={handleChange}
                placeholder="Font Size (px)"
            />
            <input
                type="color"
                name="fontColor"
                value={newData.fontColor}
                onChange={handleChange}
            />
            <input
                type="text"
                name="backgroundImage"
                value={newData.backgroundImage}
                onChange={handleChange}
                placeholder="Background Image URL"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default PostEditor;
