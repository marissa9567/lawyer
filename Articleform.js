import React, { useState } from 'react';

const ArticleForm = ({ addArticle }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle({ title, url, image });
    setTitle('');
    setUrl('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <input 
        type="url" 
        placeholder="URL" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Image URL" 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
        required 
      />
      <button type="submit">Add Article</button>
    </form>
  );
};

export default ArticleForm;
