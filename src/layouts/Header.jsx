import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMenu,
  FiX,
  FiGlobe,
} from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { IoMdCheckmark } from "react-icons/io";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-[#32E0BB] border-b-2 border-[#32E0BB] pb-1"
    : "hover:text-[#32E0BB] transition-colors";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isRTL, toggleLanguage, t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
    setLangOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleLangDropdown = () => setLangOpen((prev) => !prev);

  const handleLanguageChange = () => {
    toggleLanguage();
    setLangOpen(false);
  };

  return (
    <nav
      className={`relative z-50 border-b border-[#32E0BB] bg-white px-4 py-4 shadow-sm ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-auto w-36 sm:w-48" />
        </Link>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-2xl text-[#32E0BB] sm:hidden"
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div
          className={`text-md hidden items-center gap-6 font-medium text-black sm:flex ${
            isRTL ? "space-x-reverse" : ""
          }`}
        >
          <Navigation
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            toggleLangDropdown={toggleLangDropdown}
            langOpen={langOpen}
            handleLanguageChange={handleLanguageChange}
            isRTL={isRTL}
            t={t}
            language={language}
          />
        </div>

        <NavLink
          to="/add-ad"
          className={`hidden items-center rounded bg-blue-100 px-4 py-2 font-medium text-black transition-colors hover:bg-[#32E0BB] hover:text-white sm:flex ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <FiPlus className={`text-lg ${isRTL ? "ml-1" : "mr-1"}`} />
          {t.header.addFreeAd}
        </NavLink>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 z-44 mt-0.5 w-full bg-gray-50 shadow-md sm:hidden">
          <div
            className={`flex flex-col items-start gap-4 px-4 py-4 ${isRTL ? "items-end" : "items-start"}`}
          >
            <Navigation
              toggleDropdown={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              toggleLangDropdown={toggleLangDropdown}
              langOpen={langOpen}
              handleLanguageChange={handleLanguageChange}
              isRTL={isRTL}
              t={t}
              language={language}
              isMobile={true}
            />
            <NavLink
              to="/add-ad"
              className={`flex items-center rounded bg-blue-100 px-4 py-2 font-medium text-black transition-colors hover:bg-[#32E0BB] hover:text-white ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <FiPlus className={`text-lg ${isRTL ? "ml-1" : "mr-1"}`} />
              {t.header.addFreeAd}
            </NavLink>
          </div>
        </div>
      )}
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
}) => (
  <div
    className={`flex ${isMobile ? "flex-col gap-4" : "items-center gap-6"} ${
      isRTL && !isMobile ? "space-x-reverse" : ""
    }`}
  >
    <NavItem to="/" label={t.header.home} isRTL={isRTL} />
    <NavItem to="/login" label={t.header.login} isRTL={isRTL} />
    <NavItem to="/register" label={t.header.register} isRTL={isRTL} />
    <NavItem to="/agents" label={t.header.agents} isRTL={isRTL} />

    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center transition-colors hover:text-[#32E0BB] ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {t.header.kuwaitRealEstate}
        {isDropdownOpen ? (
          <FiChevronUp className={`${isRTL ? "mr-1" : "ml-1"}`} />
        ) : (
          <FiChevronDown className={`${isRTL ? "mr-1" : "ml-1"}`} />
        )}
      </button>
      {isDropdownOpen && (
        <div
          className={`absolute z-10 mt-2 max-h-[40vh] w-[220px] overflow-y-auto rounded-md border border-[#32E0BB] bg-white p-4 shadow-lg sm:top-full sm:left-0 sm:mt-2 sm:max-h-none sm:w-54 sm:overflow-visible ${
            isRTL ? "right-0 text-right" : "left-0 text-left"
          }`}
        >
          <DropdownSection
            title={isRTL ? "عقارات للايجار" : "Properties for rent"}
            isRTL={isRTL}
          >
            <DropdownItem
              to="/rent/apartments"
              text={isRTL ? "شقق للايجار" : "Apartments for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/houses"
              text={isRTL ? "بيوت للايجار" : "Houses for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/commercials"
              text={isRTL ? "تجاري للايجار" : "Commercials for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/buildings"
              text={isRTL ? "عمارات للايجار" : "Buildings for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/chalets"
              text={isRTL ? "شاليهات للايجار" : "Chalets for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/farms"
              text={isRTL ? "مزارع للايجار" : "Farms for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/lands"
              text={isRTL ? "اراضي للايجار" : "Lands for rent"}
              isRTL={isRTL}
            />
          </DropdownSection>
          <DropdownSection
            title={isRTL ? "عقارات للبيع" : "Properties for sale"}
            isRTL={isRTL}
          >
            <DropdownItem
              to="/sale/houses"
              text={isRTL ? "بيوت للبيع" : "Houses for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/lands"
              text={isRTL ? "اراضي للبيع" : "Lands for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/buildings"
              text={isRTL ? "عمارات للبيع" : "Buildings for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/apartments"
              text={isRTL ? "شقق للبيع" : "Apartments for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/chalets"
              text={isRTL ? "شاليهات للبيع" : "Chalets for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/commercials"
              text={isRTL ? " تجاري للبيع" : "Commercials for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/farms"
              text={isRTL ? "مزارع للبيع" : "Farms for sale"}
              isRTL={isRTL}
            />
          </DropdownSection>
          <DropdownSection
            title={isRTL ? "عقارات للبدل" : "Properties for exchange"}
            isRTL={isRTL}
          >
            <DropdownItem
              to="/exchange/lands"
              text={isRTL ? "اراضي للبدل" : "Lands for exchange"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/exchange/houses"
              text={isRTL ? "بيوت للبدل" : "Houses for exchange"}
              isRTL={isRTL}
            />
          </DropdownSection>
        </div>
      )}
    </div>

    <div className="relative">
      <button
        onClick={toggleLangDropdown}
        className={`flex items-center space-x-1 text-sm font-semibold transition-colors hover:text-[#32E0BB] ${isRTL ? "space-x-reverse" : ""}`}
      >
        <FiGlobe className="text-lg" />
        <span className="text-lg font-medium">
          {language === "en" ? "ع" : "EN"}
        </span>
        {langOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {langOpen && (
        <div
          className={`absolute z-50 mt-2 w-36 rounded-md border border-[#32E0BB] bg-white py-1 text-sm shadow-md ${
            isRTL ? "right-0" : "left-0"
          }`}
        >
          <LanguageItem
            label="English"
            isActive={language === "en"}
            onClick={handleLanguageChange}
            isRTL={isRTL}
          />
          <LanguageItem
            label="العربية"
            isActive={language === "ar"}
            onClick={handleLanguageChange}
            isRTL={isRTL}
          />
        </div>
      )}
    </div>
  </div>
);

const NavItem = ({ to, label, isRTL }) => (
  <NavLink to={to} className={navLinkClass}>
    <span className={isRTL ? "text-right" : "text-left"}>{label}</span>
  </NavLink>
);

const DropdownItem = ({ to, text, isRTL }) => (
  <NavLink
    to={to}
    className={`block rounded px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#32E0BB] ${isRTL ? "text-right" : "text-left"}`}
  >
    {text}
  </NavLink>
);

const DropdownSection = ({ title, children, isRTL }) => (
  <div className="mb-4">
    <div
      className={`mb-2 font-semibold text-gray-800 ${isRTL ? "text-right" : "text-left"}`}
    >
      {title}
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);

const LanguageItem = ({ label, code, isActive, onClick, isRTL }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center px-4 py-2 transition-colors hover:bg-gray-100 hover:text-[#32E0BB] ${isRTL ? "flex-row-reverse text-right" : "text-left"} ${isActive ? "bg-green-50 text-[#32E0BB]" : ""}`}
  >
    <span className="text-md">{code}</span>
    <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{label}</span>
    {isActive && (
      <span className={`text-[#32E0BB] ${isRTL ? "mr-auto" : "ml-auto"}`}>
        <IoMdCheckmark />
      </span>
    )}
  </button>
);

export default Header;
