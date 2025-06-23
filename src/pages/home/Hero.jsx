import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "../../assets/images/home-hero-banner.svg";
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { LuChevronDown } from "react-icons/lu";

// Data sources for filters
const regionsData = [
  { id: "all", name: { en: "All Region", ar: "كل المناطق" }, count: 2134 },
  {
    id: "hawally",
    name: { en: "Hawally Governorate", ar: "محافظة حولي" },
    count: 726,
  },
  { id: "salmiya", name: { en: "Salmiya", ar: "السالمية" }, count: 104 },
  { id: "salwa", name: { en: "Salwa", ar: "سلوى" }, count: 90 },
  { id: "jabriya", name: { en: "Jabriya", ar: "الجابرية" }, count: 81 },
];

const propertyTypeData = [
  { id: "apartment", name: { en: "Apartment", ar: "شقة" } },
  { id: "house", name: { en: "House", ar: "منزل" } },
  { id: "land", name: { en: "Land", ar: "أرض" } },
  { id: "building", name: { en: "Building", ar: "مبنى" } },
];

const mainOptions = [
  { id: "rent", name: { en: "Rent", ar: "ايجار" } },
  { id: "sale", name: { en: "Sale", ar: "بيع" } },
  { id: "exchange", name: { en: "Exchange", ar: "بدل" } },
];

/**
 * Hero Component: Displays the main hero section with a background and search filters.
 */
export default function Hero({ t, isRTL }) {
  return (
    <section className="relative flex min-h-[calc(100vh-150px)] items-center justify-center overflow-hidden bg-gray-50 md:min-h-[calc(100vh-200px)]">
      <div className="absolute right-0 bottom-0 left-0 flex w-full justify-center">
        <img
          alt="Cityscape background"
          width="1920"
          height="426"
          className="h-auto w-full max-w-screen-2xl object-cover"
          src={BannerImage}
        />
      </div>
      <div className="relative z-10 container mx-auto flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-4xl">
            {t.home.bannerTitle}
          </h2>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            {t.home.bannerSubTitle}
          </p>
          <div className="w-full max-w-md rounded-2xl bg-white/70 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <FilterComponent t={t} isRTL={isRTL} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * FilterComponent: Renders the search controls and handles search submission.
 */
function FilterComponent({ t, isRTL }) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(
    mainOptions[0]?.id || "",
  );
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);

  /**
   * Handles the form submission to perform a search.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedOption) {
      params.append("transactionType", selectedOption);
    }
    selectedRegions.forEach((region) => {
      if (region.id !== "all") {
        // Do not include 'all' in the query
        params.append("regions", region.id);
      }
    });
    selectedPropertyTypes.forEach((type) => {
      params.append("propertyTypes", type.id);
    });

    // Navigate to the search results page with the filter parameters
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <MultiSelectDropdown
        options={regionsData.map((region) => ({
          ...region,
          name: region.name[isRTL ? "ar" : "en"],
        }))}
        selectedItems={selectedRegions}
        setSelectedItems={setSelectedRegions}
        placeholder={t.home.typeAreaPlaceholder}
        searchPlaceholder={t.home.searchPlaceholder}
        isRTL={isRTL}
      />
      <MultiSelectDropdown
        options={propertyTypeData.map((type) => ({
          ...type,
          name: type.name[isRTL ? "ar" : "en"],
        }))}
        selectedItems={selectedPropertyTypes}
        setSelectedItems={setSelectedPropertyTypes}
        placeholder={t.home.propertyTypePlaceholder}
        searchPlaceholder={t.home.searchPlaceholder}
        isRTL={isRTL}
      />
      <div className="border-primary-400 flex justify-center gap-1 overflow-hidden rounded-full border bg-white p-1">
        {mainOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${selectedOption === option.id ? "bg-primary-400 text-white" : "text-primary-400 hover:bg-primary-50 bg-transparent"}`}
            onClick={() => setSelectedOption(option.id)}
          >
            {option.name[isRTL ? "ar" : "en"]}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-400 focus:ring-opacity-50 w-full rounded-full py-3 font-semibold text-white shadow-lg transition-colors duration-300 focus:ring-2 focus:outline-none"
      >
        {t.home.searchButton}
      </button>
    </form>
  );
}

/**
 * MultiSelectDropdown: A reusable multi-select dropdown with search.
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
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, item],
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="border-primary-100 focus-within:ring-primary-400 flex w-full cursor-pointer items-center rounded-full border bg-white p-3 focus-within:ring-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-primary-400">
          <BiSearch size={20} />
        </span>
        <div
          className={`flex-grow px-2 text-gray-500 ${isRTL ? "text-right" : "text-left"} flex flex-wrap gap-1`}
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
          className={`text-primary-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <LuChevronDown size={20} />
        </span>
      </div>
      {isOpen && (
        <div className="border-primary-200 absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`border-primary-100 w-full rounded-lg border p-2 ${isRTL ? "text-right" : "text-left"}`}
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
                  <div className="flex items-center">
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
                {t.home.noResults}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
