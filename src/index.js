import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BookingProvider } from './context/BookingContext';
import { EventProvider } from './context/EventContext';
import { VenueProvider } from './context/VenueContext';

ReactDOM.render(
  <React.StrictMode>
    <BookingProvider>
      <EventProvider>
        <VenueProvider>
            <App />
        </VenueProvider>
      </EventProvider>
    </BookingProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
