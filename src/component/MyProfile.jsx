import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../assets/profile.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log('User ID:', userID);

        if (!userID) {
            navigate('/login');
        } else {
            axios.get(`http://localhost:8080/api/users/${userID}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    navigate('/login');
                });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userID');
        navigate('/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main1">
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
                        <Link to="/login" data-title="Logout" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="profile-container">
                <h1>My Profile</h1>
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile:</strong> {user.mobile}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
