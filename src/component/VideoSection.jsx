import React from 'react';
import '../assets/home.css';

const VideoSection = () => {
  return (
    <div className="video-section">
      <div className="video-container">
        <iframe 
          src="https://youtu.be/EcvHOe0Fmp4?si=tBNy0B5w2WX5lwpE"
          title="Recent Event"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>
      </div>
      <div className="description-container">
        <h2>Recent Event: Capture the Flag Competition</h2>
        <p>
          We are excited to share the highlights from our recent participation in the Capture the Flag competition at DerbyCon in Louisville, Kentucky. Our team, Paid2Penetrate, secured an impressive 3rd place finish. The competition was intense, and we successfully tackled complex challenges, including encryption and WAV steganography. This event not only showcased our technical prowess but also reinforced our commitment to excellence and innovation.
        </p>
      </div>
    </div>
  );
};

export default VideoSection;
