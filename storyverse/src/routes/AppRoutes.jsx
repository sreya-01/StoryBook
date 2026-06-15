import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Stories from "../pages/Stories";
import StoryDetails from "../pages/StoryDetails";
import AddStory from "../pages/AddStory";
import EditStory from "../pages/EditStory";
import Library from "../pages/Library";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChapterReader from "../pages/ChapterReader";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/stories/:id" element={<StoryDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/stories/:id/chapters/:chapterIndex" element={<ChapterReader />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/write" element={<ProtectedRoute><AddStory /></ProtectedRoute>} />
      <Route path="/edit-story/:id" element={<ProtectedRoute><EditStory /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;