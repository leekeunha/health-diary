import React, { createContext, useState, useContext } from 'react';

const SportContext = createContext();

export const useSport = () => useContext(SportContext);

export const SportContextProvider = ({ children }) => {
    const [currentSport, setCurrentSport] = useState(null);

    return (
        <SportContext.Provider value={{ currentSport, setCurrentSport }}>
            {children}
        </SportContext.Provider>
    );
};
