import React, { useState, createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));  // Inicializa com o token do localStorage

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);  // Armazena o token no localStorage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');  // Remove o token do localStorage
    };

    const value = {
        token,
        autenticado: !!token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};