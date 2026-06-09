// // import { Link, useNavigate } from "react-router-dom";

// // export default function Navbar() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/");
// //   };

// //   return (
// //     <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
// //       <h1 className="text-xl font-bold">CogniCare</h1>

// //       <div className="flex gap-4">
// //         <Link to="/chat">Chat</Link>
// //         <Link to="/dashboard">Dashboard</Link>
// //         <button onClick={logout}>Logout</button>
// //       </div>
// //     </div>
// //   );
// // }
// import React from "react"; // <--- Add this line
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login"); // Changed from "/" to "/login" to match your routes
//   };

//   return (
//     <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
//       <h1 className="text-xl font-bold">CogniCare</h1>

//       <div className="flex gap-4">
//         <Link to="/chat" className="hover:underline">Chat</Link>
//         <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//         <button onClick={logout} className="hover:underline">Logout</button>
//       </div>
//     </nav>
//   );
// }
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem', 
      background: '#007bff', 
      color: 'white' 
    }}>
      <h1 style={{ margin: 0 }}>CogniCare</h1>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* Make sure these paths match App.jsx exactly */}
        <Link to="/chat" style={{ color: 'white', textDecoration: 'none' }}>Chat</Link>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
      </div>
    </nav>
  );
}