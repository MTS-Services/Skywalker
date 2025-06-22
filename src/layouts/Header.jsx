"use client"
import { useState, useEffect } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { FiChevronDown, FiChevronUp, FiPlus, FiMenu, FiX, FiGlobe } from "react-icons/fi"
import { useLanguage } from "../context/LanguageContext"

const navLinkClass = ({ isActive }) =>
  isActive ? "text-[#32E0BB] border-b-2 border-[#32E0BB] pb-1" : "hover:text-[#32E0BB] transition-colors"

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isRTL, toggleLanguage, t, language } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    setIsDropdownOpen(false)
    setLangOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev)
  const toggleLangDropdown = () => setLangOpen((prev) => !prev)

  const handleLanguageChange = () => {
    toggleLanguage()
    setLangOpen(false)
  }

  return (
    <nav className={`relative z-50 border-b border-[#32E0BB] bg-white px-4 py-4 shadow-sm ${isRTL ? "rtl" : "ltr"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-auto w-36 sm:w-48" />
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen((prev) => !prev)} className="text-2xl text-[#32E0BB] sm:hidden">
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Navigation */}
        <div
          className={`text-md hidden items-center gap-6 font-medium text-black sm:flex ${isRTL ? "space-x-reverse" : ""}`}
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

        {/* Add Free Ad Button - Desktop */}
        <NavLink
          to="/add-ad"
          className={`hidden items-center rounded bg-blue-100 px-4 py-2 font-medium text-black hover:bg-[#32E0BB] hover:text-white transition-colors sm:flex ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <FiPlus className={`text-lg ${isRTL ? "ml-1" : "mr-1"}`} />
          {t.addFreeAd}
        </NavLink>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 z-40 w-full bg-white shadow-md sm:hidden">
          <div className={`flex flex-col items-start gap-4 px-4 py-4 ${isRTL ? "items-end" : "items-start"}`}>
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
              className={`flex items-center rounded bg-blue-100 px-4 py-2 font-medium text-black hover:bg-[#32E0BB] hover:text-white transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <FiPlus className={`text-lg ${isRTL ? "ml-1" : "mr-1"}`} />
              {t.addFreeAd}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
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
    className={`flex ${isMobile ? "flex-col gap-4" : "items-center gap-6"} ${isRTL && !isMobile ? "space-x-reverse" : ""}`}
  >
    <NavItem to="/" label={t.home} isRTL={isRTL} />
    <NavItem to="/login" label={t.login} isRTL={isRTL} />
    <NavItem to="/register" label={t.register} isRTL={isRTL} />
    <NavItem to="/agents" label={t.agents} isRTL={isRTL} />

    {/* Real Estate Dropdown */}
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`flex items-center hover:text-[#32E0BB] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {t.kuwaitRealEstate}
        {isDropdownOpen ? (
          <FiChevronUp className={`${isRTL ? "mr-1" : "ml-1"}`} />
        ) : (
          <FiChevronDown className={`${isRTL ? "mr-1" : "ml-1"}`} />
        )}
      </button>
      {isDropdownOpen && (
        <div
          className={`absolute z-10 mt-2 w-64 rounded-md border border-[#32E0BB] bg-white p-4 shadow-lg ${isRTL ? "right-0 text-right" : "left-0 text-left"}`}
        >
          <DropdownSection title={isRTL ? "عقارات للإيجار" : "Properties for rent"} isRTL={isRTL}>
            <DropdownItem to="/rent/apartments" text={isRTL ? "شقق للإيجار" : "Apartments for rent"} isRTL={isRTL} />
            <DropdownItem to="/rent/houses" text={isRTL ? "منازل للإيجار" : "Houses for rent"} isRTL={isRTL} />
            <DropdownItem to="/rent/villas" text={isRTL ? "فلل للإيجار" : "Villas for rent"} isRTL={isRTL} />
          </DropdownSection>
          <DropdownSection title={isRTL ? "عقارات للبيع" : "Properties for sale"} isRTL={isRTL}>
            <DropdownItem to="/sale/apartments" text={isRTL ? "شقق للبيع" : "Apartments for sale"} isRTL={isRTL} />
            <DropdownItem to="/sale/houses" text={isRTL ? "منازل للبيع" : "Houses for sale"} isRTL={isRTL} />
            <DropdownItem to="/sale/villas" text={isRTL ? "فلل للبيع" : "Villas for sale"} isRTL={isRTL} />
          </DropdownSection>
          <DropdownSection title={isRTL ? "عقارات تجارية" : "Commercial Properties"} isRTL={isRTL}>
            <DropdownItem to="/commercial/offices" text={isRTL ? "مكاتب" : "Offices"} isRTL={isRTL} />
            <DropdownItem to="/commercial/shops" text={isRTL ? "محلات تجارية" : "Shops"} isRTL={isRTL} />
            <DropdownItem to="/commercial/warehouses" text={isRTL ? "مستودعات" : "Warehouses"} isRTL={isRTL} />
          </DropdownSection>
        </div>
      )}
    </div>

    {/* Language Dropdown */}
    <div className="relative">
      <button
        onClick={toggleLangDropdown}
        className={`flex items-center space-x-1 text-sm font-semibold hover:text-[#32E0BB] transition-colors ${isRTL ? "space-x-reverse" : ""}`}
      >
        <FiGlobe className="text-lg" />
        <span className="text-lg font-medium">{language === "en" ? "EN" : "ع"}</span>
        {langOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {langOpen && (
        <div
          className={`absolute z-50 mt-2 w-36 rounded-md border border-[#32E0BB] bg-white py-1 text-sm shadow-md ${isRTL ? "right-0" : "left-0"}`}
        >
          <LanguageItem
            label="English"
            code="EN"
            isActive={language === "en"}
            onClick={handleLanguageChange}
            isRTL={isRTL}
          />
          <LanguageItem
            label="العربية"
            code="ع"
            isActive={language === "ar"}
            onClick={handleLanguageChange}
            isRTL={isRTL}
          />
        </div>
      )}
    </div>
  </div>
)

const NavItem = ({ to, label, isRTL }) => (
  <NavLink to={to} className={navLinkClass}>
    <span className={isRTL ? "text-right" : "text-left"}>{label}</span>
  </NavLink>
)

const DropdownItem = ({ to, text, isRTL }) => (
  <NavLink
    to={to}
    className={`block rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#32E0BB] transition-colors ${isRTL ? "text-right" : "text-left"}`}
  >
    {text}
  </NavLink>
)

const DropdownSection = ({ title, children, isRTL }) => (
  <div className="mb-4">
    <div className={`mb-2 font-semibold text-gray-800 ${isRTL ? "text-right" : "text-left"}`}>{title}</div>
    <div className="space-y-1">{children}</div>
  </div>
)

const LanguageItem = ({ label, code, isActive, onClick, isRTL }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2 hover:bg-gray-100 hover:text-[#32E0BB] transition-colors ${isRTL ? "flex-row-reverse text-right" : "text-left"} ${isActive ? "bg-green-50 text-[#32E0BB]" : ""}`}
  >
    <span className="text-md font-medium">{code}</span>
    <span className={`${isRTL ? "mr-2" : "ml-2"}`}>{label}</span>
    {isActive && <span className={`text-[#32E0BB] ${isRTL ? "mr-auto" : "ml-auto"}`}>✓</span>}
  </button>
)

export default Header
