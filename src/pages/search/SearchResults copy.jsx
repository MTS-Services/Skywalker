import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useLanguage } from "../../context/LanguageContext"; // Removed due to resolution error

// --- Data Constants ---
const allRegions = [
  { id: "all", name: { en: "All Region", ar: "كل المناطق" } },
  { id: "hawally", name: { en: "Hawally", ar: "حولي" } },
  { id: "salmiya", name: { en: "Salmiya", ar: "السالمية" } },
  { id: "salwa", name: { en: "Salwa", ar: "سلوى" } },
  { id: "jabriya", name: { en: "Jabriya", ar: "الجابرية" } },
];
const allPropertyTypes = [
  { id: "apartment", name: { en: "Apartment", ar: "شقة" } },
  { id: "house", name: { en: "House", ar: "منزل" } },
  { id: "land", name: { en: "Land", ar: "أرض" } },
  { id: "building", name: { en: "Building", ar: "مبنى" } },
  { id: "chalet", name: { en: "Chalet", ar: "شاليه" } },
  { id: "farm", name: { en: "Farm", ar: "مزرعة" } },
  { id: "commercial", name: { en: "Commercial", ar: "تجاري" } }, // Added commercial as per image
];
const transactionTypes = [
  { id: "rent", name: { en: "Rent", ar: "ايجار" } },
  { id: "sale", name: { en: "Sale", ar: "بيع" } },
  { id: "exchange", name: { en: "Exchange", ar: "بدل" } },
];

// Simplified translation object for demonstration
const mockTranslations = {
  en: {
    search: {
      searchResults: "Search Results",
      ads: "Ads",
      loading: "Loading...",
      noResultsFound: "No results found.",
      super: "Super",
      currency: "KD",
      transactionType: "Transaction Type",
      transactionTypePlaceholder: "Select Type",
      propertyType: "Property Type",
      propertyTypePlaceholder: "Select Property Type",
      area: "Area", // New translation key for Area/Region
      areaPlaceholder: "Type Area to Search", // Changed to match image
      searchPlaceholder: "Search...",
      price: "Price",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      text: "Text",
      searchUsingTextExample: "Search using text (e.g.: pool or parking)",
      searchByText: "Search by text",
      reset: "Reset",
      search: "Search",
      justNow: "just now",
      minutes: "minutes",
      hours: "hours",
      noResults: "No results",
    },
  },
  ar: {
    search: {
      searchResults: "نتائج البحث",
      ads: "إعلانات",
      loading: "جار التحميل...",
      noResultsFound: "لا توجد نتائج.",
      super: "مميز",
      currency: "د.ك",
      transactionType: "نوع المعاملة",
      transactionTypePlaceholder: "اختر النوع",
      propertyType: "نوع العقار",
      propertyTypePlaceholder: "اختر نوع العقار",
      area: "المنطقة", // New translation key for Area/Region
      areaPlaceholder: "اكتب المنطقة للبحث", // Changed to match image
      searchPlaceholder: "بحث...",
      price: "السعر",
      minPrice: "الحد الأدنى للسعر",
      maxPrice: "الحد الأقصى للسعر",
      text: "نص",
      searchUsingTextExample: "البحث باستخدام النص (على سبيل المثال: حمام سباحة أو موقف سيارات)",
      searchByText: "البحث بالنص",
      reset: "إعادة تعيين",
      search: "بحث",
      justNow: "الآن",
      minutes: "دقيقة",
      hours: "ساعة",
      noResults: "لا توجد نتائج",
    },
  },
};

/**
 * Main SearchResults Page Component
 */
