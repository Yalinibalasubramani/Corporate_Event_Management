import React, { useContext } from 'react';
import '../assets/eventdetail.css';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

const EventDetail = ({ event, onClose }) => {
    const navigate = useNavigate();
    const { setSelectedEvent } = useContext(BookingContext);

    if (!event) return null;

    const handleBookNow = () => {
        setSelectedEvent(event); // Set the selected event
        navigate('/venue-list'); // Navigate to the venue page
    };

    return (
        <div className="event-detail-popup-content">
            <button className="close-button" onClick={onClose}>×</button>
            <img src={event.imageUrl} alt={event.eventType} className="event-detail-image" />
            <div className="event-detail-content">
                <h2 className="event-detail-name">{event.eventType}</h2>
                <p className="event-detail-description">{event.description}</p>
                <p className="event-detail-charges">Approx Charges: {event.charges}</p>
                <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
            </div>
        </div>
    );
};

export default EventDetail;
