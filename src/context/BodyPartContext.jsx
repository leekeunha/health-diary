import React, { createContext, useState, useContext } from 'react';

const BodyPartContext = createContext();

export function BodyPartContextProvider({ children }) {
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);

    return (
        <BodyPartContext.Provider value={{
            selectedBodyPart,
            setSelectedBodyPart,
        }}>
            {children}
        </BodyPartContext.Provider>
    );
}

export function useBodyPartContext() {
    return useContext(BodyPartContext);
}