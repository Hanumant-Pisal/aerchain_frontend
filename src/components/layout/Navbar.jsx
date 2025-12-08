import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { rfpApi } from "../../features/rfps/rfpApi";
import { vendorApi } from "../../features/vendors/vendorApi";
import { proposalApi } from "../../features/proposals/proposalApi";
import { authApi } from "../../features/auth/authApi";

export default function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    
    dispatch(rfpApi.util.resetApiState());
    dispatch(vendorApi.util.resetApiState());
    dispatch(proposalApi.util.resetApiState());
    dispatch(authApi.util.resetApiState());
    
    
    dispatch(logout());
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const getNavigationLinks = () => {
    if (!auth?.user) return null;
    return null; 
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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            {getNavigationLinks()}
          </div>

          <div className="flex items-center space-x-4">
            {auth?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {auth.user.name?.charAt(0)?.toUpperCase() || auth.user.email?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {auth.user.name || auth.user.email}
                    </p>
                    
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

               
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                     {auth.user.email}
                      <div className="flex items-center mt-1 mt-2">
                        {getRoleBadge()}
                      </div>
                    </div>
                    <div className="py-1">
                     
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
