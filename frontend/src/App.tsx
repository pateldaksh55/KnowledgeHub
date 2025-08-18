import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import LiveTutoring from './components/LiveTutoring';
import AIChat from './components/AIChat';
import StudyMaterials from './components/StudyMaterials';
import Login from './components/Login';
import SignUp from './components/SignUp';

function Layout({
  isLoggedIn,
  handleLogout,
}: {
  isLoggedIn: boolean;
  handleLogout: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {!hideHeader && (
        <Header
          activeSection={location.pathname}
          onNavigate={(path) => navigate(path)}
          isLoggedIn={isLoggedIn}
          onAuthToggle={isLoggedIn ? handleLogout : () => navigate('/login')}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero onGetStarted={() => navigate('/ai-chat')} />
              <Features onFeatureClick={(path) => navigate(path)} />
            </>
          }
        />
        <Route path="/live-tutoring" element={<LiveTutoring />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/login" element={<LoginWrapper onLogin={handleLogout} />} />
        <Route path="/signup" element={<SignUpWrapper onSignUp={handleLogout} />} />
      </Routes>
    </div>
  );
}

const LoginWrapper = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();
  return (
    <Login
      onLogin={() => {
        onLogin();
        navigate('/');
      }}
      onSwitchToSignUp={() => navigate('/signup')}
    />
  );
};

const SignUpWrapper = ({ onSignUp }: { onSignUp: () => void }) => {
  const navigate = useNavigate();
  return (
    <SignUp
      onSignUp={() => {
        onSignUp();
        navigate('/');
      }}
      onSwitchToLogin={() => navigate('/login')}
    />
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return <Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />;
};

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
