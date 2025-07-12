// MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header"; // Header ইম্পোর্ট করুন
import ScrollToTop from "./components/ScrollToTop";
import SearchPageHeader from "./layouts/SearchPageHeader";
import { useEffect, useState } from "react";
import MobailFooter from "./layouts/MobailFooter";
import SideBar from "./layouts/SideBar";

function MainLayout() {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarOpen, setSidebarOpen] = useState(false); // <--- স্টেট এখানে নিয়ে আসা হয়েছে

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // সাইডবার টগল করার ফাংশন
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const isMobile = width <= 768; // মোবাইল ডিটেকশন (আপনার CSS এর উপর নির্ভর করে)

  return (
    <>
      <ScrollToTop />
      <header className="sticky top-0 left-0 z-30 w-full">
        {location.pathname === "/search" ? (
          <SearchPageHeader />
        ) : (
          // Header এ toggleSidebar এবং sidebarOpen প্রপস হিসেবে পাঠান
          <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
        {/* MobailFooter কে শর্তসাপেক্ষে রেন্ডার করুন */}
        {/* যখন সাইডবার খোলা থাকবে না (!sidebarOpen), এবং মোবাইল স্ক্রিন হবে, তখনই শুধু ফুটার দেখাবে */}
        {isMobile && !sidebarOpen && (
          <MobailFooter toggleSidebar={toggleSidebar} />
        )}
      </footer>

      {/* SideBar কে MainLayout এ রেন্ডার করুন, এবং স্টেট পাঠান */}
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default MainLayout;
