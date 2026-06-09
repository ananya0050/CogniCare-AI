
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import logo from "../assets/logo.png";

// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function Dashboard() {
//   const [stats, setStats] = useState({
//     avgScore: 0,
//     avgSentiment: "N/A",
//     totalMessages: 0,
//     dailyData: [],
//     sentimentCounts: { positive: 0, negative: 0, neutral: 0 }
//   });

//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await api.get("/chat/history");
//         const data = response.data;

//         if (data && data.length > 0) {
//           const userOnly = data
//             .filter(msg => msg.sender === "user")
//             .map(msg => ({
//               sentiment: msg.sentiment || "neutral",
//               score: msg.cognitive_load_score || 0,
//               timestamp: msg.timestamp
//             }));

//           const totalScore = userOnly.reduce((acc, curr) => acc + curr.score, 0);
//           const avgScore = userOnly.length
//             ? (totalScore / userOnly.length).toFixed(2)
//             : 0;

//           const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
//           userOnly.forEach(m => {
//             if (m.sentiment === "positive") sentimentCounts.positive++;
//             else if (m.sentiment === "negative") sentimentCounts.negative++;
//             else sentimentCounts.neutral++;
//           });

//           const avgSentiment = Object.keys(sentimentCounts).reduce((a, b) =>
//             sentimentCounts[a] > sentimentCounts[b] ? a : b
//           );

//           const dailyMap = {};
//           userOnly.forEach(m => {
//             const day = new Date(m.timestamp).toLocaleDateString();
//             if (!dailyMap[day]) dailyMap[day] = { total: 0, count: 0 };
//             dailyMap[day].total += m.score;
//             dailyMap[day].count++;
//           });

//           const dailyData = Object.entries(dailyMap).map(([day, val]) => ({
//             day,
//             avg: (val.total / val.count).toFixed(2)
//           }));

//           setStats({
//             avgScore,
//             avgSentiment,
//             totalMessages: userOnly.length,
//             dailyData,
//             sentimentCounts
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching dashboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (loading) {
//     return <div style={{ padding: "40px" }}>Loading Dashboard...</div>;
//   }

//   const combinedData = {
//     labels: stats.dailyData.map(d => d.day),
//     datasets: [
//       {
//         label: "Avg Cognitive Load",
//         data: stats.dailyData.map(d => d.avg),
//         backgroundColor: "rgba(79,70,229,0.6)"
//       },
//       {
//         label: "Positive",
//         data: Array(stats.dailyData.length).fill(stats.sentimentCounts.positive),
//         backgroundColor: "#10b981"
//       },
//       {
//         label: "Negative",
//         data: Array(stats.dailyData.length).fill(stats.sentimentCounts.negative),
//         backgroundColor: "#ef4444"
//       },
//       {
//         label: "Neutral",
//         data: Array(stats.dailyData.length).fill(stats.sentimentCounts.neutral),
//         backgroundColor: "#6b7280"
//       }
//     ]
//   };

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       background: "#f5f7fb"
//     },

//     navbar: {
//       height: "70px",
//       backgroundColor: "#ffffff",
//       display: "flex",
//       justifyContent: "center",
//       position: "fixed",
//       width: "100%",
//       top: 0,
//       zIndex: 10,
//       borderBottom: "1px solid #eee"
//     },

//     navContent: {
//       width: "100%",
//       maxWidth: "1100px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "0 20px"
//     },

//     navLeft: {
//       display: "flex",
//       alignItems: "center",
//       gap: "40px"
//     },

//     logoContainer: { display: "flex", alignItems: "center" },
//     logo: { height: "35px", marginRight: "10px" },
//     brand: { fontSize: "22px", fontWeight: "bold", color: "#111" },
//     aiText: { color: "#4f46e5" },

//     tabs: { display: "flex", gap: "20px" },

//     tabLink: {
//       textDecoration: "none",
//       color: "#6b7280",
//       fontWeight: "600"
//     },

//     activeTab: {
//       color: "#4f46e5",
//       borderBottom: "2px solid #4f46e5"
//     },

//     logoutBtn: {
//       color: "#ef4444",
//       fontWeight: "600",
//       padding: "8px 16px",
//       backgroundColor: "#fef2f2",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer"
//     },

//     container: {
//       paddingTop: "100px",
//       maxWidth: "1100px",
//       margin: "auto",
//       padding: "20px"
//     },

//     title: {
//       fontSize: "28px",
//       fontWeight: "700",
//       color: "white"
//     },

//     subtitle: {
//       color: "#6b7280",
//       marginBottom: "30px"
//     },

//     cardRow: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//       gap: "20px"
//     },

//     card: {
//       background: "#fff",
//       padding: "20px",
//       borderRadius: "14px",
//       textAlign: "center",
//       boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
//     },

//     cardLabel: {
//       fontSize: "15px",
//       fontWeight: "600",
//       color: "#6b7280"
//     },

//     cardValue: {
//       fontSize: "22px",
//       fontWeight: "600"
//     },

//     chartCard: {
//       height: "350px",
//       maxWidth: "750px",
//       margin: "40px auto",
//       background: "#fff",
//       padding: "20px",
//       borderRadius: "16px",
//       boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
//     },

//     guidanceCard: {
//       marginTop: "30px",
//       padding: "20px",
//       borderRadius: "12px",
//       background: "#f9fafb",
//       textAlign: "center"
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* Navbar */}
//       <div style={styles.navbar}>
//         <div style={styles.navContent}>
//           <div style={styles.navLeft}>
//             <div style={styles.logoContainer}>
//               <img src={logo} alt="logo" style={styles.logo} />
//               <span style={styles.brand}>
//                 Cognicare<span style={styles.aiText}>AI</span>
//               </span>
//             </div>

