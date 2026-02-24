import Sidebar from "../components/common/Sidebar";
import "./AdminEvents.css";

export default function AdminCreateEvent() {
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Create Event</h1>
          <p>Fill in the details to create a new event.</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <form>
              <div className="form-group">
                <label>Event Name</label>
                <input type="text" placeholder="Event Name" />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="Location" />
              </div>
              <button className="admin-btn" type="submit">Create Event</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
