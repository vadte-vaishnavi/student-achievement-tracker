import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import { eventsData } from "../data/sampleData";
import "./Events.css";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(eventsData.map((e) => e.category))];
  const filteredEvents = selectedCategory === "all" 
    ? eventsData 
    : eventsData.filter((e) => e.category === selectedCategory);

  return (
    <div className="events-page">
      <Sidebar role="student" />

      <main className="events-content">
        <div className="events-header">
          <h1 className="events-title">Events & Registrations</h1>
          <p className="events-subtitle">Discover and register for upcoming college events</p>
        </div>

        <div className="events-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All Events" : cat}
            </button>
          ))}
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-box">
              <div className="event-date-box">
                <div className="event-date">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                </div>
                <div className="event-day">
                  {new Date(event.date).getDate()}
                </div>
              </div>
              <div className="event-info">
                <h3>{event.name}</h3>
                <p className="event-category">{event.category}</p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-time">🕒 {event.time}</p>
                <div className="event-capacity">
                  <span className="registered">{event.registered} registered</span>
                  <span className="total">/ {event.capacity} capacity</span>
                </div>
              </div>
              <button className="register-btn">Register Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
