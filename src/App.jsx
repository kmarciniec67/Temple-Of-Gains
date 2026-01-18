import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start_Page from "./pages/start_page";
import Login_Page from "./pages/login_page";
import Register_Page from "./pages/register_page";
import Dashboard from "./pages/dashboard/dashboard";

import Navbar from "./pages/dashboard/components/Navbar";
import Measurement from "./pages/dashboard/measurement";
import Plans from "./pages/dashboard/plans";
import Exercises from "./pages/dashboard/exercises";
import History from "./pages/dashboard/history";
import WorkoutDetails from "./pages/dashboard/WorkoutDetails";
import Settings from "./pages/dashboard/settings";
import Calculators from "./pages/dashboard/Calculators";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start_Page />} />
        <Route path="/login" element={<Login_Page />} />
        <Route path="/register" element={<Register_Page />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<div />} />
          <Route path="measurement" element={<Measurement />} />
          <Route path="plans" element={<Plans />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="history" element={<History />} />
          <Route path="history/:id" element={<WorkoutDetails />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
