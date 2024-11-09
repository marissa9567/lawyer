import React, { useState } from 'react';

const Postimagefile = ({ onImageChange }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [imageDataUrl, setImageDataUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            // Check file size (10MB = 10 * 1024 * 1024 bytes)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size exceeds 10MB. Please select a smaller file.');
                setSelectedFile(null); // Reset selected file
                setImageDataUrl(''); // Reset the data URL
                return;
            } else {
                setError(''); // Clear error message if file is valid
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(file); // Store the file object
                setImageDataUrl(reader.result); // Store the data URL for preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageSubmit = () => {
        if (selectedFile) {
            onImageChange(imageDataUrl); // Call the callback with the image data URL
            setSelectedFile(null); // Clear selected file
            setImageDataUrl(''); // Clear data URL
        } else {
            setError('Please select an image before submitting.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageDataUrl && (
                <div>
                    <img src={imageDataUrl} alt="Selected" style={{ width: '100px', height: 'auto' }} />
                    <button onClick={handleImageSubmit}>Submit Image</button>
                </div>
            )}
        </div>
    );
};

export default Postimagefile;
