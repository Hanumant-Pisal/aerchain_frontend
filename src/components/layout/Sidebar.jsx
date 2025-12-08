import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavItem = ({ to, children, icon }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
        active 
          ? "bg-white text-purple-600 shadow-lg transform scale-[1.02]" 
          : "text-white hover:bg-white hover:bg-opacity-20 hover:text-purple-600"
      }`}
    >
      <div className={`w-5 h-5 flex items-center justify-center transition-colors duration-200 ${
        active ? 'text-purple-600' : 'text-white group-hover:text-purple-200'
      }`}>
        {icon}
      </div>
      <span className="font-medium">{children}</span>
      {active && (
        <div className="absolute right-2 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
      )}
    </Link>
  );
};

export default function Sidebar({ className = "" }) {
  const auth = useSelector((s) => s.auth);

  const getSidebarItems = () => {
    if (!auth?.user) {
      return (
        <>
          <NavItem to="/login" icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          }>
            Login
          </NavItem>
          <NavItem to="/vendor-register" icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          }>
            Register as Vendor
          </NavItem>
        </>
      );
    }

    const { role } = auth.user;

    switch (role) {
      case "vendor":
        return (
          <>
            <NavItem to="/dashboard" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }>
              Dashboard
            </NavItem>
            <NavItem to="/rfps" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }>
              Received RFPs
            </NavItem>
            <NavItem to="/proposals" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }>
              My Proposals
            </NavItem>
            
          </>
        );
      case "admin":
        return (
          <>
            <NavItem to="/dashboard" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }>
              Admin Dashboard
            </NavItem>
            <NavItem to="/vendors" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }>
              Vendors
            </NavItem>
            <NavItem to="/buyers" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }>
              Buyers
            </NavItem>
           
          </>
        );
      case "buyer":
      default:
        return (
          <>
            <NavItem to="/dashboard" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }>
              Dashboard
            </NavItem>
            <NavItem to="/rfps" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }>
              My RFPs
            </NavItem>
            <NavItem to="/rfp/send" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            }>
              Send RFP
            </NavItem>
            <NavItem to="/proposals" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }>
              Proposals
            </NavItem>
            <NavItem to="/vendors" icon={
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }>
              Vendors
            </NavItem>
           
          </>
        );
    }
  };

  const getSidebarTitle = () => {
    if (!auth?.user) return "Navigation";
    
    const titles = {
      admin: "Admin Panel",
      vendor: "Vendor Portal", 
      buyer: "Buyer Portal"
    };
    
    return titles[auth.user.role] || "Navigation";
  };

  return (
    <aside className={`w-76 h-screen fixed left-0 top-0 hidden md:block bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 border-r border-purple-400 ${className}`}>
      <div className="h-full flex flex-col">
        
       
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center space-x-3">
           
            <span className="text-xl font-bold text-white">
              Ai Power RFP System
            </span>
          </Link>
        </div>

       
        <div className="flex-1 p-6 overflow-y-auto">
          <nav className="space-y-6">
            {getSidebarItems()}
          </nav>
        </div>

        
      </div>
    </aside>
  );
}
