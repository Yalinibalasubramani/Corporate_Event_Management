import React, { useEffect, useState } from 'react';
import '../assets/admin.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

const Admin = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => 
    {
        axios.get('http://localhost:8080/api/events/get')
            .then(response => 
            {
                setEvents(response.data);
            })
            .catch(error => 
            {
                console.error("There was an error fetching the events!", error);
            });
    };

    const handleEditClick = (event) => {
        setSelectedEvent(event);
        setIsEditDialogOpen(true);
    };

    const handleDeleteClick = (eventId) => {
        axios.delete(`http://localhost:8080/api/events/delete/${eventId}`)
            .then(() => {
                fetchEvents(); // Refresh the events list
            })
            .catch(error => {
                console.error("There was an error deleting the event!", error);
            });
    };

    const handleEditChange = (e) => {
        const { id, value } = e.target;
        setSelectedEvent(prevEvent => ({
            ...prevEvent,
            [id]: value
        }));
    };

    const handleEditSubmit = () => {
        axios.put(`http://localhost:8080/api/events/put/${selectedEvent.id}`, selectedEvent, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            fetchEvents(); // Refresh the events list
            setIsEditDialogOpen(false); // Close the dialog
        })
        .catch(error => {
            console.error("There was an error updating the event!", error);
        });
    };
    

    const handleCloseDialog = () => {
        setIsEditDialogOpen(false);
    };

    return (
        <div>
            <div className="aheader">
                <div className="anavbar-sub">
                    <a href="/homeadmin">All Events</a>
                    <a href="/addevent">Add Event</a>
                    <a href="/bookevent">All Bookings</a>
                    <a href="/admincontact">User Queries</a>
                    <a href="/paid">Payment</a>
                    <a href="/login">Logout</a>
                    <a href="/user">User</a>
                </div>
            </div>
            <div className="eventlist">
                <h3>Event Lists</h3>
                <div className="cards">
                    {events.map((event) => (
                        <Card key={event.id} className="event-card">
                            {event.imageUrl && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={event.imageUrl}
                                    alt={event.eventType}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Event Type: {event.eventType}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    Description: {event.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Total Package: {event.totalPackage}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Participant Count: {event.participantCount}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Charges: ${event.charges}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleEditClick(event)}>Edit</Button>
                                <Button size="small" onClick={() => handleDeleteClick(event.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Edit Event Dialog */}
            {selectedEvent && (
                <Dialog open={isEditDialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="eventType"
                            label="Event Type"
                            type="text"
                            fullWidth
                            value={selectedEvent.eventType}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={selectedEvent.description}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            id="totalPackage"
                            label="Total Package"
                            type="number"
                            fullWidth
                            value={selectedEvent.totalPackage}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            id="participantCount"
                            label="Participant Count"
                            type="number"
                            fullWidth
                            value={selectedEvent.participantCount}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            id="charges"
                            label="Charges"
                            type="number"
                            fullWidth
                            value={selectedEvent.charges}
                            onChange={handleEditChange}
                        />
                        <TextField
                            margin="dense"
                            id="imageUrl"
                            label="Image URL"
                            type="text"
                            fullWidth
                            value={selectedEvent.imageUrl}
                            onChange={handleEditChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button onClick={handleEditSubmit}>Save</Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default Admin;
