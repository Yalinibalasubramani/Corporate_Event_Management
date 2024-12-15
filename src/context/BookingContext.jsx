import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <BookingContext.Provider value={{ selectedEvent, setSelectedEvent }}>
            {children}
        </BookingContext.Provider>
    );
};
