import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import ActivityCard from "../components/common/ActivityCard";
import { activitiesData } from "../data/sampleData";
import "./Activities.css";

export default function Activities() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Group activities by category
  const categories = [...new Set(activitiesData.map((a) => a.category))];
  const filteredActivities = selectedCategory
    ? activitiesData.filter((a) => a.category === selectedCategory)
    : activitiesData;

  const handleViewDetails = (activity) => {
    console.log("View details for:", activity);
    // In a real app, this would navigate to a detail page
  };

  const handleRegister = (activity) => {
    alert(`Registered for ${activity.title}!`);
    // In a real app, this would submit a registration form
  };

  return (
    <div className="activities-page">
      <Sidebar role="student" />

      <main className="activities-content">
        {/* Header */}
        <div className="activities-header">
          <h1 className="activities-title">Explore Activities</h1>
          <p className="activities-subtitle">
            Discover and participate in various college activities and events
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`category-btn ${!selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="activities-section">
          <p className="category-count">
            Showing {filteredActivities.length} activities
          </p>
          <div className="activities-grid">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onView={handleViewDetails}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
