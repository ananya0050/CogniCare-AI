// import { useState } from "react";
// import API from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({
//     email: "", password: "", name: "", role: "patient"
//   });
//   const nav = useNavigate();

//   const handleRegister = async () => {
//     const res = await API.post("/auth/register", form);
//     localStorage.setItem("token", res.data.token);
//     nav("/chat");
//   };

//   return (
//     <div>
//       <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
//       <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
//       <input type="password" onChange={e => setForm({...form, password: e.target.value})} />
      
//       <select onChange={e => setForm({...form, role: e.target.value})}>
//         <option value="patient">Patient</option>
//         <option value="clinician">Clinician</option>
//       </select>

//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// // }
// import api from '../api/axios';

// const handleRegister = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await api.post('/auth/register', {
//       email,
//       password,
//       name,
//       role: 'patient' // or 'clinician'
//     });
//     localStorage.setItem('token', response.data.token);
//     // Redirect to Chat or Login
//   } catch (error) {
//     console.error("Registration failed", error.response?.data?.detail);
//   }
// };
// export default Register;
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api/axios';

// function Register() {
//   // 1. Setup state to capture user input
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'patient'
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // 2. Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 3. The Submit function (your logic, improved)
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
//     try {
//       const response = await api.post('/auth/register', formData);
      
//       // Store the token from your FastAPI backend
//       localStorage.setItem('token', response.data.token);
      
//       // 4. Redirect to Chat page on success
//       navigate('/chat');
//     } catch (error) {
//       // Show the specific error from FastAPI (like "Email already exists")
//       const errorMsg = error.response?.data?.detail || "Registration failed";
//       setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
//       console.error("Registration failed", error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
//       <h2>Create Account</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
      
//       <form onSubmit={handleRegister}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br/><br/>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
        
//         <select name="role" onChange={handleChange}>
//           <option value="patient">Patient</option>
//           <option value="clinician">Clinician</option>
//         </select><br/><br/>
        
//         <button type="submit">Register</button>
//       </form>
      
//       <p>Already have an account? <Link to="/login">Login here</Link></p>
//     </div>
//   );
// }

// export default Register;
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api/axios';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'patient'
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await api.post('/auth/register', formData);
//       localStorage.setItem('token', response.data.token);
//       navigate('/chat');
//     } catch (error) {
//       const errorMsg = error.response?.data?.detail || "Registration failed";
//       setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Create Account</h2>
//         <p style={styles.subtitle}>Join and start your journey 🚀</p>

//         {error && <p style={styles.error}>{error}</p>}

//         <form onSubmit={handleRegister} style={styles.form}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />

//           <select
//             name="role"
//             onChange={handleChange}
//             style={styles.input}
//           >
//             <option value="patient">Patient</option>
//             <option value="clinician">Clinician</option>
//           </select>

//           <button type="submit" style={styles.button}>
//             Register
//           </button>
//         </form>

//         <p style={styles.footerText}>
//           Already have an account?{' '}
//           <Link to="/login" style={styles.link}>
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// /* 🎨 Styles */
// const styles = {
//   container: {
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     fontFamily: 'Arial, sans-serif'
//   },
//   card: {
//     background: '#fff',
//     padding: '30px',
//     borderRadius: '15px',
//     width: '350px',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//     textAlign: 'center'
//   },
//   title: {
//     marginBottom: '5px',
//     color: '#333'
//   },
//   subtitle: {
//     fontSize: '14px',
//     color: '#777',
//     marginBottom: '20px'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   input: {
//     padding: '12px',
//     margin: '8px 0',
//     borderRadius: '8px',
//     border: '1px solid #ddd',
//     fontSize: '14px',
//     outline: 'none',
//     transition: '0.3s',
//   },
//   button: {
//     marginTop: '15px',
//     padding: '12px',
//     borderRadius: '8px',
//     border: 'none',
//     background: '#667eea',
//     color: '#fff',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: '0.3s'
//   },
//   footerText: {
//     marginTop: '15px',
//     fontSize: '14px'
//   },
//   link: {
//     color: '#667eea',
//     textDecoration: 'none',
//     fontWeight: 'bold'
//   },
//   error: {
//     color: 'red',
//     fontSize: '13px'
//   }
// };
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api/axios';
// import logo from '../assets/logo.png'; // 👈 add your logo here

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'patient'
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await api.post('/auth/register', formData);
//       localStorage.setItem('token', response.data.token);
//       navigate('/chat');
//     } catch (error) {
//       const errorMsg = error.response?.data?.detail || "Registration failed";
//       setError(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
//     }
//   };

