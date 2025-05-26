import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import JobBoard from './pages/JobBoard';
import Alumni from './pages/Alumni';
import Home from './pages/home/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        {/* Routes protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobBoard"
          element={
            <ProtectedRoute>
              <JobBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <ProtectedRoute>
              <Alumni />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
