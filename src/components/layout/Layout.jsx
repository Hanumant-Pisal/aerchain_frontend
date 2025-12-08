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
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main content area with left margin for fixed sidebar */}
      <div className="md:ml-76 flex flex-col min-h-screen">
        {/* Navbar at top */}
        <Navbar />
        
        {/* Page content below navbar */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
      {/* Optional right sidebar */}
      {rightSidebar && <aside className="w-80 hidden lg:block fixed right-0 top-16">{rightSidebar}</aside>}
    </div>
  );
}
