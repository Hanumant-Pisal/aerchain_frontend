import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavItem = ({ to, children }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-sm leading-6 ${
        active ? "bg-slate-100 text-slate-900 font-medium" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Sidebar({ className = "" }) {
  const auth = useSelector((s) => s.auth);

  const getSidebarItems = () => {
    if (!auth?.user) {
      return (
        <>
          <NavItem to="/login">Login</NavItem>
          <NavItem to="/vendor-register">Register as Vendor</NavItem>
        </>
      );
    }

    const { role } = auth.user;

    switch (role) {
      case "vendor":
        return (
          <>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/rfps">Received RFPs</NavItem>
            <NavItem to="/proposals">My Proposals</NavItem>
            <NavItem to="/profile">Company Profile</NavItem>
          </>
        );
      case "admin":
        return (
          <>
            <NavItem to="/dashboard">Admin Dashboard</NavItem>
            <NavItem to="/rfp/create">Create RFP</NavItem>
            <NavItem to="/rfp/send">Send RFP</NavItem>
            <NavItem to="/rfps">All RFPs</NavItem>
            <NavItem to="/vendors">Vendors</NavItem>
            <NavItem to="/users">Users</NavItem>
            <NavItem to="/settings">System Settings</NavItem>
          </>
        );
      case "buyer":
      default:
        return (
          <>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/rfp/create">Create RFP</NavItem>
            <NavItem to="/rfp/send">Send RFP</NavItem>
            <NavItem to="/rfps">My RFPs</NavItem>
            <NavItem to="/vendors">Vendors</NavItem>
            <NavItem to="/compare">Compare Proposals</NavItem>
          </>
        );
    }
  };

  const getSidebarTitle = () => {
    if (!auth?.user) return "Navigation";
    
    const titles = {
      admin: "Admin Navigation",
      vendor: "Vendor Navigation", 
      buyer: "Buyer Navigation"
    };
    
    return titles[auth.user.role] || "Navigation";
  };

  return (
    <aside className={`w-64 hidden md:block border-r bg-white ${className}`}>
      <div className="p-4">
        <div className="mb-6 text-xs text-slate-500 uppercase">{getSidebarTitle()}</div>
        <nav className="space-y-1">
          {getSidebarItems()}
        </nav>
      </div>
    </aside>
  );
}
