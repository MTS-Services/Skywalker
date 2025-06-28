import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp, FiMenu, FiX, FiSettings } from "react-icons/fi";
import { FaBars, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";
import { SideBar } from "./Sidebar";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-[#26b1e6] border-b-2 border-[#26b1e6] pb-1"
    : "hover:text-[#26b1e6] transition-colors";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { isRTL, t, toggleLanguage, language } = useLanguage();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const langDropdownRef = useRef(null);


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleLangDropdown = () => setLangOpen((prev) => !prev);

  const handleLanguageChange = (lang) => {
    toggleLanguage(lang);
    setLangOpen(false);
  };

  const handleLogout = () => logout();

  const navItems = useMemo(() => {
    const base = [{ label: t.header.home, to: "/" }];
    const auth = [
      { label: t.header.login, to: "/login" },
      { label: t.header.register, to: "/register" },
    ];
    const protectedItems = [
      { label: t.header.myAds, to: "/my-ads" },
      { label: t.header.myArchives, to: "/my-archives" },
      { label: t.header.buyCredit, to: "/buy-credits" },
      { label: t.header.logout, action: handleLogout },
    ];
    const end = [{ label: t.header.agents, to: "/agents" }];
    return [...base, ...(isAuthenticated ? protectedItems : auth), ...end];
  }, [isAuthenticated, t]);

  return (
    <nav className={`relative z-50 border-b border-gray-200 bg-white px-4 py-4 shadow-sm ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <NavLink to="/" className={`flex items-center gap-2 justify-start`}>
          <img src="/logo.png" alt="Logo" className="w-14" />
          <div>
            <p className="font-bold text-lg capitalize">{t.site.name}</p>
            <p className="text-[8px] w-fit mx-auto bg-primary-300 px-2 py-1 rounded-md text-white leading-normal">{t.site.tagline}</p>
          </div>
        </NavLink>

        <button onClick={toggleSidebar} className="lg:hidden text-2xl text-[#556885]"><FaBars /></button>

        <div className={`hidden items-center gap-6 font-medium text-black lg:flex ${isRTL ? "space-x-reverse" : ""}`}>
          <Navigation
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            toggleLangDropdown={toggleLangDropdown}
            langOpen={langOpen}
            handleLanguageChange={handleLanguageChange}
            isRTL={isRTL}
            t={t}
            language={language}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            navItems={navItems}
          />

          {isAuthenticated && <Link to="/settings"><FiSettings /></Link>}
        </div>

        <NavLink to={isAuthenticated ? "/ad-upload" : "/login"} className="hidden lg:flex items-center gap-2 bg-primary-300/10 px-5 py-2 rounded-md border border-primary-300/40">
          <FaPlusCircle className="text-primary-600 text-lg" />
          {t.header.addFreeAd}
        </NavLink>
      </div>

      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

    </nav>
  );
}

const Navigation = ({
  toggleDropdown,
  isDropdownOpen,
  toggleLangDropdown,
  langOpen,
  handleLanguageChange,
  isRTL,
  t,
  language,
  isMobile = false,
  isAuthenticated,
  handleLogout,
  navItems
}) => {
  const [propertyTypes, setPropertyTypes] = useState([]);

  const fetchPropertyType = async () => {
    try {
      const response = await axios.get('/data/propertyTypes.json');
      setPropertyTypes(response.data);
    } catch (error) {
      console.error('Error fetching property types:', error);
    }
  };

  useEffect(() => {
    fetchPropertyType();
  }, []);

  return (
    <div className={`flex ${isMobile ? "flex-col gap-4" : "items-center gap-6"} ${isRTL && !isMobile ? "space-x-reverse" : ""}`}>
      {navItems.map((item, index) => (
        <div className="rounded-e-2xl active:bg-active" key={index}>
          {item.to ? (
            <NavLink to={item.to} className={navLinkClass}>
              <span className={isRTL ? "text-right" : "text-left"}>{item.label}</span>
            </NavLink>
          ) : (
            <button onClick={handleLogout}>
              <span>{item.label}</span>
            </button>
          )}
        </div>
      ))}

      {!isAuthenticated && (
        <div className="relative">
          <button onClick={toggleDropdown} className={`flex cursor-pointer items-center transition-colors hover:text-primary-400 ${isDropdownOpen ? "text-primary-400" : ""} ${isRTL ? "flex-row-reverse" : ""}`}>
            {t.header.kuwaitRealEstate}
            {isDropdownOpen ? <FiChevronUp className={`${isRTL ? "mr-1" : "ml-1"}`} /> : <FiChevronDown className={`${isRTL ? "mr-1" : "ml-1"}`} />}
          </button>
          {isDropdownOpen && propertyTypes.length > 0 && (
            <div className={`absolute z-10 mt-2 max-h-[40vh] w-[220px] overflow-y-auto rounded-md border border-gray-300 bg-white p-2 shadow-lg sm:left-0 sm:mt-2 sm:max-h-none sm:w-54 sm:overflow-visible ${isRTL ? "right-0 text-right" : "left-0 text-left"}`}>
              {propertyTypes.map((item, index) => (
                <DropdownItem key={index} to={`/search?propertyType=${item.id}`} text={item.name} isRTL={isRTL} />
              ))}
            </div>
          )}
        </div>
      )}

      <button onClick={() => handleLanguageChange(isRTL ? 'en' : 'ar')}>
        <span className={`text-xl ${isRTL ? "" : "relative bottom-1"}`}>{isRTL ? "En" : "ع"}</span>
      </button>
    </div>
  );
};

const DropdownItem = ({ to, text, isRTL }) => (
  <NavLink to={to} className={`block rounded px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-600 ${isRTL ? "text-right" : "text-left"}`}>
    {text}
  </NavLink>
);

export default Header;