const SearchResults = () => {
  // Simulating useLanguage hook
  const [language, setLanguage] = useState("en"); // Default to English
  const isRTL = language === "ar";
  const t = useMemo(() => mockTranslations[language], [language]);

  const location = useLocation();
  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters are derived directly from the URL search params
  const filters = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      transactionType: params.get("transactionType") || "sale", // Default to 'sale'
      regions: params.getAll("regions"), // Still keeping this for potential future multi-select, but not directly used by text input
      propertyTypes: params.getAll("propertyTypes"),
      minPrice: params.get("minPrice") ? parseInt(params.get("minPrice")) : "",
      maxPrice: params.get("maxPrice") ? parseInt(params.get("maxPrice")) : "",
      searchText: params.get("searchText") || "",
      areaSearchText: params.get("areaSearchText") || "", // New state for area text search
    };
  }, [location.search]);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await fetch("/ads.json");
        const data = await response.json();
        setAllAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  const filteredAds = useMemo(() => {
    if (!allAds.length) return [];
    return allAds.filter((ad) => {
      // Parse KD value to a number, handling commas
      const adKd = parseFloat(ad.kd.replace(/,/g, ""));

      const transactionMatch =
        !filters.transactionType ||
        ad.transactionType === filters.transactionType;
      // Modified region match to use areaSearchText
      const regionMatch =
        !filters.areaSearchText ||
        ad.region.toLowerCase().includes(filters.areaSearchText.toLowerCase()) ||
        allRegions.some(region =>
            region.id.toLowerCase() === ad.region.toLowerCase() &&
            region.name[language].toLowerCase().includes(filters.areaSearchText.toLowerCase())
        );

      const propertyTypeMatch =
        filters.propertyTypes.length === 0 ||
        filters.propertyTypes.includes(ad.propertyType);
      const priceMatch =
        (filters.minPrice === "" || adKd >= filters.minPrice) &&
        (filters.maxPrice === "" || adKd <= filters.maxPrice);
      const textMatch =
        !filters.searchText ||
        ad.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        ad.description.toLowerCase().includes(filters.searchText.toLowerCase());

      return (
        transactionMatch &&
        regionMatch && // Use the updated region match
        propertyTypeMatch &&
        priceMatch &&
        textMatch
      );
    });
  }, [allAds, filters, language]); // Added language to dependencies for region name matching

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`container mx-auto px-4 py-6`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* --- Language Toggle (for demonstration) --- */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-l-lg ${language === "en" ? "bg-primary-400 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("ar")}
            className={`px-3 py-1 rounded-r-lg ${language === "ar" ? "bg-primary-400 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            العربية
          </button>
        </div>

        {/* --- New Filter Bar --- */}
        <SearchFilterBar initialFilters={filters} t={t} isRTL={isRTL} />

        <h1 className="mt-8 mb-6 text-2xl font-bold">
          {t.search.searchResults} ({loading ? "..." : filteredAds.length}{" "}
          {t.search.ads})
        </h1>

        {loading ? (
          <div className="p-10 text-center">{t.search.loading}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredAds.length > 0 ? (
              filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} t={t} language={language} />
              ))
            ) : (
              <div className="col-span-full rounded-lg bg-white p-10 text-center text-gray-500 shadow">
                {t.search.noResultsFound}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * The main filter bar component, styled like the Hero filter.
 */
const SearchFilterBar = ({ initialFilters, t, isRTL }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null); // State to manage which dropdown is open

  // States for each filter control, initialized from URL params
  const [transactionType, setTransactionType] = useState(
    initialFilters.transactionType,
  );
  // Removed selectedRegions state as it's no longer a multi-select dropdown
  const [areaSearchText, setAreaSearchText] = useState(initialFilters.areaSearchText); // New state for area text input

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(
    allPropertyTypes
      .filter((p) => initialFilters.propertyTypes.includes(p.id))
      .map((p) => ({ ...p, name: p.name[isRTL ? "ar" : "en"] })),
  );
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [searchText, setSearchText] = useState(initialFilters.searchText);

  // This effect synchronizes the URL with the local state of the filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (transactionType) {
      params.set("transactionType", transactionType);
    }
    // Removed regions loop as it's no longer a multi-select dropdown
    if (areaSearchText) { // Add areaSearchText to URL params
      params.set("areaSearchText", areaSearchText);
    }

    selectedPropertyTypes.forEach((type) => {
      params.append("propertyTypes", type.id);
    });
    if (minPrice !== "" && minPrice !== undefined) {
      params.set("minPrice", minPrice.toString());
    }
    if (maxPrice !== "" && maxPrice !== undefined) {
      params.set("maxPrice", maxPrice.toString());
    }
    if (searchText) {
      params.set("searchText", searchText);
    }

    // Using replace to avoid bloating browser history on every filter change
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [
    transactionType,
    areaSearchText, // Added areaSearchText to dependencies
    selectedPropertyTypes,
    minPrice,
    maxPrice,
    searchText,
    navigate,
  ]);

  // Function to toggle dropdown visibility
  const toggleDropdown = useCallback((dropdownName) => {
    setShowDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-4 shadow-lg sm:p-6">
      {/* Area Search Input Field (as per original design) */}
      <div className="relative w-full">
        <span
          className={`absolute inset-y-0 flex items-center ${isRTL ? "right-3" : "left-3"} text-gray-400`}
        >
          {/* Search Icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder={t.search.areaPlaceholder}
          value={areaSearchText}
          onChange={(e) => setAreaSearchText(e.target.value)}
          className={`w-full rounded-3xl border border-gray-300 p-3 ${isRTL ? "pr-10 text-right" : "pl-10 text-left"} focus:border-primary-400 focus:ring-2 focus:ring-primary-400`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Transaction Type Dropdown */}
        <SingleSelectDropdown
          options={transactionTypes.map((type) => ({
            ...type,
            name: type.name[isRTL ? "ar" : "en"],
          }))}
          selectedValue={transactionType}
          setSelectedValue={setTransactionType}
          placeholder={t.search.transactionTypePlaceholder}
          label={t.search.transactionType}
          isRTL={isRTL}
          isOpen={showDropdown === "transactionType"}
          onToggle={() => toggleDropdown("transactionType")}
        />

        {/* Property Type Dropdown */}
        <MultiSelectDropdown
          options={allPropertyTypes.map((type) => ({
            ...type,
            name: type.name[isRTL ? "ar" : "en"],
          }))}
          selectedItems={selectedPropertyTypes}
          setSelectedItems={setSelectedPropertyTypes}
          placeholder={t.search.propertyTypePlaceholder}
          searchPlaceholder={t.search.searchPlaceholder}
          label={t.search.propertyType}
          isRTL={isRTL}
          isOpen={showDropdown === "propertyType"}
          onToggle={() => toggleDropdown("propertyType")}
        />

        {/* Price Filter */}
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          t={t}
          isRTL={isRTL}
          isOpen={showDropdown === "price"}
          onToggle={() => toggleDropdown("price")}
          onApply={() => setShowDropdown(null)} // Close after applying price filter
        />

        {/* Text Search Filter */}
        <TextSearchFilter
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          t={t}
          isRTL={isRTL}
          isOpen={showDropdown === "text"}
          onToggle={() => toggleDropdown("text")}
          onApply={() => setShowDropdown(null)} // Close after applying text filter
        />
      </div>
    </div>
  );
};

/**
 * A reusable multi-select dropdown component.
 */
function MultiSelectDropdown({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  label,
  isRTL,
  isOpen,
  onToggle,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Custom hook for closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle(); // Close if clicking outside and currently open
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, { ...item, name: item.name }],
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 ${isOpen ? "ring-2 ring-primary-400" : ""}`}
        onClick={onToggle}
      >
        <span>{label}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          {/* Chevron Down Icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 max-h-60 w-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg ${isRTL ? "left-0" : "right-0"}`}
        >
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-primary-400 focus:ring-primary-400 ${isRTL ? "text-right" : "text-left"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md p-2 text-gray-800 hover:bg-primary-50 ${isRTL ? "flex-row-reverse" : ""}`}
                  onClick={() => toggleItem(option)}
                >
                  <div className={`flex items-center ${isRTL ? "pr-2" : "pl-2"}`}>
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedItems.some(
                        (item) => item.id === option.id,
                      )}
                      className="form-checkbox text-primary-400 h-4 w-4 cursor-pointer rounded"
                    />
                    <span className={`${isRTL ? "mr-2" : "ml-2"}`}>
                      {option.name}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">
                {searchPlaceholder}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * A reusable single-select dropdown component (radio buttons).
 */
function SingleSelectDropdown({
  options,
  selectedValue,
  setSelectedValue,
  placeholder,
  label,
  isRTL,
  isOpen,
  onToggle,
}) {
  const dropdownRef = useRef(null);

  // Custom hook for closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle(); // Close if clicking outside and currently open
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onToggle(); // Close after selection
  };

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 ${isOpen ? "ring-2 ring-primary-400" : ""}`}
        onClick={onToggle}
      >
        <span>{label}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          {/* Chevron Down Icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 max-h-60 w-64 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg ${isRTL ? "left-0" : "right-0"}`}
        >
          <ul className="p-1">
            {options.map((option) => (
              <li
                key={option.id}
                className={`flex cursor-pointer items-center rounded-md p-2 text-gray-800 hover:bg-primary-50 ${isRTL ? "flex-row-reverse" : ""}`}
                onClick={() => handleSelect(option.id)}
              >
                <input
                  type="radio"
                  readOnly
                  checked={selectedValue === option.id}
                  className="form-radio text-primary-400 h-4 w-4 cursor-pointer"
                />
                <span className={`${isRTL ? "mr-2" : "ml-2"}`}>
                  {option.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Price Range Filter Component with Slider and Input fields.
 */
function PriceRangeFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  t,
  isRTL,
  isOpen,
  onToggle,
  onApply,
}) {
  const dropdownRef = useRef(null);

  // Custom hook for closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle(); // Close if clicking outside and currently open
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const handleMinChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    setMaxPrice(value);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    onApply(); // Apply reset
  };

  const handleSearch = () => {
    onApply(); // Apply current price filters
  };

  // Max price for slider - adjust as needed based on your data
  const MAX_POSSIBLE_PRICE = 3000000;
  const MIN_POSSIBLE_PRICE = 0;

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 ${isOpen ? "ring-2 ring-primary-400" : ""}`}
        onClick={onToggle}
      >
        <span>{t.search.price}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          {/* Chevron Down Icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg ${isRTL ? "left-0" : "right-0"}`}
          style={{ minWidth: "300px" }}
        >
          <div className="mb-4 flex items-center justify-between text-sm font-medium text-gray-700">
            <span>{minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice} {t.search.currency}</span>
            <span>{maxPrice === "" ? `${MAX_POSSIBLE_PRICE}+` : `${maxPrice}+`} {t.search.currency}</span>
          </div>
          <input
            type="range"
            min={MIN_POSSIBLE_PRICE}
            max={MAX_POSSIBLE_PRICE}
            value={minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
          />
          <input
            type="range"
            min={MIN_POSSIBLE_PRICE}
            max={MAX_POSSIBLE_PRICE}
            value={maxPrice === "" ? MAX_POSSIBLE_PRICE : maxPrice}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg mt-2"
          />
          <div className="mt-4 flex gap-2">
            <input
              type="number"
              placeholder={t.search.minPrice}
              value={minPrice}
              onChange={handleMinChange}
              className={`w-1/2 rounded-lg border border-gray-300 p-2 text-sm ${isRTL ? "text-right" : "text-left"}`}
            />
            <input
              type="number"
              placeholder={t.search.maxPrice}
              value={maxPrice}
              onChange={handleMaxChange}
              className={`w-1/2 rounded-lg border border-gray-300 p-2 text-sm ${isRTL ? "text-right" : "text-left"}`}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleReset}
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              {t.search.reset}
            </button>
            <button
              onClick={handleSearch}
              className="rounded-full bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500"
            >
              {t.search.search}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Text Search Filter Component.
 */
function TextSearchFilter({
  searchTerm,
  setSearchTerm,
  t,
  isRTL,
  isOpen,
  onToggle,
  onApply,
}) {
  const dropdownRef = useRef(null);

  // Custom hook for closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle(); // Close if clicking outside and currently open
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const handleReset = () => {
    setSearchTerm("");
    onApply(); // Apply reset
  };

  const handleSearch = () => {
    onApply(); // Apply current search term
  };

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`flex items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 ${isOpen ? "ring-2 ring-primary-400" : ""}`}
        onClick={onToggle}
      >
        <span>{t.search.text}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          {/* Chevron Down Icon (inline SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg ${isRTL ? "left-0" : "right-0"}`}
          style={{ minWidth: "300px" }}
        >
          <p className="mb-2 text-sm text-gray-600">
            {t.search.searchUsingTextExample}
          </p>
          <div className="relative">
            <span
              className={`absolute inset-y-0 flex items-center ${isRTL ? "right-3" : "left-3"} text-gray-400`}
            >
              {/* Search Icon (inline SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder={t.search.searchByText}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-lg border border-gray-300 p-2 ${isRTL ? "pr-10 text-right" : "pl-10 text-left"} text-sm focus:border-primary-400 focus:ring-primary-400`}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleReset}
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              {t.search.reset}
            </button>
            <button
              onClick={handleSearch}
              className="rounded-full bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500"
            >
              {t.search.search}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * AdCard Component: Renders a single ad in the list.
 */
const AdCard = ({ ad, t, language }) => {
  const navigate = useNavigate();

  const formatTimeAgo = (dateString, lang) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) return lang === "ar" ? t.search.justNow : t.search.justNow; // Using translation
      return `${minutes} ${lang === "ar" ? t.search.minutes : t.search.minutes}`; // Using translation
    }
    return `${hours} ${lang === "ar" ? t.search.hours : t.search.hours}`; // Using translation
  };

  return (
    <div
      onClick={() => navigate(`/ads/${ad.slug}`)}
      className="group w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-md sm:h-36 sm:w-48">
          <img
            alt={ad.title}
            src={
              ad.images && ad.images.length > 0
                ? ad.images[0]
                : "https://placehold.co/192x144/EBF4FF/333333?text=Ad"
            }
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {ad.isSuper && (
            <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
              {t.search.super}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="text-dark group-hover:text-primary-600 text-lg font-bold transition-colors">
            {ad.title}
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1.5 text-gray-500">
               {/* Clock Icon (inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
            </div>
            <div className="text-primary-dark text-lg font-bold">
              {ad.kd} {t.search.currency}
            </div>
          </div>
          <p className="mt-3 line-clamp-2 text-base text-gray-600">
            {ad.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
