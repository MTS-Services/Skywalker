// MobailFooter.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// SideBar কে আর এখানে ইম্পোর্ট করার দরকার নেই
// import SideBar from "./SideBar";

import HomeButton from "../components/footerComponent/HomeButton";
import CommercialButton from "../components/footerComponent/CommercialButton";
import PostAdButton from "../components/footerComponent/PostAdButton";
import ChatButton from "../components/footerComponent/ChatButton";
import AccountButton from "../components/footerComponent/AccountButton";

const MobailFooter = ({ toggleSidebar }) => {
  // toggleSidebar প্রপস হিসেবে গ্রহণ করবে
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  // sidebarOpen স্টেটটি আর এখানে থাকবে না

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("home");
    } else if (location.pathname.startsWith("/commercial")) {
      setActiveTab("commercial");
    } else if (location.pathname.startsWith("/post-ad")) {
      setActiveTab("post-ad");
    } else if (location.pathname.startsWith("/chat")) {
      setActiveTab("chat");
    }
  }, [location.pathname]);

  const handleButtonClick = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
  };

  return (
    // MobailFooter এর মূল div টি এখন সরাসরি রেন্ডার হবে, শর্ত MainLayout এ থাকবে
    <div className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-gray-300 bg-white py-2 lg:hidden">
      <AccountButton toggleSidebar={toggleSidebar} />

      <CommercialButton
        isActive={activeTab === ""}
        onClick={() => handleButtonClick("", "/")}
      />
      <PostAdButton
        isActive={activeTab === "ad-upload"}
        onClick={() => handleButtonClick("ad-upload", "/ad-upload")}
      />
      <ChatButton
        isActive={activeTab === "chat"}
        onClick={() => handleButtonClick("chat", "/chat")}
      />
      <HomeButton
        isActive={activeTab === "home"}
        onClick={() => handleButtonClick("home", "/")}
      />
    </div>
  );
};

export default MobailFooter;
