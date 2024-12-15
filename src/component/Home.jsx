// src/pages/Home.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faCalendarAlt, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ReactTyped } from 'react-typed';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useInView } from 'react-intersection-observer';
import { BookingContext } from '../context/BookingContext';
import '../assets/home.css';

const itemData = [
  {
    img: 'https://i.pinimg.com/736x/e3/71/32/e37132a9e942ea43aee49a98ff257d49.jpg',
    title: 'Exhibition and Experiential Spaces',
    author: 'Exhibition and Experiential Spaces',
  },
  {
    img: 'https://i.pinimg.com/564x/2d/84/1d/2d841d58c070e9cf046406d04a1c0b5d.jpg',
    title: 'Govt. and Institutional',
    author: 'Govt. and Institutional',
  },
  {
    img: 'https://i.pinimg.com/564x/8c/f5/c0/8cf5c06674084abbe5b73ba0ad0e6dc3.jpg',
    title: 'Virtual',
    author: 'Virtual',
  },
  {
    img: 'https://i.pinimg.com/564x/5b/10/00/5b1000f6819c94eaa6c15e799d19c948.jpg',
    title: 'CSR',
    author: 'CSR',
  },
  {
    img: 'https://i.pinimg.com/564x/03/b7/0c/03b70ca7d1ab64bf695dd6baa3d0065a.jpg',
    title: 'Awards & Launches',
    author: 'Awards & Launches',
  },
  {
    img: 'https://i.pinimg.com/564x/10/be/c2/10bec23b295ff3d41113118b8dc594d7.jpg',
    title: 'Musical Concerts',
    author: 'Musical Concerts',
  },
  {
    img: 'https://i.pinimg.com/564x/3e/79/fc/3e79fc8ee970cd401841a35bd1875180.jpg',
    title: 'Media/Influencer Activation',
    author: 'Media/Influencer Activation',
  },
  {
    img: 'https://i.pinimg.com/564x/76/64/b6/7664b69b613a984f7fcfd91df224ccc1.jpg',
    title: 'Workshops & Seminars',
    author: 'Workshops & Seminars',
  },
  {
    img: 'https://i.pinimg.com/564x/db/28/c2/db28c2b8a7b1f56db5e3a5936a14b959.jpg',
    title: 'Summits & Conclaves',
    author: 'Summits & Conclaves',
  },
  {
    img: 'https://i.pinimg.com/736x/8b/2f/81/8b2f81df53fe5a048b72bb642ef3ed65.jpg',
    title: 'Charity Fundraisers',
    author: 'Charity Fundraisers',
  },
  {
    img: 'https://i.pinimg.com/564x/02/01/f0/0201f014971417a31cc5b56b7fa77d3d.jpg',
    title: 'Corporate Dinners',
    author: 'Corporate Dinners',
  },
  {
    img: 'https://i.pinimg.com/564x/10/65/a7/1065a7a32cc18f565bc229a9fbd98637.jpg',
    title: 'Product Launches',
    author: 'Product Launches',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { setSelectedEvent } = useContext(BookingContext);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = itemData.filter((item) =>
    item.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const stats = [
    { id: 1, number: 14, label: 'Years' },
    { id: 2, number: 300, label: 'Repeat Clients' },
    { id: 3, number: 500, label: 'Wow Experiences' },
    { id: 4, number: 100, label: 'Professional Folks' },
  ];

  

  return (
    <div className="main">
      <div>
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
      </div>
      <div className='imgslider'></div>
      <div className='textedit'>
        <div className="text">
          WE CREATE <br />
          <span className='text1'>
            <ReactTyped
              strings={["ELEVATED", "UNFORGETTABLE", "PURPOSEFUL"]}
              typeSpeed={150}
              backSpeed={100}
              loop
            />
          </span> <br />
          BRAND EXPERIENCES
        </div>
        <br />
        <div className='description'>
          At Casara, concepts come to life through a fusion of innovation, an insatiable drive for perfection, and impeccable execution. For us, it's as much about the minutiae as it is about the overarching vision. We are always willing to go above and beyond to perfect every element.
          <br /><br />
         <span className='text2'> Crafting memorable brand experiences isn't merely our passion; it's woven into our very essence.</span>
        </div>
      </div>
      <div className="gallery-heading">
        <h2>Customized Strategies to Propel Your Brand Forward</h2>
      </div>
      <div className="image-gallery-container">
        <Box className="image-gallery-box">
        <ImageList className="image-gallery" variant="masonry" cols={3} gap={16}>
  {filteredData.map((item) => (
    <ImageListItem key={item.img} className="image-item">
      <img
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.img}?w=248&fit=crop&auto=format`}
        alt={item.title}
        loading="lazy"
      />
      <div className="image-text">{item.author}</div>
    </ImageListItem>
  ))}
</ImageList>

        </Box>
      </div>
      <div className='texteffect'>
        <h2 className='h2'><span>W</span>e make everything <span>P</span>rofessional and <span>P</span>erfect!</h2>
      </div>
      <div ref={ref} className="stats-container">
        {stats.map((stat) => (
          <StatItem key={stat.id} number={stat.number} label={stat.label} inView={inView} />
        ))}
      </div>
      <footer className="footer">
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <p>&copy; 2024 Casara. All rights reserved.</p>
      </footer>
    </div>
  );
};

const StatItem = ({ number, label, inView }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = 0;
    const end = number;
    if (inView) {
      const timer = setInterval(() => {
        start += 1;
        if (start > end) {
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 10);
    }
  }, [inView, number]);

  return (
    <div className="stat-item" ref={ref}>
      <h3>{count}+</h3>
      <p>{label}</p>
    </div>
  );
};

export default Home;
