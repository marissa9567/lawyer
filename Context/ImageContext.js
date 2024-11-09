import React, { createContext, useContext, useState } from 'react';

const ImageContext = createContext();

export const useImage = () => {
    return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
    const [imageUrl, setImageUrl] = useState('');

    return (
        <ImageContext.Provider value={{ imageUrl, setImageUrl }}>
            {children}
        </ImageContext.Provider>
    );
};
