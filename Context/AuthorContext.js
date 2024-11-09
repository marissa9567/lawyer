// src/Context/AuthorContext.js
import React, { createContext, useState } from 'react';

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
    const [authorInfo, setAuthorInfo] = useState({ info: "Default author information here.", imageUrl: "" });

    return (
        <AuthorContext.Provider value={{ authorInfo, setAuthorInfo }}>
            {children}
        </AuthorContext.Provider>
    );
};
