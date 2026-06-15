import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [myStories, setMyStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPublishedWorks = async () => {
      try {
        const res = await api.get("/stories");
        // Filter stories down to show only the ones matching the logged-in user's name
        const publishedByMe = res.data.filter(
          (story) => story.author.toLowerCase() === currentUser?.name?.toLowerCase()
        );
        setMyStories(publishedByMe);
      } catch (err) {
        console.error("Error matching published catalog array metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserPublishedWorks();
    }
  }, [currentUser?.name]);

  // Handle deleting a story directly from the profile overview page view
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to retract this manuscript from the universe database?")) {
      try {
        await api.delete(`/stories/${id}`);
        // Remove deleted item directly from current screen state view
        setMyStories(myStories.filter((story) => story.id !== id));
      } catch (err) {
        console.error("Deletion cycle interrupted:", err);
      }
    }
  };

  return (
    <div className="profile-wrapper">
      {/* USER MATRICES OVERVIEW HEADER HERO BANNER */}
      <section className="profile-banner-card">
        <div className="profile-avatar-circle">
          {currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}
        </div>
        <div className="profile-identity-info">
          <h1>{currentUser?.name}</h1>
          <p className="profile-email-tag">📧 Identity Lock: {currentUser?.email}</p>
          <div className="profile-count-pill">
            ✍️ Published Manuscripts: <strong>{myStories.length}</strong>
          </div>
        </div>
      </section>

      {/* DASHBOARD MANUSCRIPT FEED GRID SECTION */}
      <section className="my-manuscripts-section">
        <h2 className="section-title">Your Published Works</h2>
        
        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>Syncing profile workspace ledger...</p>
        ) : myStories.length === 0 ? (
          <div className="empty-profile-placeholder">
            <h3>You haven't written any chapters yet.</h3>
            <p>Your universe is waiting for its genesis timeline. Write your initial manuscript entry today!</p>
            <Link to="/write" className="add-btn" style={{ marginTop: "15px" }}>Create New Story</Link>
          </div>
        ) : (
          <div className="destinations"> {/* Reuse your unified flex list grids layout */}
            {myStories.map((story) => (
              <div key={story.id} className="card">
                <img src={story.coverImage} alt={story.title} />
                <h3>{story.title}</h3>
                <p><strong>Genre:</strong> {story.genre} | ⭐ {story.rating}</p>
                <p className="profile-card-preview-text">{story.synopsis}</p>
                
                {/* ACTION LAYER CONTROLS */}
                <div className="card-actions">
                  <Link to={`/stories/${story.id}`} className="view-btn">Read</Link>
                  <Link to={`/edit-story/${story.id}`} className="edit-btn">Edit</Link>
                  <button onClick={() => handleDelete(story.id)} className="delete-btn">Retract</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;