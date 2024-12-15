import React, { useState, useEffect } from 'react';
import '../assets/bookingcard.css';
import { Card, CardContent, Typography, CardActions, Button, Select, MenuItem } from '@mui/material';

const BookingCards = () => {
    const [bookings, setBookings] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/bookings')
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleStatusChange = (id, status) => {
        fetch(`http://localhost:8080/api/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookingStatus: status }),
        })
        .then(response => response.json())
        .then(updatedBooking => {
            const updatedBookings = bookings.map(booking =>
                booking.id === id ? updatedBooking : booking
            );
            setBookings(updatedBookings);
        })
        .catch(error => console.error('Error updating status:', error));
    };

    const handleEditClick = (id) => {
        setEditId(id);
    };

    const handleSaveClick = () => {
        setEditId(null);
    };

    const handleDeleteClick = (id) => {
        fetch(`http://localhost:8080/api/bookings/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setBookings(bookings.filter(booking => booking.id !== id));
        })
        .catch(error => console.error('Error deleting booking:', error));
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending':
                return { color: 'orange' };
            case 'Verified':
                return { color: 'blue' };
            case 'Confirmed':
                return { color: 'green' };
            default:
                return { color: 'black' };
        }
    };

    return (
        <div>
            <div className="aheader">
                <div className='anavbar-sub'>
                    <a href="/homeadmin">All Events</a>
                    <a href="/addevent">Add Event</a>
                    <a href="/bookevent">All Bookings</a>
                    <a href="/admincontact">User Queries</a>
                    <a href="/paid">Payment</a>
                    <a href="/admincontact">Logout</a>
                    <a href="/user">User</a>
                </div>
            </div>
            <div className="cards">
                {bookings.map((booking) => (
                    <Card className="booking-card" key={booking.id}>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>
                                Booking ID: {booking.id}
                            </Typography>
                            <Typography variant="body1">
                                Event Name: {booking.eventName}
                            </Typography>
                            <Typography variant="body1">
                                Venue Name: {booking.venueName}
                            </Typography>
                            <Typography variant="body1">
                                Name: {booking.name}
                            </Typography>
                            <Typography variant="body1">
                                Email: {booking.email}
                            </Typography>
                            <Typography variant="body1">
                                Company: {booking.company}
                            </Typography>
                            <Typography variant="body1">
                                Number of Attendees: {booking.attendees}
                            </Typography>
                            <Typography variant="body1">
                                Event Date: {new Date(booking.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body1">
                                Special Requests: {booking.requests}
                            </Typography>
                            <Typography variant="body1" style={getStatusStyle(booking.bookingStatus)}>
                                Booking Status:
                                {editId === booking.id ? (
                                    <Select
                                        value={booking.bookingStatus}
                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        sx={{ marginLeft: '10px' }}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Verified">Verified</MenuItem>
                                        <MenuItem value="Confirmed">Confirmed</MenuItem>
                                    </Select>
                                ) : (
                                    <span style={{ marginLeft: '10px' }}>{booking.bookingStatus}</span>
                                )}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {editId === booking.id ? (
                                <Button size="small" onClick={handleSaveClick}>Save</Button>
                            ) : (
                                <Button size="small" onClick={() => handleEditClick(booking.id)}>Edit</Button>
                            )}
                            <Button size="small" onClick={() => handleDeleteClick(booking.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BookingCards;
