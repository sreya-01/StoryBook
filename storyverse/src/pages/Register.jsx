import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const checkUser = await api.get(`/users?email=${email}`);
      if (checkUser.data.length > 0) {
        alert("An account with this email already exists.");
        return;
      }
      const newUser = { name, email, password };
      await api.post("/users", newUser);
      alert("Registration complete!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-card">
        <h2>Create Account</h2>
        <input type="text" placeholder="Author/Reader Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="auth-btn">Create Profile</button>
        <p>Already registered? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
}

export default Register;