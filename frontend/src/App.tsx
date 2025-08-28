import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import LiveTutoring from "./components/LiveTutoring";
import AIChat from "./components/AIChat";
import StudyMaterials from "./components/StudyMaterials";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

// Teacher imports
import TeacherLayout from "./components/TeacherLayout";
import TeacherHome from "./components/TeacherHome";
import TeacherSession from "./components/TeacherSession";

// ✅ Helper for session-based fetch
const fetchWithSession = async (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    credentials: "include", // send cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
};

function Layout({
  isLoggedIn,
  username,
  handleLogout,
  refreshAuth,
}: {
  isLoggedIn: boolean;
  username: string | null;
  handleLogout: () => void;
  refreshAuth: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/teacher"); // ✅ hide global header in teacher module

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {!hideHeader && (
        <Header
          activeSection={location.pathname}
          onNavigate={(path) => navigate(path)}
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={async () => {
            await fetchWithSession("http://localhost:1234/api/auth/logout", {
              method: "POST",
            });
            handleLogout();
            navigate("/");
          }}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero onGetStarted={() => navigate("/ai-chat")} />
              <Features onFeatureClick={(path) => navigate(path)} />
            </>
          }
        />
        <Route path="/live-tutoring" element={<LiveTutoring />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/study-materials" element={<StudyMaterials />} />

        <Route
          path="/login"
          element={<LoginWrapper refreshAuth={refreshAuth} />}
        />
        <Route
          path="/signup"
          element={<SignUpWrapper refreshAuth={refreshAuth} />}
        />

        {/* Teacher Module 🚀 */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherHome />} />
          <Route path="session/:id" element={<TeacherSession />} />
        </Route>
      </Routes>
    </div>
  );
}

const LoginWrapper = ({ refreshAuth }: { refreshAuth: () => void }) => {
  const navigate = useNavigate();
  return (
    <Login
      onLogin={(role) => {
        refreshAuth();
        if (role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/");
        }
      }}
      onSwitchToSignUp={() => navigate("/signup")}
    />
  );
};

const SignUpWrapper = ({ refreshAuth }: { refreshAuth: () => void }) => {
  const navigate = useNavigate();
  return (
    <SignUp
      onSignUp={(role) => {
        refreshAuth();
        if (role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/");
        }
      }}
      onSwitchToLogin={() => navigate("/login")}
    />
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // ✅ Check session
  const refreshAuth = async () => {
    try {
      const res = await fetchWithSession("http://localhost:1234/api/auth/me");
      const data = await res.json();
      setIsLoggedIn(data.isAuthenticated);
      setUsername(data.isAuthenticated ? data.user.fullName : null);
    } catch (err) {
      setIsLoggedIn(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <Layout
      isLoggedIn={isLoggedIn}
      username={username}
      handleLogout={handleLogout}
      refreshAuth={refreshAuth}
    />
  );
};

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
