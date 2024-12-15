import React, { createContext, useState } from 'react';

export const VenueContext = createContext();

export const VenueProvider = ({ children }) => {
    const [selectedVenue, setSelectedVenue] = useState(null);

    return (
        <VenueContext.Provider value={{ selectedVenue, setSelectedVenue }}>
            {children}
        </VenueContext.Provider>
    );
};
