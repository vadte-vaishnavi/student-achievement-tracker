import Sidebar from "../components/common/Sidebar";
import "./AdminStudents.css";

export default function AdminAddStudent() {
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Add New Student</h1>
          <p>Fill in the details to register a new student.</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Email Address" />
              </div>
              <div className="form-group">
                <label>College ID</label>
                <input type="text" placeholder="College ID" />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <input type="text" placeholder="Branch" />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" placeholder="Year of Study" min="1" max="4" />
              </div>
              <button className="admin-btn" type="submit">Register Student</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
