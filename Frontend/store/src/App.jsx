import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import StoreList from './components/StoreList';
import RatingForm from './components/RatingForm';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const ProtectedRoute = ({ children, role }) => {
    if (!user) return <Navigate to="/" />;
    if (role && user.role !== role) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/stores" element={<ProtectedRoute role="user"><StoreList user={user} /></ProtectedRoute>} />
        <Route path="/store/ratings" element={<ProtectedRoute role="store_owner"><RatingForm user={user} /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
