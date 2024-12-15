import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/bookingstatus.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const BookingStatus = () => {
    const [bookings, setBookings] = useState([]);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        fetch(`http://localhost:8080/api/bookings/user/${userID}`)
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, [userID]);

    console.log('UserID:', userID);
    return (

        <div className='booking-status-main'>
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

            <div className="booking-status-content">
                <h2>Your Booked Events</h2>
                {bookings.length === 0 ? (
                    <p>You have no booked events.</p>
                ) : (
                    <ul className="booking-list">
                        {bookings.map((booking) => (
                            <li key={booking.id} className={`booking-item booking-status-${booking.bookingStatus.toLowerCase()}`}>
                                <h3>{booking.eventName}</h3>
                                <p><strong>Venue:</strong> {booking.venueName}</p>
                                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {booking.bookingStatus}</p>
                                <Link to={`/payment`} className="payment-link">
                                    {booking.bookingStatus === 'Pending' && 'Make Advance Payment'}
                                    {booking.bookingStatus === 'Verified' && 'Complete Payment'}
                                </Link>
                                    {booking.bookingStatus === 'Confirmed' && 'Booking Confirmed'}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BookingStatus;
