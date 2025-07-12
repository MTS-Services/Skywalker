import React from "react";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // useNavigate import করুন

const ChatButton = ({ isActive, onClick, notificationCount = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    navigate("/chats");
  };

  return (
    <button
      className={`relative flex flex-1 flex-col items-center justify-center px-1 py-2 text-xs font-medium transition-colors duration-300 ${isActive ? "text-[#0A3459]" : "text-gray-500"} ${isActive ? "" : "hover:text-blue-500"} border-0 focus:ring-0 focus:outline-none`}
      onClick={handleClick}
    >
      {isActive && (
        <div
          className="absolute top-0 left-1/2 h-[3px] w-[60%] -translate-x-1/2 transform rounded-b-lg"
          style={{ backgroundColor: "#1EAEED" }}
        ></div>
      )}

      <BsChatLeftDotsFill
        className={`mb-1 h-5 w-5 ${isActive ? "text-primary-500" : "text-primary-500"} transition-colors duration-300`}
      />

      {notificationCount > 0 && (
        <span className="absolute top-0 right-2 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {notificationCount}
        </span>
      )}

      <span className={isActive ? "text-primary-500" : "text-gray-500"}>
        Chat
      </span>
    </button>
  );
};

export default ChatButton;
