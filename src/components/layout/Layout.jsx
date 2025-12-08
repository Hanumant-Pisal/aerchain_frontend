import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


export default function Layout({ children, rightSidebar = null }) {
  return (
    <div className="min-h-screen bg-gray-50">
    
      <Sidebar />
      
     
      <div className="md:ml-76 flex flex-col min-h-screen">
       
        <Navbar />
        
       
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
   
      {rightSidebar && <aside className="w-80 hidden lg:block fixed right-0 top-16">{rightSidebar}</aside>}
    </div>
  );
}