//             <div style={styles.tabs}>
//               <Link
//                 to="/chat"
//                 style={{
//                   ...styles.tabLink,
//                   ...(location.pathname === "/chat" ? styles.activeTab : {})
//                 }}
//               >
//                 Chat
//               </Link>

//               <Link
//                 to="/dashboard"
//                 style={{
//                   ...styles.tabLink,
//                   ...(location.pathname === "/dashboard" ? styles.activeTab : {})
//                 }}
//               >
//                 Dashboard
//               </Link>
//             </div>
//           </div>

//           <button style={styles.logoutBtn} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main */}
//       <div style={styles.container}>
//         <h2 style={styles.title}>Your Cognitive Health Dashboard</h2>
//         <p style={styles.subtitle}>
//           Overview of your mental load and sentiment trends.
//         </p>

//         {/* Cards */}
//         <div style={styles.cardRow}>
//           <div style={styles.card}>
//             <p style={styles.cardLabel}>Avg Cognitive Load</p>
//             <p
//               style={{
//                 ...styles.cardValue,
//                 color:
//                   stats.avgScore > 7
//                     ? "#ef4444"
//                     : stats.avgScore > 4
//                     ? "#f59e0b"
//                     : "#10b981"
//               }}
//             >
//               {stats.avgScore}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <p style={styles.cardLabel}>Avg Sentiment</p>
//             <p
//               style={{
//                 ...styles.cardValue,
//                 color:
//                   stats.avgSentiment === "negative"
//                     ? "#ef4444"
//                     : stats.avgSentiment === "positive"
//                     ? "#10b981"
//                     : "#6b7280"
//               }}
//             >
//               {stats.avgSentiment}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <p style={styles.cardLabel}>Total Messages</p>
//             <p style={{ ...styles.cardValue, color: "#4f46e5" }}>
//               {stats.totalMessages}
//             </p>
//           </div>
//         </div>

//         {/* Chart */}
//         <div style={styles.chartCard}>
//           <Bar
//             data={combinedData}
//             options={{ responsive: true, maintainAspectRatio: false }}
//           />
//         </div>

//         {/* Guidance */}
//         <div style={styles.guidanceCard}>
//           <h3>Health Guidance</h3>
//           <p style={{ fontWeight: "600" }}>
//             {stats.avgScore > 7
//               ? "⚠️ High stress detected. Please consult a professional."
//               : stats.avgScore > 4
//               ? "⚠️ Moderate stress. Try relaxation techniques."
//               : "✅ You're doing well. Maintain healthy habits."}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import api from "../api/axios";
// import logo from "../assets/logo.png";

// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function Dashboard() {
//   const [stats, setStats] = useState({
//     avgScore: 0,
//     avgSentiment: "N/A",
//     totalMessages: 0,
//     dailyData: [],
//     sentimentCounts: { positive: 0, negative: 0, neutral: 0 }
//   });

//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await api.get("/chat/history");
//         const data = response.data;

//         if (data && data.length > 0) {
//           const userOnly = data
//             .filter(msg => msg.sender === "user")
//             .map(msg => ({
//               sentiment: msg.sentiment || "neutral",
//               score: msg.cognitive_load_score || 0,
//               timestamp: msg.timestamp
//             }));

//           const totalScore = userOnly.reduce((acc, curr) => acc + curr.score, 0);
//           const avgScore = userOnly.length
//             ? (totalScore / userOnly.length).toFixed(2)
//             : 0;

