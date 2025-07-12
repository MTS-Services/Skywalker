// AccountButton.jsx
import { FaUser } from "react-icons/fa";

const AccountButton = ({ toggleSidebar }) => {
  return (
    <button
      className="text-primary-500 flex flex-1 flex-col items-center justify-center px-1 py-2 text-xs transition-colors hover:text-blue-500"
      onClick={toggleSidebar}
      aria-label="Open menu"
    >
      <FaUser className="text-primary-500 mx-auto mb-1 h-6 w-6" />
      <span>Menu</span>
    </button>
  );
};

export default AccountButton;
