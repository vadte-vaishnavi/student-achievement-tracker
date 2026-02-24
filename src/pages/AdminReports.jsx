import Sidebar from "../components/common/Sidebar";
import "./AdminReports.css";

export default function AdminReports() {
  return (
    <div className="admin-page">
      <Sidebar role="admin" />
      <main className="admin-content">
        <div className="admin-header">
          <h1>Generate Reports</h1>
          <p>Generate achievement and activity reports</p>
        </div>
        <section className="admin-section">
          <div className="admin-card">
            <h3>Reports Management</h3>
            <p>Generate various reports. You can:</p>
            <ul>
              <li>Generate student achievement reports</li>
              <li>View activity participation statistics</li>
              <li>Export data to PDF/Excel</li>
              <li>View attendance analytics</li>
              <li>Generate performance metrics</li>
            </ul>
            <button className="admin-btn">Generate Report</button>
          </div>
        </section>
      </main>
    </div>
  );
}
