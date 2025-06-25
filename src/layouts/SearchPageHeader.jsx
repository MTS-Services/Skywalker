import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FiAlignLeft, FiCreditCard, FiHome, FiInstagram, FiList, FiLogIn, FiLogOut, FiPlus, FiTrash, FiTwitter, FiUserPlus, FiX } from "react-icons/fi";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { MultiSelectDropdown, OnlyMultiSelectDropdown, SingleSelectDropdown } from "../components/shared/FilterDropdown";

// Component 1: Price Range Filter (Unchanged)
function PriceRangeFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice, t, isRTL, isOpen, onToggle, onApply }) {
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (isOpen) onToggle();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onToggle]);

    const handleMinChange = (e) => setMinPrice(e.target.value === "" ? "" : Number.parseInt(e.target.value));
    const handleMaxChange = (e) => setMaxPrice(e.target.value === "" ? "" : Number.parseInt(e.target.value));
    const handleReset = () => { setMinPrice(""); setMaxPrice(""); onApply(); };
    const handleSearch = () => onApply();

    const MAX_POSSIBLE_PRICE = 3000000;
    const MIN_POSSIBLE_PRICE = 0;

    return (
        <div className="relative w-full xs:w-auto" ref={dropdownRef}>
            <button type="button" onClick={onToggle} className={`w-full flex items-center justify-between gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-900 shadow-sm transition-colors hover:bg-primary-50/60 ${isOpen ? "ring-1 ring-primary-400" : ""}`}>
                <span>{t.search.price}</span>
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}><LuChevronDown /></span>
            </button>
            {isOpen && (
                <div className={`absolute z-20 mt-2 rounded-lg border border-primary-200 bg-white p-4 shadow-lg ${isRTL ? "left-0" : "right-0"}`} style={{ minWidth: "300px" }}>
                    <div className="mb-4 flex items-center justify-between text-sm font-medium text-primary-900">
                        <span>{minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice} {t.search.currency}</span>
                        <span>{maxPrice === "" ? `${MAX_POSSIBLE_PRICE}+` : `${maxPrice}+`} {t.search.currency}</span>
                    </div>
                    <input type="range" min={MIN_POSSIBLE_PRICE} max={MAX_POSSIBLE_PRICE} value={minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice} onChange={handleMinChange} className="w-full h-2 bg-primary-100/80 rounded-lg appearance-none cursor-pointer range-lg" />
                    <input type="range" min={MIN_POSSIBLE_PRICE} max={MAX_POSSIBLE_PRICE} value={maxPrice === "" ? MAX_POSSIBLE_PRICE : maxPrice} onChange={handleMaxChange} className="w-full h-2 bg-primary-100/80 rounded-lg appearance-none cursor-pointer range-lg mt-2" />
                    <div className="mt-4 flex gap-2">
                        <input type="number" placeholder={t.search.minPrice} value={minPrice} onChange={handleMinChange} className={`w-1/2 rounded-lg border border-primary-200 p-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-100 ${isRTL ? "text-right" : "text-left"}`} />
                        <input type="number" placeholder={t.search.maxPrice} value={maxPrice} onChange={handleMaxChange} className={`w-1/2 rounded-lg border border-primary-200 p-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-100 ${isRTL ? "text-right" : "text-left"}`} />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button onClick={handleReset} className="rounded-lg px-4 py-2 text-sm font-medium border border-primary-100 text-primary-900 hover:bg-primary-100">{t.search.reset}</button>
                        <button onClick={handleSearch} className="rounded-lg bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500">{t.search.search}</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Component 2: Text Search Filter (Unchanged)
function TextSearchFilter({ searchTerm, setSearchTerm, t, isRTL, isOpen, onToggle, onApply }) {
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (isOpen) onToggle();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onToggle]);

    const handleReset = () => { setSearchTerm(""); onApply(); };
    const handleSearch = () => onApply();

    return (
        <div className="relative w-full xs:w-auto" ref={dropdownRef}>
            <button type="button" onClick={onToggle} className={`w-full flex items-center justify-between gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-700 shadow-sm transition-colors hover:bg-primary-50/60 ${isOpen ? "ring-1 ring-primary-400" : ""}`}>
                <span>{t.search.text}</span>
                <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}><LuChevronDown /></span>
            </button>
            {isOpen && (
                <div className={`w-full absolute z-20 mt-2 rounded-lg border border-primary-200 bg-white p-4 shadow-lg ${isRTL ? "left-0" : "right-0"}`} style={{ minWidth: "300px" }}>
                    <p className="mb-2 text-sm text-primary-900">{t.search.searchUsingTextExample}</p>
                    <div className="relative">
                        <span className={`absolute inset-y-0 flex items-center ${isRTL ? "right-3" : "left-3"} text-primary-400`}><LuSearch /></span>
                        <input type="text" placeholder={t.search.searchByText} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full rounded-lg border border-primary-200 p-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-100 ${isRTL ? "pr-10 text-right" : "pl-10 text-left"} text-sm`} />
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        <button onClick={handleReset} className="rounded-lg px-4 py-2 text-sm font-medium border border-primary-100 text-primary-900 hover:bg-primary-100">{t.search.reset}</button>
                        <button onClick={handleSearch} className="rounded-lg bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500">{t.search.search}</button>
                    </div>
                </div>
            )}
        </div>
    );
}


// Component 3: The main filter bar logic
const SearchFilterBar = ({ initialFilters, t, isRTL, children }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(null);

    // State for all filter data and selected values
    const [allRegions, setAllRegions] = useState([]);
    const [allPropertyTypes, setAllPropertyTypes] = useState([]);
    const [transactionTypes, setTransactionTypes] = useState([]);
    const [transactionType, setTransactionType] = useState(initialFilters.transactionType);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
    const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
    const [searchText, setSearchText] = useState(initialFilters.searchText);

    // Fetch filter data from JSON files
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [regionsRes, propertyTypesRes, transactionTypesRes] = await Promise.all([
                    fetch("/data/regions.json"),
                    fetch("/data/propertyTypes.json"),
                    fetch("/data/transactionTypes.json"),
                ]);
                setAllRegions(await regionsRes.json());
                setAllPropertyTypes(await propertyTypesRes.json());
                setTransactionTypes(await transactionTypesRes.json());
            } catch (error) {
                console.error("Error fetching filter data:", error);
            }
        };
        fetchFilterData();
    }, []);

    // Effect to set initial selected items from URL params once data is loaded
    useEffect(() => {
        if (allRegions.length > 0) {
            const initialSelected = allRegions.filter((r) => initialFilters.regions.includes(r.id));
            setSelectedRegions(initialSelected);
        }
        if (allPropertyTypes.length > 0) {
            const initialSelected = allPropertyTypes.filter((p) => initialFilters.propertyTypes.includes(p.id));
            setSelectedPropertyTypes(initialSelected);
        }
    }, [allRegions, allPropertyTypes, initialFilters.regions, initialFilters.propertyTypes]);

    // Function to update URL with current filter state
    const updateURL = useCallback(() => {
        const params = new URLSearchParams();
        if (transactionType) params.set("transactionType", transactionType);
        selectedRegions.forEach((region) => params.append("region", region.id));
        selectedPropertyTypes.forEach((type) => params.append("propertyType", type.id));
        if (minPrice !== "" && minPrice !== undefined) params.set("minPrice", minPrice.toString());
        if (maxPrice !== "" && maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());
        if (searchText) params.set("searchText", searchText);
        navigate(`/search?${params.toString()}`, { replace: true });
    }, [transactionType, selectedRegions, selectedPropertyTypes, minPrice, maxPrice, searchText, navigate]);

    // Debounced effect to update URL when any filter changes
    useEffect(() => {
        const handler = setTimeout(() => updateURL(), 300);
        return () => clearTimeout(handler);
    }, [selectedRegions, selectedPropertyTypes, transactionType, minPrice, maxPrice, searchText, updateURL]);

    const toggleDropdown = useCallback((dropdownName) => {
        setShowDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    }, []);

    const filterProps = {
        allRegions, selectedRegions, setSelectedRegions,
        allPropertyTypes, selectedPropertyTypes, setSelectedPropertyTypes,
        transactionTypes, transactionType, setTransactionType,
        minPrice, setMinPrice, maxPrice, setMaxPrice,
        searchText, setSearchText,
        t, isRTL, showDropdown, toggleDropdown,
        onApply: () => setShowDropdown(null)
    };

    return children(filterProps);
};

// Component 4: Main Header Component (NOW RESPONSIVE)
export default function SearchPageHeader() {
    const { isRTL, t, toggleLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const initialFilters = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            transactionType: params.get("transactionType") || "",
            regions: params.getAll("region"),
            propertyTypes: params.getAll("propertyType"),
            minPrice: params.get("minPrice") || "",
            maxPrice: params.get("maxPrice") || "",
            searchText: params.get("searchText") || "",
        };
    }, [location.search]);

    return (
        <>
            <header className="relative z-30" dir={isRTL ? "rtl" : "ltr"}>
                <nav className="border-b border-primary-200 bg-white px-4 py-2 shadow-sm">
                    <SearchFilterBar initialFilters={initialFilters} t={t} isRTL={isRTL}>
                        {(props) => (
                            <div className="mx-auto max-w-3xl">
                                {/* ================== Desktop Header ================== */}
                                <div className="hidden md:flex items-center justify-start gap-5">
                                    <div className="flex items-center gap-10">
                                        <button onClick={toggleSidebar} className="text-2xl"><FiAlignLeft /></button>
                                        <NavLink to="/"><img src="/logo.png" alt="Logo" className="w-20" /></NavLink>
                                    </div>
                                    <div className="w-full space-y-2">
                                        <MultiSelectDropdown
                                            options={props.allRegions}
                                            selectedItems={props.selectedRegions}
                                            setSelectedItems={props.setSelectedRegions}
                                            placeholder={t.search.areaPlaceholder}
                                            searchPlaceholder={t.search.searchPlaceholder}
                                            label={t.search.area}
                                            isRTL={isRTL}
                                            isOpen={props.showDropdown === "area"}
                                            onToggle={() => props.toggleDropdown("area")}
                                        />
                                        <div className="flex flex-wrap items-center justify-start gap-2">
                                            <OnlyMultiSelectDropdown options={props.allPropertyTypes} selectedItems={props.selectedPropertyTypes} setSelectedItems={props.setSelectedPropertyTypes} placeholder={t.search.propertyTypePlaceholder} searchPlaceholder={t.search.searchPlaceholder} label={t.search.propertyType} isRTL={isRTL} isOpen={props.showDropdown === "propertyTypes"} onToggle={() => props.toggleDropdown("propertyTypes")} />
                                            <SingleSelectDropdown options={props.transactionTypes} selectedValue={props.transactionType} setSelectedValue={props.setTransactionType} placeholder={t.search.transactionTypePlaceholder} label={t.search.transactionType} isRTL={isRTL} isOpen={props.showDropdown === "transactionType"} onToggle={() => props.toggleDropdown("transactionType")} />
                                            <PriceRangeFilter minPrice={props.minPrice} maxPrice={props.maxPrice} setMinPrice={props.setMinPrice} setMaxPrice={props.setMaxPrice} t={t} isRTL={isRTL} isOpen={props.showDropdown === "price"} onToggle={() => props.toggleDropdown("price")} onApply={props.onApply} />
                                            <TextSearchFilter searchTerm={props.searchText} setSearchTerm={props.setSearchText} t={t} isRTL={isRTL} isOpen={props.showDropdown === "text"} onToggle={() => props.toggleDropdown("text")} onApply={props.onApply} />
                                        </div>
                                    </div>
                                </div>

                                {/* ================== Mobile Header ================== */}
                                <div className="flex flex-col gap-3 md:hidden">
                                    {/* Top Row: Hamburger, Search, Avatar */}
                                    <div className="flex items-center gap-3">
                                        <button onClick={toggleSidebar} className="text-2xl"><FiAlignLeft /></button>
                                        <div className="relative flex-grow">
                                            <MultiSelectDropdown
                                                options={props.allRegions}
                                                selectedItems={props.selectedRegions}
                                                setSelectedItems={props.setSelectedRegions}
                                                placeholder={t.search.areaPlaceholder}
                                                searchPlaceholder={t.search.searchPlaceholder}
                                                label={t.search.area}
                                                isRTL={isRTL}
                                                isOpen={props.showDropdown === "area"}
                                                onToggle={() => props.toggleDropdown("area")}
                                            />
                                        </div>
                                        {/* User Avatar Placeholder */}
                                        <img src="/logo.png" alt="User" className="h-9 w-9 rounded-full" />
                                    </div>

                                    {/* Bottom Row: Filter Buttons */}
                                    <div className="flex items-center gap-2 pb-2 -mb-2">
                                        <SingleSelectDropdown options={props.transactionTypes} selectedValue={props.transactionType} setSelectedValue={props.setTransactionType} placeholder={t.search.transactionTypePlaceholder} label={t.search.transactionType} isRTL={isRTL} isOpen={props.showDropdown === "transactionType"} onToggle={() => props.toggleDropdown("transactionType")} />
                                        <OnlyMultiSelectDropdown options={props.allPropertyTypes} selectedItems={props.selectedPropertyTypes} setSelectedItems={props.setSelectedPropertyTypes} placeholder={t.search.propertyTypePlaceholder} searchPlaceholder={t.search.searchPlaceholder} label={t.search.propertyType} isRTL={isRTL} isOpen={props.showDropdown === "propertyTypes"} onToggle={() => props.toggleDropdown("propertyTypes")} />
                                        <PriceRangeFilter minPrice={props.minPrice} maxPrice={props.maxPrice} setMinPrice={props.setMinPrice} setMaxPrice={props.setMaxPrice} t={t} isRTL={isRTL} isOpen={props.showDropdown === "price"} onToggle={() => props.toggleDropdown("price")} onApply={props.onApply} />
                                        <TextSearchFilter searchTerm={props.searchText} setSearchTerm={props.setSearchText} t={t} isRTL={isRTL} isOpen={props.showDropdown === "text"} onToggle={() => props.toggleDropdown("text")} onApply={props.onApply} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </SearchFilterBar>
                </nav>
            </header>
            <SideBar t={t} isRTL={isRTL} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} handleToggleLanguage={toggleLanguage} />
        </>
    );
}

// Component 5: SideBar (Unchanged)
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
        toggleSidebar(); // Close sidebar on logout
    };

    const navItems = useMemo(() => {
        const base = [{ label: "Home (Search)", icon: <FiHome />, to: "/" }];
        const auth = [
            { label: "Login", icon: <FiLogIn />, to: "/login" },
            { label: "Register", icon: <FiUserPlus />, to: "/register" }
        ];
        const protectedItems = [
            { label: "My Ads", icon: <FiList />, to: "/my-ads" },
            { label: "My Archives", icon: <FiTrash />, to: "/my-archives" },
            { label: "Buy Credits", icon: <FiCreditCard />, to: "/buy-credits" },
            { label: "Logout", icon: <FiLogOut />, action: handleLogout },
        ];
        const end = [{ label: "Agents", icon: <BsBuildings />, to: "/agents" }];

        return [...base, ...(user ? protectedItems : auth), ...end];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const baseTransformClass = isRTL ? "translate-x-full" : "-translate-x-full";
    const activeTransformClass = "translate-x-0";

    return (
        <>
            {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ease-in-out" onClick={toggleSidebar}></div>}
            <div className={`fixed top-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${sidebarOpen ? activeTransformClass : baseTransformClass} ${isRTL ? "right-0" : "left-0"}`} dir={isRTL ? "rtl" : "ltr"}>
                <div className="h-full bg-main text-lg">
                    <div className="border-b border-primary-400 px-4 py-4">
                        <div className="flex items-center justify-between">
                            <NavLink to="/"><img src="/logo.png" alt="Logo" className="w-20" /></NavLink>
                            <button onClick={toggleSidebar} className="flex items-center justify-center rounded-full bg-primary-50 p-2 text-primary-900"><FiX className="text-2xl" /></button>
                        </div>
                    </div>
                    <div className="flex flex-col pe-2 pt-2">
                        {navItems.map((item, index) => (
                            <div className="rounded-e-2xl active:bg-active" key={index}>
                                {item.to ? (
                                    <NavLink to={item.to} onClick={toggleSidebar} className="flex w-full items-center gap-3 py-3 ps-6 font-bold text-dark hover:text-primary-700">
                                        {item.icon}<span>{item.label}</span>
                                    </NavLink>
                                ) : (
                                    <button onClick={item.action} className="flex w-full items-center gap-3 py-3 ps-6 font-bold text-dark hover:text-primary-700">
                                        {item.icon}<span>{item.label}</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="my-4 border-b"></div>
                    <NavLink to="/add-ad" onClick={toggleSidebar} className="flex w-full cursor-pointer items-center gap-3 py-3 ps-6">
                        <FiPlus /><span className="font-bold text-primary-900">Create Ad</span>
                    </NavLink>
                    <div className="absolute bottom-4 end-0 start-0 flex items-center justify-center gap-4">
                        <button onClick={handleToggleLanguage} className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-400 p-0 text-white transition-all duration-300 ease-linear active:bg-primary-600 hover:bg-primary-600">
                            <span className={`text-xl ${isRTL ? "" : "relative bottom-1"}`}>{isRTL ? "En" : "ع"}</span>
                        </button>
                        <a target="_blank" href="https://www.instagram.com/" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-400 p-0 text-white transition-all duration-300 ease-linear active:bg-primary-600 hover:bg-primary-600">
                            <FiInstagram className="h-5 w-5 shrink-0" />
                        </a>
                        <a target="_blank" href="https://x.com/" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-400 p-0 text-white transition-all duration-300 ease-linear active:bg-primary-600 hover:bg-primary-600">
                            <FiTwitter className="h-5 w-5 shrink-0" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
