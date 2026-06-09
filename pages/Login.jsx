// import { useState } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const nav = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       nav("/chat");
//     } catch {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-20">
//       <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
//       <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }
// import React, { useState } from "react"; // <--- This is the missing piece!
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api/axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", response.data.token);
//       navigate("/chat"); // Go to chat after successful login
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <h2>Login to CogniCare</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           required 
//         /><br/><br/>
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           required 
//         /><br/><br/>
//         <button type="submit">Login</button>
//       </form>
//       <p>Don't have an account? <Link to="/register">Register here</Link></p>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.png"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/chat"); 
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      {/* 🔝 Navbar matches Register Page */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <span style={styles.brand}>CogniCare <span style={styles.aiText}>AI</span></span>
          </div>
          <Link to="/register" style={styles.navLinkButton}>Register</Link>
        </div>
      </nav>

      {/* 🧾 Main Login Card */}
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>Welcome back! Please enter your details.</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                placeholder="user@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={styles.input}
              />
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitBtn,
                ...(isHovered ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Sign In
            </button>
          </form>

          <p style={styles.footerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    minHeight: '100vh', 
    backgroundColor: 'white', // Matches Register background
    fontFamily: '"Inter", sans-serif',
    margin: 0
  },
  navbar: {
    height: '70px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #eee',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 10
  },
  navContent: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  },
  logoContainer: { display: 'flex', alignItems: 'center' },
  logo: { height: '35px', marginRight: '10px' },
  brand: { fontSize: '22px', fontWeight: 'bold', color: '#111' },
  aiText: { color: '#4f46e5', fontWeight: '300' },
  navLinkButton: { 
    textDecoration: 'none', 
    color: '#4f46e5', 
    fontWeight: '600',
    padding: '8px 20px',
    backgroundColor: '#f5f3ff',
    borderRadius: '8px'
  },
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: '140px',
    paddingBottom: '40px'
  },
  card: { 
    background: '#ffffff', 
    padding: '40px', 
    borderRadius: '16px', 
    width: '100%', 
    maxWidth: '400px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  title: { fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#111' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '32px' },
  form: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
  inputGroup: { marginBottom: '18px' },
  label: { fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151', display: 'block' },
  input: { 
    width: '100%',
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #d1d5db', 
    outline: 'none',
    fontSize: '15px',
    boxSizing: 'border-box'
  },
  submitBtn: { 
    marginTop: '10px',
    padding: '14px', 
    backgroundColor: '#58afdd', 
    color: '#ffffff', 
    border: 'none', 
    borderRadius: '8px', 
    fontWeight: '700', 
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  buttonHover: {
    backgroundColor: '#4338ca',
    transform: 'translateY(-1px)'
  },
  footerText: { marginTop: '20px', fontSize: '14px', color: '#6b7280' },
  link: { color: 'blue', textDecoration: 'none', fontWeight: '600' },
  errorBox: { 
    padding: '12px', 
    backgroundColor: '#fef2f2', 
    color: '#b91c1c', 
    borderRadius: '8px', 
    marginBottom: '20px', 
    fontSize: '13px', 
    border: '1px solid #fee2e2' 
  }
};