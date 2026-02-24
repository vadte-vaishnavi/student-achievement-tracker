import Sidebar from "../components/common/Sidebar";
import "./AdminAchievements.css";

export default function AdminAwardAchievement() {
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Award Achievement</h1>
          <p>Assign an achievement to a student.</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <form>
              <div className="form-group">
                <label>Student College ID</label>
                <input type="text" placeholder="College ID" />
              </div>
              <div className="form-group">
                <label>Achievement Title</label>
                <input type="text" placeholder="Achievement Title" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Description" rows="3" />
              </div>
              <button className="admin-btn" type="submit">Award</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
