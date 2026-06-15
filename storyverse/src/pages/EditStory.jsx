import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const res = await api.get(`/stories/${id}`);
        setFormData({
          ...res.data,
          chapters: res.data.chapters.join("\n")
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStoryData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedPayload = {
        ...formData,
        chapters: formData.chapters.split("\n").filter(ch => ch.trim() !== "")
      };
      await api.put(`/stories/${id}`, formattedPayload);
      navigate("/stories");
    } catch (err) {
      console.error(err);
    }
  };

  if (!formData) return <p>Loading revision interfaces...</p>;

  return (
    <div className="form-container">
      <h2>Edit Your Story</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} required />
        
        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
        </select>

        <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} required />
        <textarea name="chapters" value={formData.chapters} onChange={handleChange} required />
        
        <button type="submit" className="submit-btn">Update Manuscript</button>
      </form>
    </div>
  );
}

export default EditStory;