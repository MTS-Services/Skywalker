import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useContext, useMemo } from "react";
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
import { FaPlusCircle } from "react-icons/fa";

const SideBar = ({ sidebarOpen, toggleSidebar }) => {
  const { isRTL, t, toggleLanguage } = useLanguage();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
  }, [isAuthenticated, t]);

  const baseTransformClass = isRTL ? "translate-x-full" : "-translate-x-full";
  const activeTransformClass = "translate-x-0 visible";

  return (
    <section>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`invisible fixed top-0 z-50 h-full min-w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${sidebarOpen ? activeTransformClass : baseTransformClass} ${isRTL ? "right-0" : "left-0"}`}
      >
        <div className="bg-main h-full text-lg">
          <div className="border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className={`flex items-center justify-start gap-2`}
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
          <div className="flex flex-col pt-2">
            {navItems.map((item, index) => (
              <div className="active:bg-active rounded-e-2xl" key={index}>
                {item.to ? (
                  <NavLink
                    to={item.to}
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-dark hover:bg-primary-300/20 hover:text-primary-900 my-0.5 flex w-full items-center gap-3 py-3 ps-6 font-semibold ${isActive ? "bg-primary-300/20 text-primary-900" : ""}`
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
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="my-4 border-b border-gray-200"></div>
          <NavLink
            to="/ad-upload"
            onClick={toggleSidebar}
            className="text-primary-700 flex w-full cursor-pointer items-center gap-3 py-3 ps-6"
          >
            <FaPlusCircle />
            <span className="font-bold">{t.header.addFreeAd}</span>
          </NavLink>
          <div className="absolute start-0 end-0 bottom-4 flex items-center justify-center gap-4">
            {isAuthenticated && (
              <Link
                to="/settings"
                className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
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
              href="https://www.instagram.com/"
              rel="noopener noreferrer"
              className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
            >
              <FiInstagram className="h-5 w-5 shrink-0" />
            </a>
            <a
              target="_blank"
              href="https://x.com/"
              rel="noopener noreferrer"
              className="bg-primary-300/20 text-primary-900 flex h-10 w-10 items-center justify-center rounded-md p-0"
            >
              <FiTwitter className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
