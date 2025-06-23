import React, { useEffect, useState, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FiClock, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { LuChevronDown } from "react-icons/lu";

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
];
const transactionTypes = [
  { id: "rent", name: { en: "Rent", ar: "ايجار" } },
  { id: "sale", name: { en: "Sale", ar: "بيع" } },
  { id: "exchange", name: { en: "Exchange", ar: "بدل" } },
];

/**
 * Main SearchResults Page Component
 */
const SearchResults = () => {
  const { t, isRTL, language } = useLanguage();
  const location = useLocation();
  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters are derived directly from the URL search params
  const filters = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      transactionType: params.get("transactionType") || "sale",
      regions: params.getAll("regions"),
      propertyTypes: params.getAll("propertyTypes"),
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
      const transactionMatch =
        !filters.transactionType ||
        ad.transactionType === filters.transactionType;
      const regionMatch =
        filters.regions.length === 0 || filters.regions.includes(ad.region);
      const propertyTypeMatch =
        filters.propertyTypes.length === 0 ||
        filters.propertyTypes.includes(ad.propertyType);
      return transactionMatch && regionMatch && propertyTypeMatch;
    });
  }, [allAds, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`container mx-auto px-4 py-6`}
        dir={isRTL ? "rtl" : "ltr"}
      >
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

  // States for each filter control, initialized from URL params
  const [transactionType, setTransactionType] = useState(
    initialFilters.transactionType,
  );
  const [selectedRegions, setSelectedRegions] = useState(
    allRegions
      .filter((r) => initialFilters.regions.includes(r.id))
      .map((r) => ({ ...r, name: r.name[isRTL ? "ar" : "en"] })), // FIX: Ensure name is a string here
  );
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(
    allPropertyTypes
      .filter((p) => initialFilters.propertyTypes.includes(p.id))
      .map((p) => ({ ...p, name: p.name[isRTL ? "ar" : "en"] })), // FIX: Ensure name is a string here
  );

  // This effect synchronizes the URL with the local state of the filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (transactionType) {
      params.set("transactionType", transactionType);
    }
    selectedRegions.forEach((region) => {
      if (region.id !== "all") {
        params.append("regions", region.id);
      }
    });
    selectedPropertyTypes.forEach((type) => {
      params.append("propertyTypes", type.id);
    });

    // Using replace to avoid bloating browser history on every filter change
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [transactionType, selectedRegions, selectedPropertyTypes, navigate]);

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-4 shadow-lg sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MultiSelectDropdown
          options={allRegions.map((region) => ({
            ...region,
            name: region.name[isRTL ? "ar" : "en"],
          }))}
          selectedItems={selectedRegions}
          setSelectedItems={setSelectedRegions}
          placeholder={t.search.typeAreaPlaceholder}
          searchPlaceholder={t.search.searchPlaceholder}
          isRTL={isRTL}
        />
        <MultiSelectDropdown
          options={allPropertyTypes.map((type) => ({
            ...type,
            name: type.name[isRTL ? "ar" : "en"],
          }))}
          selectedItems={selectedPropertyTypes}
          setSelectedItems={setSelectedPropertyTypes}
          placeholder={t.search.propertyTypePlaceholder}
          searchPlaceholder={t.search.searchPlaceholder}
          isRTL={isRTL}
        />
      </div>
      <div className="border-primary-400 flex justify-center gap-1 overflow-hidden rounded-full border bg-white p-1">
        {transactionTypes.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${transactionType === option.id ? "bg-primary-400 text-white" : "text-primary-400 hover:bg-primary-50 bg-transparent"}`}
            onClick={() => setTransactionType(option.id)}
          >
            {option.name[isRTL ? "ar" : "en"]}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * A reusable multi-select dropdown component, adapted from Hero.jsx.
 */
function MultiSelectDropdown({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  isRTL,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Custom hook for closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (item) => {
    setSelectedItems(
      (prev) =>
        prev.some((selected) => selected.id === item.id)
          ? prev.filter((selected) => selected.id !== item.id)
          : [...prev, { ...item, name: item.name }], // Ensure name is a string when added from selected options
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="focus-within:ring-primary-400 flex w-full cursor-pointer items-center rounded-full border border-gray-300 bg-white p-3 focus-within:ring-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-400">
          <BiSearch size={20} />
        </span>
        <div
          className={`flex-grow px-2 text-gray-500 ${isRTL ? "text-right" : "text-left"} flex min-h-[24px] flex-wrap gap-1`}
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => (
                <span
                  key={item.id}
                  className="flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  {item.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item);
                    }}
                    className={`${isRTL ? "mr-1" : "ml-1"} hover:text-red-500`}
                  >
                    <RxCross2 />
                  </button>
                </span>
              ))
            : placeholder}
        </div>
        <span
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <LuChevronDown size={20} />
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="border-b p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`w-full rounded-lg border border-gray-300 p-2 ${isRTL ? "text-right" : "text-left"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`hover:bg-primary-50 flex cursor-pointer items-center justify-between rounded-md p-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  onClick={() => toggleItem(option)}
                >
                  <div
                    className={`flex items-center ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedItems.some(
                        (item) => item.id === option.id,
                      )}
                      className="form-checkbox text-primary-400 h-4 w-4 cursor-pointer rounded"
                    />
                    <span
                      className={`text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}
                    >
                      {option.name}
                    </span>
                  </div>
                  {option.count && (
                    <span className="text-sm text-gray-500">
                      ({option.count})
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">
                {t.search.noResults}
              </li>
            )}
          </ul>
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
      if (minutes < 1) return lang === "ar" ? "الآن" : "just now";
      return `${minutes} ${lang === "ar" ? "دقيقة" : "minutes"}`;
    }
    return `${hours} ${lang === "ar" ? "ساعة" : "hours"}`;
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
            <div className="text-primary-dark text-lg font-bold">
              {ad.kd} {t.search.currency}
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiClock className="size-4" />
              <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
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
