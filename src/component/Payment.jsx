import React, { useState } from 'react';
import '../assets/payment.css';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const Navigate=new useNavigate('');

  const validateForm = () => {
    const newErrors = {};

    // Validate cardholder's name
    if (!cardholder) newErrors.cardholder = "Cardholder's name is required";

    // Validate card number
    if (!cardNumber.match(/^\d{4} \d{4} \d{4} \d{4}$/)) {
      newErrors.cardNumber = 'Card number must be in format XXXX XXXX XXXX XXXX';
    }

    // Validate expiry date
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Expiry date must be in format MM/YY';
    } else {
      const [month, year] = expiry.split('/').map(Number);
      const expiryDate = new Date(`20${year}`, month - 1);
      const currentDate = new Date();
      if (expiryDate <= currentDate) {
        newErrors.expiry = 'Card is expired';
      }
    }

    // Validate CVV
    if (!cvv.match(/^\d{3}$/)) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const paymentData = {
        cardholderName: cardholder,
        amount: parseFloat(amount)
      };
      
  
      try {
        const response = await axios.post('http://localhost:8080/api/payments', paymentData);
        if (response.status === 200) {
          alert('Payment successful!');
          Navigate('/my-events');
        }
      } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
      }
    }
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
      <div className="payment-background">
        <div className="payment-container">
          <h2 className="payment-title">Payments</h2>
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="payment-input-group">
              <label htmlFor="cardholder">Cardholder's Name</label>
              <input
                id="cardholder"
                className="payment-input"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
                placeholder="Name On Card"
              />
              {errors.cardholder && <div className="payment-error">{errors.cardholder}</div>}
            </div>
            <div className="payment-input-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                className="payment-input"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                pattern="\d{4} \d{4} \d{4} \d{4}"
                maxLength="19"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^\d\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                }}
              />
              {errors.cardNumber && <div className="payment-error">{errors.cardNumber}</div>}
            </div>
            <div className="payment-row">
              <div className="payment-column">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  className="payment-input-small"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  pattern="\d{2}/\d{2}"
                  maxLength="5"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d/]/g, '');
                  }}
                />
                {errors.expiry && <div className="payment-error">{errors.expiry}</div>}
              </div>
              <div className="payment-column">
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  className="payment-input-small"
                  type='password'
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  pattern="\d{3}"
                  maxLength="3"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                  }}
                />
                {errors.cvv && <div className="payment-error">{errors.cvv}</div>}
              </div>
            </div>
            <div className="payment-input-group">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                className="payment-input"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                onInput={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
              />
              {errors.amount && <div className="payment-error">{errors.amount}</div>}
            </div>
            <button className="payment-button" type="submit">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
