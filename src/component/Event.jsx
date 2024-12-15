import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/events.css';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import EventDetail from './EventDetails';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/events/get')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    const filteredEvents = events.filter(event =>
        event.eventType.toLowerCase().includes('')
    );

    return (
        <div className='main'>
            <nav className="navbar">
                <div className="navbar-brand">Casara</div>
                <ul className="nav-links">
                    <li>
                        <Link to="/home" data-title="Home">
                            <FontAwesomeIcon icon={faHome} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" data-title="About">
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" data-title="Contact">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/events" data-title="Our Events">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </Link>
                    </li>
                    <li className="profile-dropdown">
                        <FontAwesomeIcon icon={faUser} />
                        <div className="dropdown-content">
                            <Link to="/my-events" data-title="My Events">My Events</Link>
                            <Link to="/my-profile" data-title="My Profile">My Profile</Link>
                        </div>
                    </li>
                    <li>
                        <Link to="/login" data-title="Logout">
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="events-container">
                {filteredEvents.map(event => (
                    <div 
                        key={event.id} 
                        className="event-card" 
                        onClick={() => handleEventClick(event)}
                    >
                        <img src={event.imageUrl} alt={event.eventType} className="event-image" />
                        <h3 className="event-name">{event.eventType}</h3>
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <div className="event-detail-popup">
                    <EventDetail event={selectedEvent} onClose={handleClose} />
                </div>
            )}
        </div>
    );
};

export default Events;
