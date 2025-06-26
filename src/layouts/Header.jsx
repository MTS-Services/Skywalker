import { useState, useEffect, useRef, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-[#26b1e6] border-b-2 border-[#26b1e6] pb-1"
    : "hover:text-[#26b1e6] transition-colors";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isRTL, t, toggleLanguage, language } = useLanguage();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext); // logout ফাংশনটি AuthContext থেকে নেওয়া হয়েছে

  const dropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
    setLangOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleLangDropdown = () => setLangOpen((prev) => !prev);

  const handleLanguageChange = (lang) => {
    toggleLanguage(lang);
    console.log();
    setLangOpen(false);
  };

  const handleLogout = () => {
    logout(); // logout ফাংশন কল করা হয়েছে
    // ঐচ্ছিকভাবে: লগআউট করার পর ব্যবহারকারীকে হোমপেজে রিডাইরেক্ট করতে পারেন
    // navigate('/'); // react-router-dom এর useNavigate হুক ব্যবহার করে
  };

  return (
    <nav
      className={`border-primary-500 relative z-50 border-b bg-white px-4 py-4 shadow-sm ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-20" />
        </Link>

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-primary-500 text-2xl sm:hidden"
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
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout} // handleLogout প্রপ হিসাবে পাঠানো হয়েছে
          />
        </div>

      
          <NavLink
            to="/ad-upload"
            className={`hidden items-center rounded bg-blue-100 px-4 py-2 font-medium text-black transition-colors hover:bg-[var(--color-primary-400)] hover:text-white sm:flex ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <FiPlus className={`text-lg ${isRTL ? "ml-1" : "mr-1"}`} />
            {t.header.addFreeAd}
          </NavLink>
      
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 z-44 mt-0.5 w-full bg-gray-50 shadow-md sm:hidden">
          <div
            className={`flex flex-col items-start gap-4 px-4 py-4 ${
              isRTL ? "items-end" : "items-start"
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
              isMobile={true}
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout} // handleLogout প্রপ হিসাবে পাঠানো হয়েছে
            />
            
              <NavLink
                to="/add-ad"
                className={`flex items-center rounded bg-blue-100 px-4 py-2 font-medium text-black transition-colors hover:bg-[var(--color-primary-400)] hover:text-white ${isRTL ? "flex-row-reverse" : ""}`}
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
  dropdownRef,
  langDropdownRef,
  isAuthenticated,
  handleLogout, // handleLogout প্রপ গ্রহণ করা হয়েছে
}) => (
  <div
    className={`flex ${isMobile ? "flex-col gap-4" : "items-center gap-6"} ${isRTL && !isMobile ? "space-x-reverse" : ""
      }`}
  >
    {/* এই লিঙ্কগুলো সব ব্যবহারকারীর জন্য সবসময় দেখা যাবে */}
    <NavItem to="/" label={t.header.home} isRTL={isRTL} />
    {/* <NavItem to="/agents" label={t.header.agents} isRTL={isRTL} /> */}
    {isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="pb-1 font-medium text-black transition-colors hover:text-[#32E0BB]"
      >
        {t.header.logout} {/* Logout টেক্সট দেখাবে */}
      </button>
    ) : (
      <>
        <NavItem to="/login" label={t.header.login} isRTL={isRTL} />
        <NavItem to="/register" label={t.header.register} isRTL={isRTL} />
      </>
    )}
    {isAuthenticated && (
      <>
        <NavItem to="/my-ads" label={t.header.myAds} isRTL={isRTL} />
        <NavItem to="/my-archives" label={t.header.myArchives} isRTL={isRTL} />
        <NavItem to="/buy-credits" label={t.header.byCredit} isRTL={isRTL} />

{/* <Link
          to="/testingpage"
          className="pb-1 font-medium text-black transition-colors hover:text-[#32E0BB]"
        >
          testing code{" "}
        </Link>{" "} */}
{/* Link-কেও NavItem-এর মতো স্টাইল করা হয়েছে */ }
      </>
    )}
{/* "Agents" লিঙ্কটি সবসময় দেখা যাবে */ }
<NavItem to="/agents" label={t.header.agents} isRTL={isRTL} />
{/* Kuwait Real Estate ড্রপডাউন - ব্যবহারকারী লগইন/রেজিস্টার করার আগে দেখা যাবে */ }
{/* এটি এখন !isAuthenticated প্রপের উপর নির্ভর করে রেন্ডার হবে */ }
{
  !isAuthenticated && (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex cursor-pointer items-center transition-colors hover:text-[var(--color-primary-400)] ${isDropdownOpen ? "text-[var(--color-primary-400)]" : ""
          } ${isRTL ? "flex-row-reverse" : ""}`}
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
          className={`absolute z-10 mt-2 max-h-[40vh] w-[220px] overflow-y-auto rounded-md border border-[var(--color-primary-400)] bg-white p-4 shadow-lg sm:top-full sm:left-0 sm:mt-2 sm:max-h-none sm:w-54 sm:overflow-visible ${isRTL ? "right-0 text-right" : "left-0 text-left"
            }`}
        >
          <DropdownSection
            title={isRTL ? "عقارات للايجار" : "Properties for rent"}
            isRTL={isRTL}
          >
            <DropdownItem
              to="/rent/apartments"
              text={isRTL ? "শقق للايجار" : "Apartments for rent"}
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
              text={isRTL ? "শاليهات للايجার" : "Chalets for rent"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/rent/farms"
              text={isRTL ? "মزارع للايجار" : "Farms for rent"}
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
              text={isRTL ? "শقق للبيع" : "Apartments for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/chalets"
              text={isRTL ? "শاليهات للبيع" : "Chalets for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/commercials"
              text={isRTL ? " تجاري للبيع" : "Commercials for sale"}
              isRTL={isRTL}
            />
            <DropdownItem
              to="/sale/farms"
              text={isRTL ? "মزارع للبيع" : "Farms for sale"}
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
  )
} { " " }
{/* !isAuthenticated এর ক্লোজিং ট্যাগ */ }
{/* Language ড্রপডাউন - সবসময় দেখা যাবে */ }
<div className="relative">
  <button
    onClick={toggleLangDropdown}
    className={`flex cursor-pointer items-center space-x-1 text-sm font-semibold transition-colors hover:text-[var(--color-primary-600)] ${isRTL ? "space-x-reverse" : ""
      }`}
  >
    <FiGlobe className="text-lg" />
    <span className="text-lg font-medium">
      {language === "en" ? "ع" : "EN"}
    </span>
    {langOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
  </button>
  {langOpen && (
    <div
      ref={langDropdownRef}
      className={`absolute z-50 mt-2 w-36 rounded-md border border-[var(--color-primary-500)] bg-white py-1 text-sm shadow-md ${isRTL ? "right-0" : "left-0"
        }`}
    >
      <LanguageItem
        label="English"
        isActive={language === "en"}
        onClick={() => handleLanguageChange("en")}
        isRTL={isRTL}
      />
      <LanguageItem
        label="العربية"
        isActive={language === "ar"}
        onClick={() => handleLanguageChange("ar")}
        isRTL={isRTL}
      />
    </div>
  )}
</div>
  </div >
);

const NavItem = ({ to, label, isRTL }) => (
  <NavLink to={to} className={navLinkClass}>
    <span className={isRTL ? "text-right" : "text-left"}>{label}</span>
  </NavLink>
);

const DropdownItem = ({ to, text, isRTL }) => (
  <NavLink
    to={to}
    className={`block rounded px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-[var(--color-primary-600)] ${isRTL ? "text-right" : "text-left"
      }`}
  >
    {text}
  </NavLink>
);

const DropdownSection = ({ title, children, isRTL }) => (
  <div className="mb-4">
    <div
      className={`mb-2 font-semibold text-gray-800 ${isRTL ? "text-right" : "text-left"
        }`}
    >
      {title}
    </div>
    <div className="space-y-1">{children}</div>
  </div>
);

const LanguageItem = ({ label, code, isActive, onClick, isRTL }) => (
  <button
    onClick={onClick}
    className={`flex w-full cursor-pointer items-center px-4 py-2 transition-colors hover:bg-gray-100 hover:text-[var(--color-primary-600)] ${isRTL ? "flex-row-reverse text-right" : "text-left"
      } ${isActive ? "bg-green-50 text-[var(--color-primary-500)]" : ""}`}
  >
    <span className="text-md">{code}</span>
    <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{label}</span>
    {isActive && (
      <span
        className={`text-[var(--color-primary-500)] ${isRTL ? "mr-auto" : "ml-auto"
          }`}
      >
        <IoMdCheckmark />
      </span>
    )}
  </button>
);

export default Header;
