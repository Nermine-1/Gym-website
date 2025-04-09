import '../styles/coaches.css';

function Coaches() {
    const coaches = [
        {
            type: "Musculation",
            phone: "+21655808641",
            email: "musculation@gmail.com",
            img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            type: "Fitness",
            phone: "+21655808641",
            email: "nesrinefekihs@gmail.com",
            img: "/gymImages/nes.jpeg"
        },
        {
            type: "Sportif",
            phone: "+21655808641",
            email: "sportif@gmail.com",
            img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    return (
        <div id="coaches" className="coaches-container">
            <h1 className="coaches-title">Our Coaches</h1>
            
            <div className="coaches-grid">
                {coaches.map((coach, index) => (
                    <div key={index} className="coach-card">
                        <div className="coach-image-container">
                            <img 
                                src={coach.img} 
                                alt={`Coach ${coach.type}`} 
                                className="coach-image"
                            />
                        </div>
                        <div className="coach-type">coach {coach.type}</div>
                        <div className="coach-contact">
                            <div className="contact-item">
                                <span className="contact-label">num:</span> 
                                <span className="contact-value">{coach.phone}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">email:</span> 
                                <span className="contact-value">{coach.email}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Coaches;