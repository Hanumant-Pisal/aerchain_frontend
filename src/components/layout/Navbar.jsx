import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRefresh = () => {
    navigate(location.pathname);
  };

  const getNavigationLinks = () => {
    if (!auth?.user) return null;

    const { role } = auth.user;
    
    switch (role) {
      case "vendor":
        return (
          <>
            <Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link to="/profile" className="text-sm text-slate-600 hover:text-slate-900">
              Profile
            </Link>
          </>
        );
      case "admin":
        return (
          <>
            <Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link to="/rfp/create" className="text-sm text-slate-600 hover:text-slate-900">
              Create RFP
            </Link>
            <Link to="/vendors" className="text-sm text-slate-600 hover:text-slate-900">
              Vendors
            </Link>
            <Link to="/users" className="text-sm text-slate-600 hover:text-slate-900">
              Users
            </Link>
          </>
        );
      case "buyer":
      default:
        return (
          <>
            <Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
              Dashboard
            </Link>
            <Link to="/rfp/create" className="text-sm text-slate-600 hover:text-slate-900">
              Create RFP
            </Link>
            <Link to="/vendors" className="text-sm text-slate-600 hover:text-slate-900">
              Vendors
            </Link>
          </>
        );
    }
  };

  const getRoleBadge = () => {
    if (!auth?.user?.role) return null;
    
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      buyer: "bg-blue-100 text-blue-800", 
      vendor: "bg-green-100 text-green-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[auth.user.role]}`}>
        {auth.user.role.toUpperCase()}
      </span>
    );
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-xl font-semibold text-slate-800">
              AI RFP
            </Link>
            {getNavigationLinks()}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="px-3 py-1 rounded bg-gray-600 text-white text-sm hover:bg-gray-700"
              aria-label="Refresh"
            >
              Refresh
            </button>
            {auth?.user ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-700">Hi, {auth.user.name || auth.user.email}</span>
                  {getRoleBadge()}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
