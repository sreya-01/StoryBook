import { useState, useEffect } from "react";
import api from "../services/api";
import StoryCard from "../components/StoryCard";

function Stories() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await api.get("/stories");
      setStories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        await api.delete(`/stories/${id}`);
        setStories(stories.filter(s => s.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const processQueryStream = () => {
    return stories
      .filter(story => story.title.toLowerCase().includes(search.toLowerCase()))
      .filter(story => (genre === "All" ? true : story.genre === genre))
      .sort((a, b) => {
        if (sort === "high-to-low") return b.rating - a.rating;
        if (sort === "low-to-high") return a.rating - b.rating;
        return 0;
      });
  };

  return (
    <div>
      <h1>Explore Stories</h1>
      <div className="filters">
        <input type="text" placeholder="Search titles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="All">All Genres</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort Configuration</option>
          <option value="high-to-low">Highest Rated</option>
          <option value="low-to-high">Lowest Rated</option>
        </select>
      </div>

      <div className="destinations">
        {processQueryStream().map(story => (
          <StoryCard key={story.id} story={story} onDelete={handleClearDelete} />
        ))}
      </div>
    </div>
  );
}

export default Stories;