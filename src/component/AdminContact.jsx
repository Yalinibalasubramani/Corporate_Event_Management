import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../assets/adminContact.css';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/contact/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/contact/messages/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessages(messages.filter(message => message.id !== id));
        } else {
          alert('Failed to delete the message');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleMail = (email) => {
    const subject = 'Regarding Your Inquiry';
    const body = 'Hello, \n\nThank you for your inquiry. We will get back to you soon.';
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(mailtoLink, '_blank');
  };
  

  return (
    <div className="admin-contact-container">
      <div className="admin-header">
        <button onClick={() => navigate("/homeadmin")} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <h2>User Queries</h2>
      </div>
      {messages.length > 0 ? (
        <table className="admin-contact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Inquiry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>{message.name}</td>
                <td>{message.phone}</td>
                <td>{message.email}</td>
                <td>{message.inquiry}</td>
                <td>
                  <button onClick={() => handleMail(message.email)} className="mail-button">
                    <FontAwesomeIcon icon={faEnvelope} /> Mail
                  </button>
                  <button onClick={() => handleDelete(message.id)} className="delete-button">
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
};

export default AdminContact;
