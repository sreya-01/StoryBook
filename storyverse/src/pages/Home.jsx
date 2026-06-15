import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [trendingStories, setTrendingStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top-rated books directly from your running db.json database
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await api.get("/stories");
        // Sort by rating (high to low) and take the top 3 items
        const topBooks = res.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setTrendingStories(topBooks);
      } catch (err) {
        console.error("Error loading homepage catalog trends:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  // Quick genre routing logic
  const handleGenreRedirect = (genreName) => {
    navigate(`/stories`);
    // Simple state sync mechanism or manual search logic triggers can extend this later
  };

  return (
    <div className="homepage-container">
      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="hero-glass-backing">
          
          <h1 className="hero-title">Your Story. Your Universe.</h1>
          <p className="hero-subtitle">
            Read, write, and explore self-published digital books from a globally connected community of creative authors.
          </p>
          <div className="hero-buttons">
            <Link to="/stories" className="home-btn primary-btn">
              ✨ Explore Stories
            </Link>
            <Link to="/write" className="home-btn secondary-btn">
              ✍️ Write a Manuscript
            </Link>
          </div>
        </div>
      </header>

      {/* QUICK INTEREST GENRE TILES */}
      <section className="genre-pill-section">
        <h2 className="section-title">Browse Popular Realms</h2>
        <div className="genre-pill-grid">
          {["Sci-Fi", "Fantasy", "Mystery", "Romance"].map((g) => (
            <div key={g} onClick={() => handleGenreRedirect(g)} className="genre-pill-card">
              <span className="pill-dot"></span> {g}
            </div>
          ))}
        </div>
      </section>

      {/* REACTION DASHBOARD WIDGET */}
      {currentUser && (
        <section className="user-dashboard-card">
          <div className="dashboard-info">
            <h2>Welcome Back, Chief Editor {currentUser.name}!</h2>
            <p>Your local runtime workspace is synchronized. Ready to edit your manuscripts?</p>
          </div>
          <div className="dashboard-stats">
            <Link to="/library" className="stat-item interactive-stat">
              <span className="stat-number">📚</span>
              <span className="stat-label">My Library</span>
            </Link>
            <div className="stat-item">
              <span className="stat-number">⚡</span>
              <span className="stat-label">Offline Core Connected</span>
            </div>
          </div>
        </section>
      )}

      {/* LIVE TRENDING CAROUSEL ROW */}
      <section className="trending-section">
        <div className="section-header-row">
          <h2 className="section-title">🔥 Community Masterpieces</h2>
          <Link to="/stories" className="inline-see-all">See All Stories &rarr;</Link>
        </div>
        
        {loading ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>Loading database archives...</p>
        ) : (
          <div className="trending-books-grid">
            {trendingStories.map((story) => (
              <div key={story.id} className="trending-book-card">
                <div className="trending-img-wrapper">
                  <img src={story.coverImage} alt={story.title} />
                  <span className="trending-badge-tag">⭐ {story.rating}</span>
                </div>
                <div className="trending-book-details">
                  <h3>{story.title}</h3>
                  <p className="trending-author">By {story.author}</p>
                  <p className="trending-synopsis-preview">{story.synopsis}</p>
                  <Link to={`/stories/${story.id}`} className="trending-read-link">Read Manuscript</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
    </div>
  );
}

export default Home;