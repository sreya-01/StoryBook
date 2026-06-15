import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToLibrary } from "../features/librarySlice";

function StoryCard({ story, onDelete }) {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="card">
      <img src={story.coverImage} alt={story.title} />
      <div className="card-content">
        <h3>{story.title}</h3>
        <p className="author">By {story.author}</p>
        <span className="badge">{story.genre}</span>
        <span className="rating">⭐ {story.rating}</span>
        
        <div className="card-actions">
          <Link to={`/stories/${story.id}`} className="view-btn">Read</Link>
          
          {currentUser && (
            <button onClick={() => dispatch(addToLibrary(story))} className="lib-btn">
              + Library
            </button>
          )}

          {currentUser && currentUser.name === story.author && (
            <>
              <Link to={`/edit-story/${story.id}`} className="edit-btn">Edit</Link>
              <button onClick={() => onDelete(story.id)} className="delete-btn">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryCard;