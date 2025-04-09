import '../styles/nextabout.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Nextabout() {
  return (
    <section id ="why" className="about-content-section">
      <div className="about-content-container">
        <h2>About <span>Legends GYM FOR MEN & WOMEN</span></h2>
        <p className="about-description">
          Legends Gym Fitness Center provides proper training and
          conditioning for members who want to improve and
          transform their body with programs tailored to individual
          body composition.
        </p>

        <div className="offerings-section">
          <h3>What we offer:</h3>
          <div className="offerings-grid">
            {/* 1-on-1 Coaching */}
            <div className="offering-card">
            <div className="offering-number">1-on-1 </div>
              <div className="offering-title1">
                <i className="fas fa-dumbbell offering-icon"></i>
                <span>Coaching</span>
              </div>
            </div>

            {/* Guide Chat */}
            <div className="offering-card">
              <div className="offering-number">7/24</div>
              <div className="offering-title2">
                <i className="fas fa-comments offering-icon"></i>
                <span>Guide chat</span>
              </div>
            </div>

            {/* Nutrition */}
            <div className="offering-card">
              <div className="offering-number">Plan</div>
              <div className="offering-title">
                <i className="fas fa-utensils offering-icon"></i>
                <span>Nutrition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nextabout;
