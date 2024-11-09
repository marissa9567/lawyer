import React, { useState } from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ onCropComplete }) => {
  const [crop, setCrop] = useState({ unit: 'px', width: 30, height: 30 });
  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropCompleteInternal = (crop) => {
    if (imageRef && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scaleX = imageRef.naturalWidth / imageRef.width;
      const scaleY = imageRef.naturalHeight / imageRef.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.drawImage(
        imageRef,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        onCropComplete(blob); // Pass the cropped image back to WritePost
      }, 'image/jpeg');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {src && (
        <Cropper
          src={src}
          crop={crop}
          onCropChange={setCrop}
          onImageLoaded={setImageRef}
          onComplete={onCropCompleteInternal}
        />
      )}
    </div>
  );
};

export default ImageCropper;
