import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/about.css';
import eventImage from '../assets/event-image.jpg';

const About = () => {
  return (
    <div className="main">
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

      <div className="about-container">
        <header className="about-header">
          <h1>About Us</h1>
        </header>

        <section className="about-section">
          <h2>What Do We Do</h2>
          <div className="what-we-do">
            <img src={eventImage} alt="Event" className="what-we-do-image" />
            <div className="what-we-do-content">
              <ul>
                <li>Corporate Calendar Events</li>
                <li>Promotions & Launches</li>
                <li>Exhibitions Stall Designing</li>
                <li>Event Marketing – Outdoor Media, Radio, Mall Display, Product Branding</li>
                <li>Brand Affiliations & Acquisitions</li>
                <li>Social Events</li>
                <li>Event Travel Services</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section our-company-section">
          <h2>Our Company</h2>
          <p>
            Established in 2010, we pride ourselves with having delivered over 500 wow experiences and leaving an indelible nationwide footprint. Our team of passionate planners, strategists, and creatives excels in crafting events that drive brand action.
            What sets us apart is our commitment to forging enduring relationships with our partners. At the heart of Tantraa is a team of 100+ professionals who tirelessly work to ensure every aspect of an event unfolds precisely as planned, forging enduring partnerships that go way beyond individual projects.
          </p>
        </section>

        <section className="about-section mission-section">
          <h2 style={{textAlign:'center',fontSize:'40px'}}>Our Mission</h2>
          <div className="mission-content">
            <div className="menu">
              <h3>WE FOLLOW THREE STRAIGHTFORWARD RULES OF THUMB</h3>
              <p>THINK OUT OF THE BOX</p>
              <p>ALWAYS BE PREPARED</p>
              <p>DOMINATE THE DETAILS!</p>
            </div>
            <div className="we-are-on-a-mission">
              <h3>WE ARE ON A MISSION</h3>
              <p>
                To push the boundaries and set new standards for brand experiences. We break the mold with boundless creativity, innovation and a razor sharp execution for every project that we take on.
              </p>
            </div>
            <div className="what-sets-us-apart">
              <h3>WHAT SETS US APART</h3>
              <p>
                is our mastery of unforgettable brand experiences, honed through years of industry expertise. Whether it’s a grand spectacle or an intimate gathering, we’ve got the keys to unlock success, no matter the challenge.
              </p>
            </div>
            <div className="we-believe-in">
              <h3>WE BELIEVE IN</h3>
              <p>
                Going the extra mile to achieve excellence. We see opportunities in obstacles and silver linings in challenges and we overcome them with a passion and commitment for excellence.
              </p>
            </div>
          </div>
        </section>

        <footer className="about-footer">
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
            <p>&copy; {new Date().getFullYear()} Casara. All Rights Reserved.</p>
            <p>
              Contact us: <a href="mailto:contact@company.com">contact@company.com</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
