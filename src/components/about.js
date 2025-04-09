import { useState, useEffect } from 'react';
import '../styles/About.css';


const gymImages = [
  {
    url: '/gymImages/2.png',
    
     },
  {
    url: '/gymImages/1.png',
    },
  {
    url: '/gymImages/5.png',
   },
  {
    url: '/gymImages/3.png',
    }
];

function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedInfo, setExpandedInfo] = useState(null);

  // Auto-rotate images every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === gymImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (index) => {
    setExpandedInfo(expandedInfo === index ? null : index);
  };

  return (
    <>
      <section id="about" className="about-section">
        <div className="fullscreen-carousel">
          <img 
            src={gymImages[currentImageIndex].url} 
            alt={gymImages[currentImageIndex].title}
            className="fullscreen-image"
          />
          <div className="content-overlay">
            <div className="heading-container">
              <h2 className="about-heading">
                <span>Start a better</span>
                <span>shape of you!</span>
              </h2>
            </div>
            <div className="image-info">
              <h3>{gymImages[currentImageIndex].title}</h3>
              <button 
  onClick={() => {
            toggleExpand(currentImageIndex); 
            window.location.href = '/nextabout#why';  
          }}
          className="learn-more-btn"
        >
          {expandedInfo === currentImageIndex ? 'Show Less' : 'Learn More'}
</button>

            </div>
  
            {expandedInfo === currentImageIndex && (
              <div className="expanded-info">
                <p>{gymImages[currentImageIndex].description}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
  
}

export default About;