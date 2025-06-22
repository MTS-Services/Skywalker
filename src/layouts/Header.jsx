import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-[#32E0BB] border-b-2 border-[#32E0BB] pb-1"
    : "hover:text-[#32E0BB]";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("AR");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsDropdownOpen(false);
    setLangOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleLanguage = () => setLangOpen((prev) => !prev);
  const handleLangSelect = (lang) => {
    setCurrentLang(lang);
    setLangOpen(false);
  };

  return (
    <nav className="border-b border-[#32E0BB] bg-white px-4 py-4 shadow-sm">
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
        <div className="text-md hidden items-center gap-6 font-medium text-black sm:flex">
          <Navigation
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            currentLang={currentLang}
            toggleLanguage={toggleLanguage}
            langOpen={langOpen}
            handleLangSelect={handleLangSelect}
          />
        </div>
        <NavLink
          to="/add-ad"
          className="hidden items-center rounded bg-blue-100 px-4 py-2 font-medium text-black hover:bg-[#32E0BB] hover:text-white sm:flex"
        >
          <FiPlus className="mr-1 text-lg" />
          Add Free Ad
        </NavLink>
      </div>
      {mobileMenuOpen && (
        <div className="mt-4 flex flex-col items-start gap-4 bg-white px-4 py-2 sm:hidden">
          <Navigation
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            currentLang={currentLang}
            toggleLanguage={toggleLanguage}
            langOpen={langOpen}
            handleLangSelect={handleLangSelect}
          />
          <NavLink
            to="/add-ad"
            className="flex items-center rounded bg-blue-100 px-4 py-2 font-medium text-black hover:bg-[#32E0BB] hover:text-white"
          >
            <FiPlus className="mr-1 text-lg" />
            Add Free Ad
          </NavLink>
        </div>
      )}
    </nav>
  );
}

const Navigation = ({
  toggleDropdown,
  isDropdownOpen,
  currentLang,
  toggleLanguage,
  langOpen,
  handleLangSelect,
}) => (
  <>
    <NavItem to="/" label="Home (Search)" />
    <NavItem to="/login" label="Login" />
    <NavItem to="/register" label="Register" />
    <NavItem to="/agents" label="Agents" />
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center hover:text-[#32E0BB]"
      >
        Kuwait Real Estate
        {isDropdownOpen ? (
          <FiChevronUp className="ml-1" />
        ) : (
          <FiChevronDown className="ml-1" />
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-[#32E0BB] bg-white p-4 shadow-lg sm:top-full sm:left-0 sm:mt-2 sm:w-64">
          <DropdownSection title="Properties for rent">
            <DropdownItem to="/rent/apartments" text="Apartments for rent" />
            <DropdownItem to="/rent/houses" text="Houses for rent" />
            <DropdownItem to="/rent/commercials" text="Commercials for rent" />
            <DropdownItem to="/rent/buildings" text="Buildings for rent" />
            <DropdownItem to="/rent/chalets" text="Chalets for rent" />
            <DropdownItem to="/rent/farms" text="Farms for rent" />
            <DropdownItem to="/rent/lands" text="Lands for rent" />
          </DropdownSection>
          <DropdownSection title="Properties for sale">
            <DropdownItem to="/sale/houses" text="Houses for sale" />
            <DropdownItem to="/sale/lands" text="Lands for sale" />
            <DropdownItem to="/sale/buildings" text="Buildings for sale" />
            <DropdownItem to="/sale/apartments" text="Apartments for sale" />
            <DropdownItem to="/sale/chalets" text="Chalets for sale" />
            <DropdownItem to="/sale/commercials" text="Commercials for sale" />
            <DropdownItem to="/sale/farms" text="Farms for sale" />
          </DropdownSection>
          <DropdownSection title="Properties for exchange">
            <DropdownItem to="/exchange/lands" text="Lands for exchange" />
            <DropdownItem to="/exchange/houses" text="Houses for exchange" />
          </DropdownSection>
        </div>
      )}
    </div>
    <div className="relative">
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-1 text-sm font-semibold hover:text-[#32E0BB]"
      >
        <span className="text-xl">{currentLang === "EN" ? "EN" : "ع"}</span>
        {langOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {langOpen && (
        <div className="absolute right-0 z-50 mt-2 w-32 rounded-md border border-[#32E0BB] bg-white py-1 text-sm shadow-md">
          <LanguageItem
            to="/en"
            label="English"
            code="EN"
            onSelect={handleLangSelect}
          />
          <LanguageItem
            to="/ar"
            label="العربية"
            code="AR"
            onSelect={handleLangSelect}
          />
        </div>
      )}
    </div>
  </>
);

const NavItem = ({ to, label }) => (
  <NavLink to={to} className={navLinkClass}>
    {label}
  </NavLink>
);

const DropdownItem = ({ to, text }) => (
  <NavLink
    to={to}
    className="block rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#32E0BB]"
  >
    {text}
  </NavLink>
);

const DropdownSection = ({ title, children }) => (
  <div className="mb-4">
    <div className="mb-2 font-semibold">{title}</div>
    {children}
  </div>
);

const LanguageItem = ({ to, label, code, onSelect }) => (
  <NavLink
    to={to}
    onClick={() => onSelect(code)}
    className="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-[#32E0BB]"
  >
    <span className="text-md">{code === "EN" ? "EN" : "ع"}</span>
    <span className="ml-2">{label}</span>
  </NavLink>
);

export default Header;