//   return (
//     <>
//       {/* 🔝 Navbar */}
//       <div style={styles.navbar}>
//         <div style={styles.logoContainer}>
//           <img src={logo} alt="Cognicare Logo" style={styles.logo} />
//           <span style={styles.brand}>Cognicare</span>
//         </div>

//         <div>
//           <Link to="/login" style={styles.navLink}>Login</Link>
//         </div>
//       </div>

//       {/* 🧾 Main Content */}
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <h2 style={styles.title}>Create Account</h2>
//           <p style={styles.subtitle}>Join and start your journey 🚀</p>

//           {error && <p style={styles.error}>{error}</p>}

//           <form onSubmit={handleRegister} style={styles.form}>
//             <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
//             <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />

//             <select name="role" onChange={handleChange} style={styles.input}>
//               <option value="patient">Patient</option>
//               <option value="clinician">Clinician</option>
//             </select>

//             <button type="submit" style={styles.button}>
//               Register
//             </button>
//           </form>

//           <p style={styles.footerText}>
//             Already have an account?{' '}
//             <Link to="/login" style={styles.link}>
//               Login here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;

// /* 🎨 Styles */
// const styles = {
//   navbar: {
//     width: '100%',
//     height: '60px',
//     background: '#fff',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0 20px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     zIndex: 1000
//   },
//   logoContainer: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   logo: {
//     height: '35px',
//     marginRight: '10px'
//   },
//   brand: {
//     fontSize: '18px',
//     fontWeight: 'bold',
//     color: '#764ba2' // purple
//   },
//   navLink: {
//     color: '#764ba2',
//     textDecoration: 'none',
//     fontWeight: 'bold'
//   },
//   container: {
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: 'linear-gradient(135deg, #667eea, #764ba2)',
//     fontFamily: 'Arial, sans-serif',
//     paddingTop: '60px' // 👈 space for navbar
//   },
//   card: {
//     background: '#fff',
//     padding: '30px',
//     borderRadius: '15px',
//     width: '350px',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
//     textAlign: 'center'
//   },
//   title: {
//     marginBottom: '5px',
//     color: '#333'
//   },
//   subtitle: {
//     fontSize: '14px',
//     color: '#777',
//     marginBottom: '20px'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   input: {
//     padding: '12px',
//     margin: '8px 0',
//     borderRadius: '8px',
//     border: '1px solid #ddd',
//     fontSize: '14px'
//   },
//   button: {
//     marginTop: '15px',
//     padding: '12px',
//     borderRadius: '8px',
//     border: 'none',
//     background: '#764ba2', // purple
//     color: '#fff',
//     fontSize: '16px',
//     cursor: 'pointer'
//   },
//   footerText: {
//     marginTop: '15px',
//     fontSize: '14px'
//   },
//   link: {
//     color: '#764ba2',
//     textDecoration: 'none',
//     fontWeight: 'bold'
//   },
//   error: {
//     color: 'red',
//     fontSize: '13px'
//   }
// };
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../api/axios';
// import logo from '../assets/logo.png'; 

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'patient'
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await api.post('/auth/register', formData);
//       localStorage.setItem('token', response.data.token);
//       navigate('/chat');
//     } catch (error) {
//       const errorMsg = error.response?.data?.detail || "Registration failed";
//       setError(typeof errorMsg === 'string' ? errorMsg : "Check your connection");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* 🔝 Navbar */}
//       <nav style={styles.navbar}>
//         <div style={styles.navContent}>
//           <div style={styles.logoContainer}>
//             <img src={logo} alt="Logo" style={styles.logo} />
//             <span style={styles.brand}>CogniCare <span style={styles.aiText}>AI</span></span>
//           </div>
//           <Link to="/login" style={styles.loginBtn}>Login</Link>
//         </div>
//       </nav>

//       {/* 🧾 Main Form */}
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <h2 style={styles.title}>Create Account</h2>
//           <p style={styles.subtitle}>Join CogniCare AI to start your journey</p>

//           {error && <div style={styles.errorBox}>{error}</div>}

//           <form onSubmit={handleRegister} style={styles.form}>
//             <label style={styles.label}>Full Name</label>
//             <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required style={styles.input} />

//             <label style={styles.label}>Email Address</label>
//             <input type="email" name="email" placeholder="user@example.com" onChange={handleChange} required style={styles.input} />

//             <label style={styles.label}>Password</label>
//             <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required style={styles.input} />

//             <label style={styles.label}>Role</label>
//             <select name="role" onChange={handleChange} style={styles.select}>
//               <option value="patient">Patient</option>
//               <option value="clinician">Clinician</option>
//             </select>

