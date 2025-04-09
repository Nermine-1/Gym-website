import { useState } from 'react';
import '../styles/plan.css';

function Plan() {
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [currentPlan, setCurrentPlan] = useState('');
    const [ratings, setRatings] = useState({
        '7 Days': [],
        '1 Month': [],
        '3 Months': [],
        '1 Year': []
    });
    const [newRating, setNewRating] = useState('');

    const handleRateClick = (plan) => {
        setCurrentPlan(plan);
        setShowRatingModal(true);
    };

    const handleSubmitRating = (e) => {
        e.preventDefault();
        if (newRating.trim()) {
            setRatings(prev => ({
                ...prev,
                [currentPlan]: [...prev[currentPlan], newRating]
            }));
            setNewRating('');
            setShowRatingModal(false);
        }
    };

    return (
        <div id="plan" className="container">
            <h1>Our Plan</h1>
            
            <div className="membership-header">
                <h2>JOIN OUR MEMBERSHIP</h2>
            </div>
            
            <div className="plans-container">
                {['7 Days', '1 Month', '3 Months', '1 Year'].map((plan) => (
                    <div key={plan} className="plan-card">
                        <div className="plan-duration">{plan}</div>
                        <div className="plan-rate">{plan.includes('7') ? 'Weekly' : 
                            plan.includes('Month') ? 'Monthly' : 
                            plan.includes('3') ? '3-Monthly' : 'Annual'} Rate</div>
                        <button 
                            className="btn" 
                            onClick={() => handleRateClick(plan)}
                        >
                            Rate
                        </button>
                    </div>
                ))}
            </div>

            {/* Rating Modal */}
            {showRatingModal && (
                <div className="rating-modal-overlay">
                    <div className="rating-modal">
                        <h3>Rate {currentPlan} Plan</h3>
                        
                        {/* Display existing ratings */}
                        <div className="existing-ratings">
                            <h4>Existing Ratings:</h4>
                            {ratings[currentPlan].length > 0 ? (
                                <ul>
                                    {ratings[currentPlan].map((rating, index) => (
                                        <li key={index}>{rating}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No ratings yet</p>
                            )}
                        </div>
                        
                        {/* Add new rating */}
                        <form onSubmit={handleSubmitRating}>
                            <textarea
                                value={newRating}
                                onChange={(e) => setNewRating(e.target.value)}
                                placeholder="Write your rating..."
                                required
                            />
                            <div className="rating-buttons">
                                <button type="submit" className="submit-rating">
                                    Submit Rating
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-rating"
                                    onClick={() => setShowRatingModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Plan;