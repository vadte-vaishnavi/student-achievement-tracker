import Sidebar from "../components/common/Sidebar";
import { stallsData } from "../data/sampleData";
import "./FestStalls.css";

export default function FestStalls() {
  const handleBookStall = (stall) => {
    if (stall.availability) {
      alert(`Booking stall: ${stall.name}\nPrice: ${stall.price}`);
    } else {
      alert("This stall is currently not available!");
    }
  };

  return (
    <div className="fest-stalls-page">
      <Sidebar role="student" />

      <main className="stalls-content">
        <div className="stalls-header">
          <h1 className="stalls-title">College Fest Stalls</h1>
          <p className="stalls-subtitle">Book your stall space for the college fest</p>
        </div>

        <div className="stalls-info">
          <div className="info-card">
            <span>📅</span>
            <div>
              <p>Fest Date</p>
              <strong>April 15, 2024</strong>
            </div>
          </div>
          <div className="info-card">
            <span>📍</span>
            <div>
              <p>Location</p>
              <strong>College Ground</strong>
            </div>
          </div>
          <div className="info-card">
            <span>⏰</span>
            <div>
              <p>Duration</p>
              <strong>9 AM - 6 PM</strong>
            </div>
          </div>
        </div>

        <div className="stalls-grid">
          {stallsData.map((stall) => (
            <div 
              key={stall.id} 
              className={`stall-card ${!stall.availability ? "unavailable" : ""}`}
            >
              <div className="stall-header">
                <h3>{stall.name}</h3>
                {stall.availability ? (
                  <span className="availability-badge available">✓ Available</span>
                ) : (
                  <span className="availability-badge unavailable">✗ Booked</span>
                )}
              </div>

              <div className="stall-details">
                <div className="detail-item">
                  <span className="detail-icon">📏</span>
                  <span>{stall.size}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span className="price">{stall.price}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📍</span>
                  <span>{stall.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⭐</span>
                  <span>{stall.rating}/5</span>
                </div>
              </div>

              <p className="stall-description">{stall.description}</p>

              <button 
                className={`book-btn ${!stall.availability ? "disabled" : ""}`}
                onClick={() => handleBookStall(stall)}
                disabled={!stall.availability}
              >
                {stall.availability ? "Book Now" : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
