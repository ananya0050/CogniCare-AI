
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo.png'; 

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userText, setUserText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

    // 🔹 Fetch welcome message on load
  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const response = await api.get('/chat/welcome');
        const { ai_response } = response.data;
        setMessages([{ text: ai_response, sender: 'ai' }]);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      }
    };
    fetchWelcome();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/chat/history');
        if (response.data && response.data.length > 0) {
          setMessages(response.data.flatMap(msg => {
            const arr = [];
            if (msg.user_message) {
              arr.push({ text: msg.user_message, sender: 'user' });
            }
            if (msg.ai_response) {
              arr.push({
                text: msg.ai_response,
                sender: 'ai',
                sentiment: msg.sentiment,
                score: msg.cognitive_load_score
              });
            }
            return arr;
          }));
        } else {
          // fallback to welcome if no history
          const welcome = await api.get('/chat/welcome');
          setMessages([{ text: welcome.data.ai_response, sender: 'ai' }]);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userText.trim()) return;

    const newMessages = [...messages, { text: userText, sender: 'user' }];
    setMessages(newMessages);
    
    const currentInput = userText;
    setUserText(''); 
    setLoading(true);

    try {
      const response = await api.post('/chat/send', { message: currentInput });
      const { ai_response, sentiment, cognitive_load_score } = response.data;

      setMessages([
        ...newMessages, 
        { 
          text: ai_response, 
          sender: 'ai',
          sentiment: sentiment,
          score: cognitive_load_score 
        }
      ]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages([...newMessages, { text: "Error: Could not reach the AI.", sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* 🔝 Navbar with Chat & Dashboard Tabs */}
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.navLeft}>
            <div style={styles.logoContainer}>
              <img src={logo} alt="Logo" style={styles.logo} />
              <span style={styles.brand}>Cognicare<span style={styles.aiText}>AI</span></span>
            </div>
            
            <div style={styles.tabs}>
              <Link 
                to="/chat" 
                style={{
                  ...styles.tabLink,
                  ...(location.pathname === '/chat' ? styles.activeTab : {})
                }}
              >
                Chat
              </Link>
              <Link 
                to="/dashboard" 
                style={{
                  ...styles.tabLink,
                  ...(location.pathname === '/dashboard' ? styles.activeTab : {})
                }}
              >
                Dashboard
              </Link>
            </div>
          </div>

          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.chatCard}>
          <div style={styles.chatHeader}>
            <h2 style={styles.title}>Health AI Assistant</h2>
            <p style={styles.subtitle}>Analyzing mental load & sentiment in real-time</p>
          </div>
          
          <div style={styles.messageArea}>
            {messages.length === 0 && (
              <div style={styles.welcomeMsg}>
                👋 Hello! How are you feeling today? I'm here to listen.
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} style={{ 
                textAlign: msg.sender === 'user' ? 'right' : 'left', 
                margin: '20px 0' 
              }}>
                <div style={{ 
                  ...styles.bubble,
                  backgroundColor: msg.sender === 'user' ? '#4f46e5' : '#f3f4f6', 
                  color: msg.sender === 'user' ? 'white' : '#1f2937',
                  borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                }}>
                  {msg.text}
                </div>

                {msg.sender === 'ai' && msg.sentiment && (
                  <div style={styles.metricsRow}>
                    <span style={{ 
                      ...styles.badge,
                      background: msg.sentiment === 'negative' ? '#fee2e2' : '#dcfce7',
                      color: msg.sentiment === 'negative' ? '#b91c1c' : '#166534',
                    }}>
                      Sentiment: <strong>{msg.sentiment}</strong>
                    </span>
                    
                    <span style={styles.scoreBadge}>
                      Cognitive Score: <strong>{msg.score}</strong>
                    </span>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={styles.loadingText}>AI is analyzing your mental load...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} style={styles.inputWrapper}>
            <input 
              type="text" 
              value={userText} 
              onChange={(e) => setUserText(e.target.value)} 
              placeholder="Describe your thoughts..." 
              style={styles.chatInput}
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading} 
              style={{
                ...styles.sendBtn,
                opacity: loading ? 0.6 : 1
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    minHeight: '100vh', 
    backgroundColor: '#', 
    fontFamily: '"Inter", sans-serif',
    margin: 0
  },
  navbar: {
    height: '70px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 10,
    borderBottom: '1px solid #eee'
  },
  navContent: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px'
  },
  logoContainer: { display: 'flex', alignItems: 'center' },
  logo: { height: '35px', marginRight: '10px' },
  brand: { fontSize: '22px', fontWeight: 'bold', color: '#111' },
  aiText: { color: '#4f46e5', fontWeight: '300' },
  tabs: {
    display: 'flex',
    gap: '20px'
  },
  tabLink: {
    textDecoration: 'none',
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '15px',
    padding: '8px 4px',
    transition: 'color 0.2s'
  },
  activeTab: {
    color: '#4f46e5',
    borderBottom: '2px solid #4f46e5'
  },
  logoutBtn: { 
    color: '#ef4444', 
    fontWeight: '600',
    fontSize: '14px',
    padding: '8px 16px',
    backgroundColor: '#fef2f2',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer'
  },
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    paddingTop: '100px',
    paddingBottom: '20px',
    height: 'calc(100vh - 120px)'
  },
  chatCard: { 
    background: '#ffffff', 
    borderRadius: '20px', 
    width: '95%', 
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    overflow: 'hidden'
  },
  chatHeader: {
    padding: '20px',
    borderBottom: '1px solid #f3f4f6',
    textAlign: 'center'
  },
  title: { margin: 0, fontSize: '20px', color: '#111' },
  subtitle: { margin: '5px 0 0 0', fontSize: '13px', color: '#6b7280' },
  messageArea: { 
    flex: 1, 
    padding: '20px', 
    overflowY: 'auto',
    backgroundColor: '#fff'
  },
  bubble: {
    padding: '12px 18px',
    display: 'inline-block',
    maxWidth: '75%',
    fontSize: '15px',
    lineHeight: '1.5',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  welcomeMsg: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: '100px',
    fontSize: '15px'
  },
  metricsRow: {
    marginTop: '8px',
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-start'
  },
  badge: {
    fontSize: '11px',
    padding: '4px 10px',
    borderRadius: '12px',
    border: '1px solid transparent'
  },
  scoreBadge: {
    fontSize: '11px',
    padding: '4px 10px',
    borderRadius: '12px',
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    border: '1px solid #bfdbfe'
  },
  loadingText: { fontSize: '12px', color: '#9ca3af', fontStyle: 'italic', marginTop: '10px' },
  inputWrapper: {
    padding: '20px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    gap: '12px'
  },
  chatInput: {
    flex: 1,
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    outline: 'none',
    fontSize: '15px',
    backgroundColor: '#f9fafb'
  },
  sendBtn: {
    padding: '0 25px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default Chat;



