import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        navigate("/");
        window.location.reload();
      } else {
        alert("System access denied: Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-card">
        <h2>Welcome Back</h2>
        <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="auth-btn">Authorize Entry</button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;