// src/components/VenueList.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../assets/venue.css';
import { VenueContext } from '../context/VenueContext';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const venues = [
  {
    name: 'Grand Hall',
    location: '123 Main Street, Downtown',
    capacity: '500 people',
    amenities: ['AV Equipment', 'Catering', 'Parking'],
    image: 'https://thevendry.com/cdn-cgi/image/height=1280,width=1280,fit=contain,metadata=none/https://s3.amazonaws.com/uploads.thevendry.co/10996/1625591338898_Screen-Shot-2021-07-06-at-1.jpg',
    amount: 5000,
  },
  {
    name: 'Executive Suite',
    location: '456 Corporate Blvd, Financial District',
    capacity: '200 people',
    amenities: ['Conference Room', 'High-Speed Internet', 'Projector'],
    image: 'https://i.pinimg.com/736x/23/a1/a2/23a1a2aa683a059aaaf04386891b0d0b.jpg',
    amount: 3000,
  },
  {
    name: 'Sunset Terrace',
    location: '789 Ocean Drive, Beachfront',
    capacity: '150 people',
    amenities: ['Ocean View', 'Outdoor Seating', 'Live Music'],
    image: 'https://media.timeout.com/images/105239239/750/422/image.jpg',
    amount: 4500,
  },
  {
    name: 'Tech Hub',
    location: '101 Silicon Valley Ave, Tech District',
    capacity: '100 people',
    amenities: ['Wi-Fi', 'VR Setup', '3D Printing'],
    image: 'https://i.pinimg.com/564x/fb/45/83/fb4583ac75ab58820c62fdafc8e446b7.jpg',
    amount: 3500,
  },
  {
    name: 'Skyline Ballroom',
    location: '303 Skyline Blvd, Uptown',
    capacity: '400 people',
    amenities: ['Panoramic View', 'LED Lighting', 'Dance Floor'],
    image: 'https://i.pinimg.com/564x/12/78/39/127839141484e12e08916b765aad12e5.jpg',
    amount: 6000,
  },
  {
    name: 'The Atrium',
    location: '606 Garden Plaza, Central Park',
    capacity: '350 people',
    amenities: ['Glass Roof', 'Indoor Garden', 'Natural Lighting'],
    image: 'https://i.pinimg.com/564x/8e/70/74/8e7074afab3b753b3eb411ef346d0e7d.jpg',
    amount: 4800,
  },
];

const VenueList = () => {
  const { setSelectedVenue } = useContext(VenueContext); // Use the Venue Context
  const navigate = useNavigate();

  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    navigate('/booking'); // Navigate to booking page after selecting the venue
  };

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

      <div className="venue-list">
        <h2>Select a Venue</h2>
        <Box className="venue-list-box">
          {venues.map((venue, index) => (
            <div key={index} className="venue-item">
              <img src={venue.image} alt={venue.name} className="venue-image" />
              <h3>{venue.name}</h3>
              <p>Location: {venue.location}</p>
              <p>Capacity: {venue.capacity}</p>
              <p>Amenities: {venue.amenities.join(', ')}</p>
              <p>Amount: ${venue.amount}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleVenueSelect(venue)}
              >
                Select This Venue
              </Button>
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default VenueList;
