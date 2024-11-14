import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmailProvider } from "./context/AuthContext";  // Corrected import path
import LandingPage from "./pages/LandingPage";
import CustomerHome from "./pages/CustomerHome";
import AgentHome from "./pages/AgentHome";
import AdminHome from "./pages/AdminDashboard";
import { IoMdLogIn } from "react-icons/io";
import Login from "./pages/Login";
import OTPPage from "./pages/OTPPage";
import AgentForm from "./pages/AgentForm";
import CustomerTable from "./components/CustomerTable";
import AgentTable from "./components/AgentTable";
import Admintable from "./components/Admintable";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <EmailProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/agent" element={<AgentHome />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/enter" element={<Login />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/agentform" element={<AgentForm />} />
          
          <Route path="/customertable" element={<CustomerTable />} />
          <Route path="/agenttable" element={<AgentTable />} />
          <Route path="/admintable" element={<Admintable />} />

        </Routes>
      </EmailProvider>
    </Router>
  );
}

export default App;
