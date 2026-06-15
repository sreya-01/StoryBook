import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function ChapterReader() {
  const { id, chapterIndex } = useParams();
  const navigate = useNavigate();
  
  const [story, setStory] = useState(null);
  const currentChapterNum = parseInt(chapterIndex, 10); // Transform URL string into mathematical index integers

  useEffect(() => {
    const fetchStoryForReading = async () => {
      try {
        const res = await api.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error("Error connecting text logs:", err);
      }
    };
    fetchStoryForReading();
  }, [id]);

  if (!story) return <p style={{ textAlign: "center", marginTop: "50px" }}>Unrolling parchment files...</p>;

  const totalChapters = story.chapters.length;
  const currentChapterTitle = story.chapters[currentChapterNum];

  // PAGINATION HANDLERS
  const handlePrevious = () => {
    if (currentChapterNum > 0) {
      navigate(`/stories/${id}/chapters/${currentChapterNum - 1}`);
    }
  };

  const handleNext = () => {
    if (currentChapterNum < totalChapters - 1) {
      navigate(`/stories/${id}/chapters/${currentChapterNum + 1}`);
    }
  };

  return (
    <div className="reader-container">
      {/* HEADER NAV CONTROL LAYER */}
      <div className="reader-navigation-header">
        <Link to={`/stories/${id}`} className="back-to-index-btn">&larr; Back to Index</Link>
        <span className="reader-progress-tracker">
          Chapter {currentChapterNum + 1} of {totalChapters}
        </span>
      </div>

      {/* READING CANVAS TEXT */}
      <article className="reading-canvas">
        <h2 className="reader-story-title">{story.title}</h2>
        <h1 className="reader-chapter-title">{currentChapterTitle}</h1>
        <hr className="divider-line" />
        
        {/* Placeholder narrative text body based around the document parameters */}
        <div className="manuscript-body-paragraphs">
          <p>
            The atmospheric pressure shifts rapidly around the perimeter. As logging streams compile, 
            the path forward requires dedication, focus, and clean parameters. Every page turned updates 
            the global parameters of this offline terminal ecosystem.
          </p>
          <p style={{ marginTop: "20px" }}>
            "We have passed the initial staging coordinates," the system framework updates silently. 
            "The pagination module is fully initialized. Transition sequences are primed and waiting for client interaction triggers."
          </p>
        </div>
      </article>

      {/* DYNAMIC PAGINATION CONTROLS BUTTON BAR */}
      <div className="pagination-action-bar">
        <button 
          onClick={handlePrevious} 
          disabled={currentChapterNum === 0}
          className="page-nav-btn"
        >
          ⏮️ Previous Chapter
        </button>

        <button 
          onClick={handleNext} 
          disabled={currentChapterNum === totalChapters - 1}
          className="page-nav-btn next-btn-highlight"
        >
          Next Chapter ⏭️
        </button>
      </div>
    </div>
  );
}

export default ChapterReader;