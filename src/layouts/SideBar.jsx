// SideBar.jsx
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useContext, useMemo, useCallback } from "react";
import {
  FiCreditCard,
  FiHome,
  FiInstagram,
  FiList,
  FiLogIn,
  FiLogOut,
  FiSettings,
  FiTrash,
  FiTwitter,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";

const SideBar = ({ sidebarOpen, toggleSidebar }) => {
  const { isRTL, t, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
    toggleSidebar();
  }, [logout, toggleSidebar]);

  const navItems = useMemo(() => {
    const base = [{ label: t.header.home, icon: <FiHome />, to: "/" }];
    const auth = [
      { label: t.header.login, icon: <FiLogIn />, to: "/login" },
      { label: t.header.register, icon: <FiUserPlus />, to: "/register" },
    ];
    const protectedItems = [
      { label: t.header.myAds, icon: <FiList />, to: "/my-ads" },
      { label: t.header.myArchives, icon: <FiTrash />, to: "/my-archives" },
      { label: t.header.buyCredit, icon: <FiCreditCard />, to: "/buy-credits" },
      { label: t.header.logout, icon: <FiLogOut />, action: handleLogout },
    ];
    const end = [
      { label: t.header.agents, icon: <BsBuildings />, to: "/agents" },
    ];
    return [...base, ...(isAuthenticated ? protectedItems : auth), ...end];
  }, [isAuthenticated, t, handleLogout]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 z-50 h-full min-w-[280px] bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isRTL ? "right-0" : "left-0"
        } ${
          sidebarOpen
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full"
              : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-gray-200 px-4 py-4">
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="flex items-center gap-2"
                onClick={toggleSidebar}
              >
                <img src="/logo.png" alt="Logo" className="w-14" />
                <div>
                  <p className="text-lg font-bold capitalize">{t.site.name}</p>
                  <p className="bg-primary-300 mx-auto w-fit rounded-md px-2 py-1 text-[8px] leading-normal text-white">
                    {t.site.tagline}
                  </p>
                </div>
              </NavLink>
              <button onClick={toggleSidebar} className="text-gray-500">
                <FiX className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <div key={index} className="active:bg-active rounded-e-2xl">
                {item.to ? (
                  <NavLink
                    to={item.to}
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-dark hover:bg-primary-300/20 hover:text-primary-900 my-0.5 flex w-full items-center gap-3 py-3 ps-6 font-semibold ${
                        isActive ? "bg-primary-300/20 text-primary-900" : ""
                      }`
                    }
                  >
                    <span className="text-primary-900">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ) : (
                  <button
                    onClick={item.action}
                    className="text-dark hover:bg-primary-300/20 hover:text-primary-700 flex w-full items-center gap-3 py-3 ps-6 font-semibold"
                  >
                    <span className="text-primary-900">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4">
            <Link
              to="/buy-credits"
              onClick={toggleSidebar}
              className="hover:bg-primary-300/20 flex items-center gap-2 rounded-lg px-2 py-3"
            >
              <img src="/fab.png" alt="Post Ad" className="h-10 w-10" />
              <h1 className="text-primary-600 text-lg">{t.header.post}</h1>
            </Link>

            <div className="mt-4 flex items-center justify-center gap-4">
              {isAuthenticated && (
                <Link
                  to="/settings"
                  className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
                  onClick={toggleSidebar}
                >
                  <FiSettings className="h-5 w-5 shrink-0" />
                </Link>
              )}
              <button
                onClick={() => toggleLanguage(isRTL ? "en" : "ar")}
                className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
              >
                <span className={`text-xl ${isRTL ? "" : "relative bottom-1"}`}>
                  {isRTL ? "En" : "ع"}
                </span>
              </button>
              <a
                target="_blank"
                href="https://www.instagram.com/mraqar"
                rel="noopener noreferrer"
                className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
              >
                <FiInstagram className="h-5 w-5 shrink-0" />
              </a>
              <a
                target="_blank"
                href="https://x.com/mr_aqar_"
                rel="noopener noreferrer"
                className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
              >
                <FiTwitter className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
