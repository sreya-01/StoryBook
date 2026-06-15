import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddStory() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [formData, setFormData] = useState({
    title: "",
    genre: "Sci-Fi",
    coverImage: "",
    synopsis: "",
    rating: 5.0,
    chapters: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedPayload = {
        ...formData,
        author: user?.name || "Anonymous",
        chapters: formData.chapters.split("\n").filter(ch => ch.trim() !== "")
      };
      
      await api.post("/stories", formattedPayload);
      navigate("/stories");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Publish Your Work</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Story Title" onChange={handleChange} required />
        <input type="text" name="coverImage" placeholder="Cover Image URL" onChange={handleChange} required />
        
        <select name="genre" onChange={handleChange}>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
        </select>

        <textarea name="synopsis" placeholder="Synopsis / Summary" onChange={handleChange} required />
        <textarea name="chapters" placeholder="Add Chapter Titles (One per line)" onChange={handleChange} required />
        
        <button type="submit" className="submit-btn">Publish to Universe</button>
      </form>
    </div>
  );
}

export default AddStory;