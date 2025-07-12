// HomeButton.jsx

import { RiHome6Fill } from "react-icons/ri";

const HomeButton = ({ isActive, onClick }) => {
  return (
    <button
      className={`relative flex flex-1 flex-col items-center justify-center px-1 py-2 text-xs font-medium transition-colors duration-300 ${isActive ? "text--primary-500" : "text-gray-500"} ${isActive ? "" : "hover:text-blue-500"} border-0 focus:ring-0 focus:outline-none`}
      onClick={onClick}
    >
      {/* Active line (top) - narrower width */}
      {isActive && (
        <div
          className="absolute top-0 left-1/2 h-1 w-4/5 -translate-x-1/2 transform rounded-b-lg"
          style={{ backgroundColor: "#1EAEED" }}
        ></div>
      )}

      {/* Home icon */}
      <RiHome6Fill
        className={`mb-1 h-6 w-6 ${isActive ? "text-primary-500" : "text-primary-500"} transition-colors duration-300`}
      />

      {/* Home text */}
      <span className={isActive ? "text-primary-500" : "text-primary-500"}>
        Home
      </span>
    </button>
  );
};

export default HomeButton;
