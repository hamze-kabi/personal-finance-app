"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main content */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          ${isMobile ? "pb-20" : "pb-0"}
        `}
      >
        <div className="p-4 lg:p-8">{children}</div>
      </main>

      {/* Bottom Navigation (mobile only) */}
      {isMobile && <BottomNav />}

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
