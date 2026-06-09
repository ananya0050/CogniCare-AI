// // // import React from 'react';
// // // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // // import Login from "./pages/Login";
// // // import Register from "./pages/Register";
// // // import Chat from "./pages/Chat";
// // // import Dashboard from "./pages/Dashboard";
// // // import Navbar from "./components/Navbar";

// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Navbar />

// // //       <Routes>
// // //         <Route path="/" element={<Login />} />
// // //         <Route path="/register" element={<Register />} />
// // //         <Route path="/chat" element={<Chat />} />
// // //         <Route path="/dashboard" element={<Dashboard />} />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // export default App;
// // import React from 'react';
// // import { Routes, Route } from 'react-router-dom';

// // function App() {
// //   return (
// //     // No BrowserRouter here!
// //     <Routes>
// //       <Route path="/" element={<Home />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/register" element={<Register />} />
// //     </Routes>
// //   );
// // }

// // export default App;
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// // Add these lines (adjust the names if your files are named differently):
// // import Home from './pages/Home'; 
// // import Login from './pages/Login';
// // import Register from './pages/Register';

// // function App() {
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Home />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/register" element={<Register />} />
// //     </Routes>
// //   );
// // }

// // export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// API Configuration
import "./api/axios"; 

// Layout Components
import Navbar from "./components/Navbar";

// Page Components (Matching your sidebar exactly)
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";

/**
 * App Component
 * This is the heart of your frontend. It handles the routing
 * and ensures the Navbar is visible across all pages.
 */
function App() {
  return (
    <div className="app-container">
      {/* Navbar stays at the top regardless of which page is loaded */}
      <Navbar />

      <main className="content-area">
        <Routes>
          {/* 1. Default Route: If the user visits just "/", send them to Login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* 2. Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 3. Protected Routes (Where the main app logic lives) */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 4. Fallback: If user types a random URL, send them back to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;