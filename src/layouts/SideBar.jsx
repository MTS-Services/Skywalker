import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useContext, useMemo } from "react";
import { FiCreditCard, FiHome, FiInstagram, FiList, FiLogIn, FiLogOut, FiSettings, FiTrash, FiTwitter, FiUserPlus, FiX } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";

export const SideBar = ({ sidebarOpen, toggleSidebar }) => {
    const { isRTL, t, toggleLanguage } = useLanguage();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    const navItems = useMemo(() => {
        const base = [{ label: (t.header.home), icon: <FiHome />, to: "/" }];
        const auth = [
            { label: (t.header.login), icon: <FiLogIn />, to: "/login" },
            { label: (t.header.register), icon: <FiUserPlus />, to: "/register" }
        ];
        const protectedItems = [
            { label: (t.header.myAds), icon: <FiList />, to: "/my-ads" },
            { label: (t.header.myArchives), icon: <FiTrash />, to: "/my-archives" },
            { label: (t.header.buyCredit), icon: <FiCreditCard />, to: "/buy-credits" },
            { label: (t.header.logout), icon: <FiLogOut />, action: handleLogout },
        ];
        const end = [{ label: (t.header.agents), icon: <BsBuildings />, to: "/agents" }];
        return [...base, ...(isAuthenticated ? protectedItems : auth), ...end];
    }, [isAuthenticated, t]);

    const baseTransformClass = isRTL ? "translate-x-full" : "-translate-x-full";
    const activeTransformClass = "translate-x-0 visible";

    return (
        <>
            {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ease-in-out" onClick={toggleSidebar}></div>}
            <div className={`fixed top-0 z-50 h-full min-w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out invisible ${sidebarOpen ? activeTransformClass : baseTransformClass} ${isRTL ? "right-0" : "left-0"}`}>
                <div className="h-full bg-main text-lg">
                    <div className="border-b border-gray-200 px-4 py-2">
                        <div className="flex items-center justify-between">
                            <NavLink to="/" className={`flex items-center gap-2 justify-start`}>
                                <img src="/logo.png" alt="Logo" className="w-14" />
                                <div>
                                    <p className="font-bold text-lg capitalize">{t.site.name}</p>
                                    <p className="text-[8px] w-fit mx-auto bg-primary-300 px-2 py-1 rounded-md text-white leading-normal">{t.site.tagline}</p>
                                </div>
                            </NavLink>
                            <button onClick={toggleSidebar} className="text-gray-500"><FiX className="text-2xl" /></button>
                        </div>
                    </div>
                    <div className="flex flex-col pt-2">
                        {navItems.map((item, index) => (
                            <div className="rounded-e-2xl active:bg-active" key={index}>
                                {item.to ? (
                                    <NavLink to={item.to} onClick={toggleSidebar} className={({ isActive }) =>
                                        `flex w-full items-center gap-3 py-3 ps-6 my-0.5 font-semibold text-dark hover:bg-primary-300/20 hover:text-primary-900 ${isActive ? "bg-primary-300/20 text-primary-900" : ""}`}>
                                            
                                        <span className="text-primary-900">{item.icon}</span><span>{item.label}</span>
                                    </NavLink>
                                ) : (
                                    <button onClick={item.action} className="flex w-full items-center gap-3 py-3 ps-6 font-semibold text-dark hover:bg-primary-300/20 hover:text-primary-700">
                                        {item.icon}<span>{item.label}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="my-4 border-b border-gray-200"></div>
                    <NavLink to="/ad-upload" onClick={toggleSidebar} className="flex w-full cursor-pointer items-center gap-3 py-3 ps-6 text-primary-700">
                        <FaPlusCircle /><span className="font-bold">{t.header.addFreeAd}</span>
                    </NavLink>
                    <div className="absolute bottom-4 end-0 start-0 flex items-center justify-center gap-4">
                        {isAuthenticated && (
                            <Link to="/settings" className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-300/20 p-0 text-primary-900">
                                <FiSettings className="h-5 w-5 shrink-0" />
                            </Link>
                        )}
                        <button onClick={() => toggleLanguage(isRTL ? "en" : "ar")} className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-300/20 p-0 text-primary-900">
                            <span className={`text-xl ${isRTL ? "" : "relative bottom-1"}`}>{isRTL ? "En" : "ع"}</span>
                        </button>
                        <a target="_blank" href="https://www.instagram.com/" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-300/20 p-0 text-primary-900">
                            <FiInstagram className="h-5 w-5 shrink-0" />
                        </a>
                        <a target="_blank" href="https://x.com/" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-300/20 p-0 text-primary-900">
                            <FiTwitter className="h-5 w-5 shrink-0" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