//             <button type="submit" style={styles.submitBtn}>Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: { minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' },
//   navbar: {
//     height: '70px',
//     backgroundColor: '#fff',
//     display: 'flex',
//     justifyContent: 'center',
//     borderBottom: '1px solid #eee',
//     position: 'fixed',
//     width: '100%',
//     top: 0,
//     zIndex: 10
//   },
//   navContent: {
//     width: '100%',
//     maxWidth: '1000px', // This keeps the items from being too far apart
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '0 20px'
//   },
//   logoContainer: { display: 'flex', alignItems: 'center' },
//   logo: { height: '35px', marginRight: '10px' },
//   brand: { fontSize: '22px', fontWeight: 'bold', color: '#111' },
//   aiText: { color: '#4f46e5', fontWeight: '300' },
//   loginBtn: { 
//     textDecoration: 'none', 
//     color: '#4f46e5', 
//     fontWeight: '600',
//     padding: '8px 16px',
//     backgroundColor: '#f5f3ff',
//     borderRadius: '8px'
//   },
//   container: { display: 'flex', justifyContent: 'center', paddingTop: '120px' },
//   card: { 
//     background: '#fff', 
//     padding: '40px', 
//     borderRadius: '12px', 
//     width: '100%', 
//     maxWidth: '400px',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
//   },
//   title: { fontSize: '24px', textAlign: 'center', marginBottom: '8px' },
//   subtitle: { color: '#666', textAlign: 'center', fontSize: '14px', marginBottom: '30px' },
//   form: { display: 'flex', flexDirection: 'column' },
//   label: { fontSize: '13px', fontWeight: '600', marginBottom: '5px', color: '#444' },
//   input: { padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' },
//   select: { padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd' },
//   submitBtn: { 
//     padding: '14px', 
//     backgroundColor: '#4f46e5', 
//     color: '#fff', 
//     border: 'none', 
//     borderRadius: '8px', 
//     fontWeight: 'bold', 
//     cursor: 'pointer' 
//   },
//   errorBox: { padding: '10px', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '8px', marginBottom: '15px', fontSize: '13px', textAlign: 'center' }
// };

// export default Register;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo.png'; 

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient'
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // POST to your backend register endpoint
      const response = await api.post('/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/chat');
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Registration failed";
      setError(typeof errorMsg === 'string' ? errorMsg : "Check your connection");
    }
  };

  return (
    <div style={styles.page}>
      {/* 🔝 Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <span style={styles.brand}>CogniCare <span style={styles.aiText}>AI</span></span>
          </div>
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        </div>
      </nav>

      {/* 🧾 Main Form Container */}
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join CogniCare AI to start your journey</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleRegister} style={styles.form}>
            <label style={styles.label}>Full Name</label>
            <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                onChange={handleChange} 
                required 
                style={styles.input} 
            />

            <label style={styles.label}>Email Address</label>
            <input 
                type="email" 
                name="email" 
                placeholder="user@example.com" 
                onChange={handleChange} 
                required 
                style={styles.input} 
            />

            <label style={styles.label}>Password</label>
            <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                onChange={handleChange} 
                required 
                style={styles.input} 
            />

            <button type="submit" style={styles.submitBtn}>Submit</button>
          </form>

          <p style={styles.footerText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    minHeight: '100vh', 
    backgroundColor: 'white', // Your requested background color
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
  aiText: { color: 'hsl(215, 60%, 50%)', fontWeight: '300' },
  loginBtn: { 
    textDecoration: 'none', 
    color: '#b8e2f4', 
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
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)', // Stronger shadow to pop against #58afdd
    textAlign: 'center'
  },
  title: { fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '32px' },
  form: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
  label: { fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#374151' },
  input: { 
    padding: '12px', 
    marginBottom: '18px', 
    borderRadius: '8px', 
    border: '1px solid #d1d5db', 
    outline: 'none',
    fontSize: '15px'
  },
  select: { 
    padding: '12px', 
    marginBottom: '25px', 
    borderRadius: '8px', 
    border: '1px solid #d1d5db',
    backgroundColor: '#fff'
  },
  submitBtn: { 
    padding: '14px', 
    backgroundColor: '#58afdd', 
    color: '#ffffff', 
    border: 'none', 
    borderRadius: '8px', 
    fontWeight: '700', 
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  footerText: { marginTop: '20px', fontSize: '14px', color: '#6b7280' },
  link: { color: '#4f46e5', textDecoration: 'none', fontWeight: '600' },
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

export default Register;