import Sidebar from "../components/common/Sidebar";
import "./AdminActivities.css";

export default function AdminAddActivity() {
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Add New Activity</h1>
          <p>Fill in the details to create a new activity.</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Activity Title" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input type="text" placeholder="Category" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Description" rows="3" />
              </div>
              <button className="admin-btn" type="submit">Create Activity</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