//           const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
//           userOnly.forEach(m => {
//             if (m.sentiment === "positive") sentimentCounts.positive++;
//             else if (m.sentiment === "negative") sentimentCounts.negative++;
//             else sentimentCounts.neutral++;
//           });

//           const avgSentiment = Object.keys(sentimentCounts).reduce((a, b) =>
//             sentimentCounts[a] > sentimentCounts[b] ? a : b
//           );

//           const dailyMap = {};
//           userOnly.forEach(m => {
//             const day = new Date(m.timestamp).toLocaleDateString();
//             if (!dailyMap[day]) dailyMap[day] = { total: 0, count: 0 };
//             dailyMap[day].total += m.score;
//             dailyMap[day].count++;
//           });

//           const dailyData = Object.entries(dailyMap).map(([day, val]) => ({
//             day,
//             avg: (val.total / val.count).toFixed(2)
//           }));

//           setStats({
//             avgScore,
//             avgSentiment,
//             totalMessages: userOnly.length,
//             dailyData,
//             sentimentCounts
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching dashboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (loading) {
//     return <div style={{ padding: "40px" }}>Loading Dashboard...</div>;
//   }

//   const combinedData = {
//     labels: stats.dailyData.map(d => d.day),
//     datasets: [
//       {
//         label: "Avg Cognitive Load",
//         data: stats.dailyData.map(d => d.avg),
//         backgroundColor: "rgba(79,70,229,0.6)"
//       },
//       {
//         label: "Positive",
//         data: Array(stats.dailyData.length).fill(stats.sentimentCounts.positive),
//         backgroundColor: "#10b981"
//       },
//       {
//         label: "Negative",
//         data: Array(stats.dailyData.length).fill(stats.sentimentCounts.negative),
//         backgroundColor: "#ef4444"
//       },
//       {
//         label: "Neutral",
//         data: Array(stats.dailyData.length).fill(stats.sentimentCounts.neutral),
//         backgroundColor: "#6b7280"
//       }
//     ]
//   };

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       background: "#f5f7fb"
//     },

//     navbar: {
//       height: "70px",
//       backgroundColor: "#ffffff",
//       display: "flex",
//       justifyContent: "center",
//       position: "fixed",
//       width: "100%",
//       top: 0,
//       zIndex: 10,
//       borderBottom: "1px solid #eee"
//     },

//     navContent: {
//       width: "100%",
//       maxWidth: "1100px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "0 20px"
//     },

//     navLeft: {
//       display: "flex",
//       alignItems: "center",
//       gap: "40px"
//     },

//     logoContainer: { display: "flex", alignItems: "center" },
//     logo: { height: "35px", marginRight: "10px" },
//     brand: { fontSize: "22px", fontWeight: "bold", color: "#111" },
//     aiText: { color: "#4f46e5" },

//     tabs: { display: "flex", gap: "20px" },

//     tabLink: {
//       textDecoration: "none",
//       color: "#6b7280",
//       fontWeight: "600"
//     },

//     activeTab: {
//       color: "#4f46e5",
//       borderBottom: "2px solid #4f46e5"
//     },

//     logoutBtn: {
//       color: "#ef4444",
//       fontWeight: "600",
//       padding: "8px 16px",
//       backgroundColor: "#fef2f2",
//       borderRadius: "8px",
//       border: "none",
//       cursor: "pointer"
//     },

//     container: {
//       paddingTop: "100px",
//       maxWidth: "1100px",
//       margin: "auto",
//       padding: "20px"
//     },

//     title: {
//       fontSize: "28px",
//       fontWeight: "700",
//       color: "#4f46e5"
//     },

//     subtitle: {
//       color: "#6b7280",
//       marginBottom: "30px"
//     },

//     cardRow: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//       gap: "20px"
//     },

//     card: {
//       background: "#fff",
//       padding: "20px",
//       borderRadius: "14px",
//       textAlign: "center",
//       boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
//     },

//     cardLabel: {
//       fontSize: "15px",
//       fontWeight: "600",
//       color: "#6b7280"
//     },

//     cardValue: {
//       fontSize: "22px",
//       fontWeight: "600"
//     },

//     chartCard: {
//       height: "350px",
//       maxWidth: "750px",
//       margin: "40px auto",
//       background: "#fff",
//       padding: "20px",
//       borderRadius: "16px",
//       boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
//     },

//     guidanceCard: {
//       marginTop: "30px",
//       padding: "20px",
//       borderRadius: "12px",
//       background: "#f9fafb",
//       textAlign: "center"
//     }
//   };

//   return (
//     <div style={styles.page}>
//       {/* Navbar */}
//       <div style={styles.navbar}>
//         <div style={styles.navContent}>
//           <div style={styles.navLeft}>
//             <div style={styles.logoContainer}>
//               <img src={logo} alt="logo" style={styles.logo} />
//               <span style={styles.brand}>
//                 Cognicare<span style={styles.aiText}>AI</span>
//               </span>
//             </div>

//             <div style={styles.tabs}>
//               <Link
//                 to="/chat"
//                 style={{
//                   ...styles.tabLink,
//                   ...(location.pathname === "/chat" ? styles.activeTab : {})
//                 }}
//               >
//                 Chat
//               </Link>

//               <Link
//                 to="/dashboard"
//                 style={{
//                   ...styles.tabLink,
//                   ...(location.pathname === "/dashboard" ? styles.activeTab : {})
//                 }}
//               >
//                 Dashboard
//               </Link>
//             </div>
//           </div>

//           <button style={styles.logoutBtn} onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main */}
//       <div style={styles.container}>
//         <h2 style={styles.title}>Your Cognitive Health Dashboard</h2>
//         <p style={styles.subtitle}>
//           Overview of your mental load and sentiment trends.
//         </p>

//         {/* Cards */}
//         <div style={styles.cardRow}>
//           <div style={styles.card}>
//             <p style={styles.cardLabel}>Avg Cognitive Load</p>
//             <p
//               style={{
//                 ...styles.cardValue,
//                 color:
//                   stats.avgScore > 7
//                     ? "#ef4444"
//                     : stats.avgScore > 4
//                     ? "#f59e0b"
//                     : "#10b981"
//               }}
//             >
//               {stats.avgScore}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <p style={styles.cardLabel}>Avg Sentiment</p>
//             <p
//               style={{
//                 ...styles.cardValue,
//                 color:
//                   stats.avgSentiment === "negative"
//                     ? "#ef4444"
//                     : stats.avgSentiment === "positive"
//                     ? "#10b981"
//                     : "#6b7280"
//               }}
//             >
//               {stats.avgSentiment}
//             </p>
//           </div>

//           <div style={styles.card}>
//             <p style={styles.cardLabel}>Total Messages</p>
//             <p style={{ ...styles.cardValue, color: "#4f46e5" }}>
//               {stats.totalMessages}
//             </p>
//           </div>
//         </div>

//         {/* Chart */}
//         <div style={styles.chartCard}>
//           <Bar
//             data={combinedData}
//             options={{ responsive: true, maintainAspectRatio: false }}
//           />
//         </div>

//         {/* Guidance */}
//         <div style={styles.guidanceCard}>
//           <h3>Health Guidance</h3>
//           <p style={{ fontWeight: "600" }}>
//             {stats.avgScore > 7
//               ? "⚠️ High stress detected. Please consult a professional."
//               : stats.avgScore > 4
//               ? "⚠️ Moderate stress. Try relaxation techniques."
//               : "✅ You're doing well. Maintain healthy habits."}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.png";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({
    avgScore: 0,
    avgSentiment: "N/A",
    totalMessages: 0,
    dailyData: [],
    sentimentCounts: { positive: 0, negative: 0, neutral: 0 }
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/chat/history");
        const data = response.data;

        if (data && data.length > 0) {

          // ✅ FIX: removed wrong sender filter
          const userOnly = data.map(msg => ({
            sentiment: msg.sentiment || "neutral",
            score: msg.cognitive_load_score || 0,
            timestamp: msg.timestamp
          }));

          const totalScore = userOnly.reduce((acc, curr) => acc + curr.score, 0);
          const avgScore = userOnly.length
            ? (totalScore / userOnly.length).toFixed(2)
            : 0;

          const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
          userOnly.forEach(m => {
            if (m.sentiment === "positive") sentimentCounts.positive++;
            else if (m.sentiment === "negative") sentimentCounts.negative++;
            else sentimentCounts.neutral++;
          });

          const avgSentiment = Object.keys(sentimentCounts).reduce((a, b) =>
            sentimentCounts[a] > sentimentCounts[b] ? a : b
          );

          const dailyMap = {};
          userOnly.forEach(m => {
            const day = new Date(m.timestamp).toLocaleDateString();
            if (!dailyMap[day]) dailyMap[day] = { total: 0, count: 0 };
            dailyMap[day].total += m.score;
            dailyMap[day].count++;
          });

          const dailyData = Object.entries(dailyMap).map(([day, val]) => ({
            day,
            avg: (val.total / val.count).toFixed(2)
          }));

          setStats({
            avgScore,
            avgSentiment,
            totalMessages: userOnly.length,
            dailyData,
            sentimentCounts
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading Dashboard...</div>;
  }

  const combinedData = {
    labels: stats.dailyData.map(d => d.day),
    datasets: [
      {
        label: "Avg Cognitive Load",
        data: stats.dailyData.map(d => d.avg),
        backgroundColor: "rgba(79,70,229,0.6)"
      },
      {
        label: "Positive",
        data: Array(stats.dailyData.length).fill(stats.sentimentCounts.positive),
        backgroundColor: "#10b981"
      },
      {
        label: "Negative",
        data: Array(stats.dailyData.length).fill(stats.sentimentCounts.negative),
        backgroundColor: "#ef4444"
      },
      {
        label: "Neutral",
        data: Array(stats.dailyData.length).fill(stats.sentimentCounts.neutral),
        backgroundColor: "#6b7280"
      }
    ]
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f5f7fb"
    },
    navbar: {
      height: "70px",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      width: "100%",
      top: 0,
      zIndex: 10,
      borderBottom: "1px solid #eee"
    },
    navContent: {
      width: "100%",
      maxWidth: "1100px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px"
    },
    navLeft: {
      display: "flex",
      alignItems: "center",
      gap: "40px"
    },
    logoContainer: { display: "flex", alignItems: "center" },
    logo: { height: "35px", marginRight: "10px" },
    brand: { fontSize: "22px", fontWeight: "bold", color: "#111" },
    aiText: { color: "#4f46e5" },
    tabs: { display: "flex", gap: "20px" },
    tabLink: {
      textDecoration: "none",
      color: "#6b7280",
      fontWeight: "600"
    },
    activeTab: {
      color: "#4f46e5",
      borderBottom: "2px solid #4f46e5"
    },
    logoutBtn: {
      color: "#ef4444",
      fontWeight: "600",
      padding: "8px 16px",
      backgroundColor: "#fef2f2",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer"
    },
    container: {
      paddingTop: "100px",
      maxWidth: "1100px",
      margin: "auto",
      padding: "20px"
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#4f46e5"
    },
    subtitle: {
      color: "#6b7280",
      marginBottom: "30px"
    },
    cardRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px"
    },
    card: {
      background: "#fff",
      padding: "20px",
      borderRadius: "14px",
      textAlign: "center",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
    },
    cardLabel: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#6b7280"
    },
    cardValue: {
      fontSize: "22px",
      fontWeight: "600"
    },
    chartCard: {
      height: "350px",
      maxWidth: "750px",
      margin: "40px auto",
      background: "#fff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },
    guidanceCard: {
      marginTop: "30px",
      padding: "20px",
      borderRadius: "12px",
      background: "#f9fafb",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <div style={styles.logoContainer}>
              <img src={logo} alt="logo" style={styles.logo} />
              <span style={styles.brand}>
                Cognicare<span style={styles.aiText}>AI</span>
              </span>
            </div>

            <div style={styles.tabs}>
              <Link to="/chat" style={{ ...styles.tabLink, ...(location.pathname === "/chat" ? styles.activeTab : {}) }}>
                Chat
              </Link>

              <Link to="/dashboard" style={{ ...styles.tabLink, ...(location.pathname === "/dashboard" ? styles.activeTab : {}) }}>
                Dashboard
              </Link>
            </div>
          </div>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>Your Cognitive Health Dashboard</h2>
        <p style={styles.subtitle}>
          Overview of your mental load and sentiment trends.
        </p>

        <div style={styles.cardRow}>
          <div style={styles.card}>
            <p style={styles.cardLabel}>Avg Cognitive Load</p>
            <p style={{ ...styles.cardValue }}>{stats.avgScore}</p>
          </div>

          <div style={styles.card}>
            <p style={styles.cardLabel}>Avg Sentiment</p>
            <p style={{ ...styles.cardValue }}>{stats.avgSentiment}</p>
          </div>

          <div style={styles.card}>
            <p style={styles.cardLabel}>Total Messages</p>
            <p style={{ ...styles.cardValue }}>{stats.totalMessages}</p>
          </div>
        </div>

        <div style={styles.chartCard}>
          <Bar data={combinedData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div style={styles.guidanceCard}>
          <h3>Health Guidance</h3>
          <p style={{ fontWeight: "600" }}>
            {stats.avgScore > 7
              ? "⚠️ High stress detected. Please consult a professional."
              : stats.avgScore > 4
              ? "⚠️ Moderate stress. Try relaxation techniques."
              : "✅ You're doing well. Maintain healthy habits."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;