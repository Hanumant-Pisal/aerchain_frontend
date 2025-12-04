import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

/**
 * Layout comp wraps pages with Navbar + Sidebar + main container
 * Accepts children and optional rightSidebar
 */
export default function Layout({ children, rightSidebar = null }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
        {rightSidebar && <aside className="w-80 hidden lg:block">{rightSidebar}</aside>}
      </div>
    </div>
  );
}
