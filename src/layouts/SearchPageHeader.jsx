import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useContext, useEffect, useState } from "react";
import { FiAlignLeft, FiCreditCard, FiHome, FiInstagram, FiList, FiLogIn, FiLogOut, FiPlus, FiSettings, FiTrash, FiTwitter, FiUserPlus, FiX } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";

export default function SearchPageHeader() {
    const { isRTL, t, toggleLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleToggleLanguage = (lang) => {
        toggleLanguage(lang);
        console.log(lang);
        // Optionally close sidebar after language change, if desired
        // setSidebarOpen(false);
    };
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <nav
                className={`relative z-50 border-b border-primary-400 bg-white px-4 py-4 shadow-sm`}
                dir={isRTL ? "rtl" : "ltr"}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-start gap-5">
                    <div className="flex items-center ">
                        <button onClick={toggleSidebar} className="text-2xl">
                            <FiAlignLeft />
                        </button>

                        <NavLink to="/">
                            <img src="/logo.png" alt="Logo" className="w-20" />
                        </NavLink>
                    </div>
                </div>
            </nav>

            {/* Render SideBar always, but control its visibility with CSS classes */}
            <SideBar
                t={t}
                isRTL={isRTL}
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                handleToggleLanguage={handleToggleLanguage}
            />
        </>
    );
}

const SideBar = ({ t, isRTL, sidebarOpen, toggleSidebar, handleToggleLanguage }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/search');
    };

    const baseNavItems = [
        {
            label: "Home (Search)",
            icon: <FiHome />,
            to: "/",
        },
    ];
    const authNavItems = [
        {
            label: "Login",
            icon: <FiLogIn />,
            to: "/login",
        },
        {
            label: "Register",
            icon: <FiUserPlus />,
            to: "/register",
        }
    ]

    const protectedNavItems = [
        {
            label: "Logout",
            icon: <FiLogOut />,
        },
        {
            label: "My Ads",
            icon: <FiList />,
            to: "/my-ads",
        },
        {
            label: "My Archives",
            icon: <FiTrash />,
            to: "/my-archives",
        },
        {
            label: "Buy Credits",
            icon: <FiCreditCard />,
            to: "/buy-credits",
        },
    ]

    const endNavItems = [
        {
            label: "Agents",
            icon: <BsBuildings />,
            to: "/agents",
        }
    ];


    let navItems = [...baseNavItems];
    if (user) {
        navItems = [...navItems, ...protectedNavItems];
    } else {
        navItems = [...navItems, ...authNavItems];
    }
    navItems = [...navItems, ...endNavItems];


    const baseTransformClass = isRTL ? "translate-x-full" : "-translate-x-full";
    const activeTransformClass = "translate-x-0";
    return (
        <>
            {/* Overlay for background dimming */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ease-in-out"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div
                className={`fixed top-0 z-50 h-full transform transition-transform duration-300 ease-in-out w-64 bg-white shadow-lg
                ${sidebarOpen ? activeTransformClass : baseTransformClass}
                ${isRTL ? "right-0" : "left-0"}`}
                dir={isRTL ? "rtl" : "ltr"}
            >
                <div className="h-full bg-main text-lg">
                    <div className="border-b border-primary-400 py-4">
                        <div className="flex items-center justify-between">
                            <NavLink to="/">
                                <img src="/logo.png" alt="Logo" className="w-20" />
                            </NavLink>
                            <button
                                onClick={toggleSidebar}
                                className="flex items-center justify-center p-2 text-primary-900 bg-primary-50 rounded-full relative right-5"
                            >
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col pe-2 pt-2">
                        {navItems && navItems.map((item, index) => (
                            <div className="rounded-e-2xl active:bg-active" key={index}>
                                {item.to ? (
                                    <NavLink
                                        to={item.to} onClick={toggleSidebar}
                                        className="font-bold text-dark ps-6 w-full py-3 gap-3 flex items-center hover:text-primary-700"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </NavLink>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="font-bold text-dark ps-6 w-full py-3 gap-3 flex items-center hover:text-primary-700"
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="my-4 border-b"></div>
                    <NavLink to="/add-ad" className="cursor-pointer ps-6 w-full py-3 gap-3 flex items-center">
                        <FiPlus />
                        <span className="font-bold text-primary-900">Create Ad</span>
                    </NavLink>
                    <div className="absolute bottom-14 end-0 start-0 flex items-center justify-center gap-4">
                        <button onClick={handleToggleLanguage}
                            className="bg-primary-400 text-white rounded-lg p-0 h-10 w-10 flex items-center justify-center active:bg-primary-600 hover:bg-primary-600 transition-all ease-linear duration-300">
                            <span className={`text-xl ${isRTL ? "" : "bottom-1 relative"}`}>
                                {isRTL ? "En" : "ع"}
                            </span>
                        </button>
                        <a
                            target="_blank"
                            className="bg-primary-400 text-white rounded-lg p-0 h-10 w-10 flex items-center justify-center active:bg-primary-600 hover:bg-primary-600 transition-all ease-linear duration-300"
                            href="https://www.instagram.com/"
                            rel="noopener noreferrer"
                        >
                            <FiInstagram className="shrink-0 size-5 fill-none" />
                        </a>
                        <a
                            target="_blank"
                            className="bg-primary-400 text-white rounded-lg p-0 h-10 w-10 flex items-center justify-center active:bg-primary-600 hover:bg-primary-600 transition-all ease-linear duration-300"
                            href="https://x.com/"
                            rel="noopener noreferrer"
                        >
                            <FiTwitter className="shrink-0 size-5 fill-none" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};