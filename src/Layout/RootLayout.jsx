import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navber";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 relative">
      
      {/* Background Layer: Linear Gradient & Mesh Effect */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Light Mode: Soft Blueish Gradient | Dark Mode: Deep Slate/Black Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-base-100 via-base-200 to-base-100 dark:from-[#050b18] dark:via-[#0a0f1d] dark:to-[#020617]"></div>
        
        {/* Professional Mesh Glow (ডার্ক মোডে এটি ব্যাকগ্রাউন্ডকে প্রিমিয়াম লুক দিবে) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Navbar Section */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-200px)]">
          {/* Page Transition Wrapper (Optional Animation) */}
          <div className="animate-in fade-in duration-700">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        toastClassName="rounded-2xl shadow-xl font-medium"
      />
    </div>
  );
};

export default RootLayout;