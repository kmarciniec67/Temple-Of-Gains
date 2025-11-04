import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Start_Page from './pages/start_page';
import Login_Page from './pages/login_page';
import Register_Page from './pages/register_page';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/start_page" element={<Start_Page />} />
        <Route path="/login" element={<Login_Page />} />
        <Route path="/register" element={<Register_Page />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
