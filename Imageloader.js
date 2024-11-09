import React, { useState } from 'react';
import { uploadImage } from './firebase'; // Adjust path as necessary

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState('');
  const [file, setFile] = useState(null); // Store the file
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile); // Save the selected file for later use
      setImage(URL.createObjectURL(selectedFile)); // Preview the image
      setImageSize(formatBytes(selectedFile.size)); // Get and format the file size
      setError(null); // Reset any previous errors
    }
  };

  const saveImage = async () => {
    if (file) {
      try {
        await uploadImage(file); // Call the upload function
        setUploadSuccess(true);
      } catch (error) {
        setError("Upload failed: " + error.message); // Handle upload error
      }
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />}
      {imageSize && <p>Image Size: {imageSize}</p>}
      <button onClick={saveImage} disabled={!file}>Save Image</button>
      {uploadSuccess && <p>Image uploaded successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
