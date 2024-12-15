import React, { useState } from "react";
import '../assets/addevent.css';
import { Button } from "@mui/material";
import axios from "axios";

const Addevent = () => {
    const [data, setData] = useState({
        eventType: "",
        description: "",
        totalPackage: "",
        participantCount: "",
        charges: "",
        imageUrl: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [id]: id === "totalPackage" || id === "participantCount" || id === "charges"
                ? parseFloat(value) || ""
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validate(data)) {
            try {
                console.log("Submitting event data:", data);
                const response = await axios.post('http://localhost:8080/api/events/post', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log("Event added successfully:", response.data);
                alert("Event added to event list");
                setData({
                    eventType: "",
                    description: "",
                    totalPackage: "",
                    participantCount: "",
                    charges: "",
                    imageUrl: ""
                });
                setError("");
            } catch (error) {
                console.error("Error:", error);
                setError("Failed to add event: " + (error.response?.data || error.message));
            }
        } else {
            setError("Validation failed");
        }
    };
    
    const validate = (e) => {
        let isValid = true;
        let errormsg = "";
        
        if (!e.eventType.trim()) {
            isValid = false;
            errormsg += "Event Type is required. ";
        }
        if (!e.description.trim()) {
            isValid = false;
            errormsg += "Description is required. ";
        }
        if (!e.totalPackage || isNaN(parseFloat(e.totalPackage))) {
            isValid = false;
            errormsg += "Total Package is required and must be a number. ";
        }
        if (!e.participantCount || isNaN(parseFloat(e.participantCount))) {
            isValid = false;
            errormsg += "Participant Count is required and must be a number. ";
        }
        if (!e.charges || isNaN(parseFloat(e.charges))) {
            isValid = false;
            errormsg += "Charges are required and must be a number. ";
        }
    
        setError(errormsg.trim());
        return isValid;
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
                    <a href="/login">Logout</a>
                    <a href="/user">User</a>
                </div>
            </div>
            <div className="eventform">
                <form className="addeveform" onSubmit={handleSubmit}>
                    <h2>Add Event</h2>
                    <div className="type">
                        <label htmlFor="eventType">Event Type</label>
                        <input type="text" id="eventType" value={data.eventType} onChange={handleChange} />
                    </div>
                    <div className="desc">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            id="description" 
                            value={data.description} 
                            onChange={handleChange} 
                            rows="10" // Increase or adjust this value as needed
                        />
                    </div>
                    <div className="package">
                        <label htmlFor="totalPackage">Total Package</label>
                        <input type="number" id="totalPackage" value={data.totalPackage} onChange={handleChange} />
                    </div>
                    <div className="count">
                        <label htmlFor="participantCount">Participants Count</label>
                        <input type="number" id="participantCount" value={data.participantCount} onChange={handleChange} />
                    </div>
                    <div className="charges">
                        <label htmlFor="charges">Charges</label>
                        <input type="number" id="charges" value={data.charges} onChange={handleChange} />
                    </div>
                    <div className="imageUrl">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" id="imageUrl" value={data.imageUrl} onChange={handleChange} />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <Button type="submit">Add Event</Button>
                </form>
            </div>
        </div>
    );
}

export default Addevent;
