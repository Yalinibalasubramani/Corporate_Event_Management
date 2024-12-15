import React, { useEffect, useState } from 'react';
import '../assets/PaymentManagement.css';

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/payments');
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    const deletePayment = async (id) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/payments/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Payment deleted successfully');
                    loadPayments(); // Reload payments after deletion
                } else {
                    alert('Failed to delete payment');
                }
            } catch (error) {
                console.error('Error deleting payment:', error);
            }
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
            <a href="/login">Logout</a>
            <a href="/user">User</a>
        </div>
    </div>
        <div className="payment-management">
            <h2>Payment Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cardholder Name</th>
                        <th>Amount</th>
                        <th>Booking Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map(payment => (
                        <tr key={payment.id}>
                            <td>{payment.id}</td>
                            <td>{payment.cardholderName}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.bookingDetails}</td>
                            <td>
                                <button onClick={() => deletePayment(payment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default PaymentManagement;
