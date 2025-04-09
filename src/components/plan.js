import '../styles/plan.css';

function Plan() {
    return (
        <div id="plan" className="container">
            <h1>Our Plan</h1>
            
            <div className="membership-header">
                <h2>JOIN OUR MEMBERSHIP</h2>
            </div>
            
            <div className="plans-container">
                <div className="plan-card">
                    <div className="plan-duration">7 Days</div>
                    <div className="plan-rate">Weekly Rate</div>
                    <button className="btn">Select Plan</button>
                </div>
                
                <div className="plan-card">
                    <div className="plan-duration">1 Month</div>
                    <div className="plan-rate">Monthly Rate</div>
                    <button className="btn">Select Plan</button>
                </div>
                
                <div className="plan-card">
                    <div className="plan-duration">6 Months</div>
                    <div className="plan-rate">Biannual Rate</div>
                    <button className="btn">Select Plan</button>
                </div>
                
                <div className="plan-card">
                    <div className="plan-duration">1 Year</div>
                    <div className="plan-rate">Annual Rate</div>
                    <button className="btn">Select Plan</button>
                </div>
            </div>
        </div>
    );
}

export default Plan;