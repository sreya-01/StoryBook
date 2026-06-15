import { useState, useEffect } from "react";
import { useParams , Link} from "react-router-dom";
import api from "../services/api";

function StoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const res = await api.get(`/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStoryDetails();
  }, [id]);

  if (!story) return <p>Loading chapter data streams...</p>;

  return (
    <div className="details">
      <img src={story.coverImage} alt={story.title} />
      <h1>{story.title}</h1>
      <h3 style={{ margin: "5px 0 15px 0" }}>By {story.author}</h3>
      <p><strong>Genre:</strong> {story.genre} | <strong>Rating:</strong> ⭐ {story.rating}</p>
      
      <h3 style={{ marginTop: "20px" }}>Synopsis</h3>
      <p>{story.synopsis}</p>

      <h3 style={{ marginTop: "20px" }}>Table of Chapters</h3>
      <ul>
        {story.chapters.map((chapter, index) => (
          <li key={index} style={{ padding: "10px", borderBottom: "1px solid #f1f5f9" }}>
            <Link 
              to={`/stories/${story.id}/chapters/${index}`} 
              style={{ display: "block", padding: "15px 10px", color: "#8b5cf6", fontWeight: "600", transition: "0.2s" }}
              className="chapter-link-item"
            >
              📖 {chapter}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryDetails;