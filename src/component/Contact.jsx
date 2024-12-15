import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number must be 10 digits";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.inquiry) {
      tempErrors.inquiry = "Inquiry is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:8080/api/contact/postquery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Form submitted successfully!');
          setFormData({
            name: '',
            phone: '',
            email: '',
            inquiry: ''
          });
        } else {
          alert('Failed to submit the form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
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

      <div className="contact-container">
        <header className="contact-header">
          <h3>LET'S CONNECT</h3>
        </header>
        <section className="contact-content">
          <p>
            Casara is at the forefront of a brand experience renaissance. Move over traditional event planning – today’s audiences crave immersive experiences that forge lasting connections and leave a lasting impact. We know that the current landscape is ripe for reinvention, and we’re leading the charge with epic execution.
          </p>
          <p>
            If you’re a brand seeking to break through the noise or a visionary who wants to partner with us on groundbreaking ideas, this is your moment to be part of something bigger.
          </p>
          <p>
            Reach out to us, and let’s redefine what brand experiences can be.
          </p>
        </section>
        <section className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Your full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label htmlFor="phone">Your phone number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <label htmlFor="email">Your email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label htmlFor="inquiry">Type your inquiry here</label>
            <textarea
              id="inquiry"
              name="inquiry"
              value={formData.inquiry}
              onChange={handleChange}
            ></textarea>
            {errors.inquiry && <p className="error">{errors.inquiry}</p>}

            <button type="submit">Submit</button>
          </form>
        </section>
        <footer className="contact-footer">
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div className="footer-contact">
            <p>&copy; 2024 Casara. All Rights Reserved.</p>
            <p>
              Contact us: <a href="mailto:contact@tantraa.com">contact@tantraa.com</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Contact;
