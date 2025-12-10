import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";


export default function Layout({ children, rightSidebar = null }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="md:ml-76 flex flex-col min-h-screen">
       
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
       
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
   
      {rightSidebar && <aside className="w-80 hidden lg:block fixed right-0 top-16">{rightSidebar}</aside>}
    </div>
  );
}
