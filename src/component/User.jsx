import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/get');
            setUsers(response.data);
        } catch (error) {
            setError("Error fetching users");
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setError("Error deleting user");
        }
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
       
        <div style={{ padding: '20px', backgroundColor: '#333', color: 'white' }}>
            <h2>Manage Users</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>ID</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>Username</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>Email</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>Role</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid white' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{user.id}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{user.username}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{user.email}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>{user.role}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid white' }}>
                                {user.role === 'Organizer' && (
                                    <button 
                                        onClick={() => deleteUser(user.id)} 
                                        style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default AdminUserManagement;
