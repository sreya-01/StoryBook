import { useSelector, useDispatch } from "react-redux";
import { removeFromLibrary } from "../features/librarySlice";
import { Link } from "react-router-dom";

function Library() {
  const libraryStories = useSelector((state) => state.library);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>My Reading Library</h1>
      {libraryStories.length === 0 ? (
        <p>Your library is currently empty. Go browse some stories!</p>
      ) : (
        <div className="destinations">
          {libraryStories.map(story => (
            <div className="card" key={story.id}>
              <img src={story.coverImage} alt={story.title} />
              <div style={{ padding: "15px" }}>
                <h3>{story.title}</h3>
                <p>By {story.author}</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <Link to={`/stories/${story.id}`} className="view-btn">Read Now</Link>
                  <button onClick={() => dispatch(removeFromLibrary(story.id))} className="delete-btn" style={{ flex: 1 }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;