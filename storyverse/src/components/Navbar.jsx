import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/stories">Explore Stories</Link>
      
      {currentUser ? (
        <>
          <Link to="/write">Write Story</Link>
          <Link to="/library">My Library</Link>
          
          <Link to="/profile" style={{ color: "#ec4899" }}>My Profile</Link>
          <button 
            onClick={handleLogout} 
            style={{ marginLeft: "auto", background: "none", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}
          >
            Logout ({currentUser.name})
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "auto" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;