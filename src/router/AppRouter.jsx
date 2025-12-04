import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import VendorDashboard from "../pages/VendorDashboard";
import Login from "../pages/Login";
import VendorRegister from "../pages/VendorRegister";
import CreateRFP from "../pages/CreateRFP";
import RfpList from "../pages/RfpList";
import VendorList from "../pages/VendorList";
import ProposalComparison from "../pages/ProposalComparison";
import useAuth, { useUserRole } from "../hooks/useAuth";

export default function AppRouter() {
  const isAuth = useAuth();
  const userRole = useUserRole();

  const getDashboardComponent = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "vendor":
        return <VendorDashboard />;
      case "buyer":
      default:
        return <Dashboard />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/vendor-register" element={<VendorRegister />} />
      {isAuth ? (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={getDashboardComponent()} />
          {userRole !== "vendor" && (
            <>
              <Route path="/rfp/create" element={<CreateRFP />} />
              <Route path="/rfps" element={<RfpList />} />
              <Route path="/vendors" element={<VendorList />} />
              <Route path="/compare/:id" element={<ProposalComparison />} />
            </>
          )}
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
