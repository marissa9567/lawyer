import React, { useEffect, useState, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import ReactMarkdown from 'react-markdown'; // Import if you're rendering markdown
import Stars from '../images/stars.jpg'; 
import yellowdots from '../images/yellowdots.jpg'; 
import coloreddots from '../images/coloreddots.jpg'; 
import flag from '../images/flag.jpg'; 
import greenlight from '../images/greenlight.png'; 
import hobbies from '../images/hobbies.jpg'; 
import mountain from '../images/mountain.jpg'; 
import night from '../images/night.jpg'; 
import political from '../images/political.jpg'; 
import political1 from '../images/political1.jpg'; 
import redtexture from '../images/redtexture.png'; 
import retro from '../images/retrobackground.jpg'; 
import rights from '../images/rights.jpg'; 
import wisemen from '../images/wisemen.jpg'; 
import wood from '../images/wood.jpg';




const AddPost = ({ onAddPost, existingPost, setEditPostId, borderData, onBorderChange }) => {
  const [backgroundPattern, setBackgroundPattern] = useState('none');
  const [isFontOptionsOpen, setIsFontOptionsOpen] = useState(false);
  const [isBackgroundOptionsOpen, setIsBackgroundOptionsOpen] = useState(false);
  const [isBorderOptionsOpen, setIsBorderOptionsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('#000000');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontStyle, setFontStyle] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [customImageURL, setCustomImageURL] = useState('');
  const [imageSize, setImageSize] = useState({ width: 100, height: 100, x: 0, y: 0 });
  const [previewImage, setPreviewImage] = useState(null);
  const [title, setTitle] = useState('');
  
  const auth = getAuth();
  const [user, setUser] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    articleUrl: '',
    titleFontColor: '#000000',
    titleFontSize: '16',
    contentFontColor: '#000000',
    contentFontSize: '16',
    category: '',
    backgroundPattern: 'none',
    imagePreview: null,
    borderStyle: 'solid',
    borderWidth: '2',
    borderColor: '#000000',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (existingPost) {
      setFormData(existingPost);
    } else {
      resetForm();
    }
  }, [existingPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Form Data Submitted:', formData); // Log the form data
    onAddPost(formData); // Call the function passed as prop
    resetForm(); // Reset form after submission
    setEditPostId(null); // Reset editPostId after submission
  };

  const resetForm = () => {
    setImage(null);
    setSelectedImage(null);
    setFontSize(16);
    setFontStyle('Arial');
    setFontColor('#000000');
    setBackgroundPattern('none');
    setCustomImageURL('');
    setBorderStyle('solid');
    setBorderWidth(2);
    setBorderColor('#000000');
    setContent('');
    setFormData({
      title: '',
      content: '',
      imageUrl: '',
      articleUrl: '',
      titleFontColor: '#000000',
      titleFontSize: '16',
      contentFontColor: '#000000',
      contentFontSize: '16',
      category: '',
      backgroundPattern: 'none',
      imagePreview: null,
      borderStyle: 'solid',
      borderWidth: '2',
      borderColor: '#000000',
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleBackgroundPatternChange = (e) => {
    setBackgroundPattern(e.target.value);
    setFormData(prev => ({
      ...prev,
      backgroundPattern: e.target.value,
    }));
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const toggleFontOptions = () => {
    setIsFontOptionsOpen(!isFontOptionsOpen);
  };

  const toggleBackgroundOptions = () => {
    setIsBackgroundOptionsOpen(!isBackgroundOptionsOpen);
  };

  const toggleBorderOptions = () => {
    setIsBorderOptionsOpen(!isBorderOptionsOpen);
  };

  const getBackgroundPatternStyle = (pattern) => {
    switch (pattern) {
      case 'yellowdots':
        return `url(${yellowdots})`;
      case 'stars':
        return `url(${Stars})`;
      case 'coloreddots':
        return `url(${coloreddots})`;
      case 'flag':
        return `url(${flag})`;
      case 'greenlight':
        return `url(${greenlight})`;
      case 'hobbies':
        return `url(${hobbies})`;
      case 'mountain':
        return `url(${mountain})`;
      case 'night':
        return `url(${night})`;
      case 'political':
        return `url(${political})`;
      case 'political1':
        return `url(${political1})`;
      case 'redtexture':
        return `url(${redtexture})`;
      case 'retro':
        return `url(${retro})`;
      case 'rights':
        return `url(${rights})`;
      case 'wisemen':
        return `url(${wisemen})`;
      case 'wood':
        return `url(${wood})`;
      default:
        return 'none';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        style={{ color: formData.titleFontColor, fontSize: `${formData.titleFontSize}px` }}
        required
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
        style={{ color: formData.contentFontColor, fontSize: `${formData.contentFontSize}px` }}
        required
      />
      
      {/* Font Options for Title */}
      <h4>Title Font Options</h4>
      <input
        type="color"
        name="titleFontColor"
        value={formData.titleFontColor}
        onChange={handleChange}
      />
      <input
        type="number"
        name="titleFontSize"
        value={formData.titleFontSize}
        onChange={handleChange}
        min="10"
        max="72"
      />
      <select
        name="titleFontStyle"
        value={formData.titleFontStyle}
        onChange={handleChange}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>

      {/* Font Options for Content */}
      <h4>Content Font Options</h4>
      <input
        type="color"
        name="contentFontColor"
        value={formData.contentFontColor}
        onChange={handleChange}
      />
      <input
        type="number"
        name="contentFontSize"
        value={formData.contentFontSize}
        onChange={handleChange}
        min="10"
        max="72"
      />
      <select
        name="contentFontStyle"
        value={formData.contentFontStyle}
        onChange={handleChange}
      >
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>

      {/* Background Pattern Options */}
      <button type="button" onClick={toggleBackgroundOptions}>Toggle Background Options</button>
      {isBackgroundOptionsOpen && (
        <div>
          <select onChange={handleBackgroundPatternChange} value={backgroundPattern}>
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
      )}

      {/* Border Options */}
      <button type="button" onClick={toggleBorderOptions}>Toggle Border Options</button>
      {isBorderOptionsOpen && (
        <div>
          <input
            type="color"
            name="borderColor"
            value={formData.borderColor}
            onChange={handleChange}
          />
           <label>
                Border Width:
                <input type="number" name="borderWidth" value={borderData.borderWidth} onChange={onBorderChange} />
            </label>
            <label>
                Border Style:
                <select name="borderStyle" value={borderData.borderStyle} onChange={onBorderChange}>
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                </select>
            </label>
            <label>
                Border Color:
                <input type="color" name="borderColor" value={borderData.borderColor} onChange={onBorderChange} />
            </label>

          <select
            name="borderStyle"
            value={formData.borderStyle}
            onChange={handleChange}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
          <input
            type="number"
            name="borderWidth"
            value={formData.borderWidth}
            onChange={handleChange}
            min="1"
          />
        </div>
      )}

      <button type="submit">Save Post</button>

      {/* Display background based on selection */}
      <div
        style={{
          background: getBackgroundPatternStyle(formData.backgroundPattern),
          border: `${formData.borderWidth}px ${formData.borderStyle} ${formData.borderColor}`,
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <h2 style={{ color: formData.titleFontColor, fontSize: `${formData.titleFontSize}px`, fontFamily: formData.titleFontStyle }}>{formData.title}</h2>
        <div style={{ fontSize: `${formData.contentFontSize}px`, color: formData.contentFontColor, fontFamily: formData.contentFontStyle }}>
          <ReactMarkdown>{formData.content}</ReactMarkdown>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
