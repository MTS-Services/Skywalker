import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FiAlignLeft } from "react-icons/fi";
import { LuChevronDown, LuSearch, LuX } from "react-icons/lu";
import { FaArrowLeft, FaBars, FaPlusCircle } from "react-icons/fa";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import SideBar from "./SideBar";
import FabController from "../pages/fab/FabController";

// +++ ADDED: A hook to detect screen size for responsive logic +++
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set the initial state
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    // Update state on window resize
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

const HorizontalScroller = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkArrows = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isScrollable = container.scrollWidth > container.clientWidth;
      const hasScrolledToRight =
        container.scrollLeft <
        container.scrollWidth - container.clientWidth - 1;
      const hasScrolledToLeft = container.scrollLeft > 0;

      setShowLeftArrow(isScrollable && hasScrolledToLeft);
      setShowRightArrow(isScrollable && hasScrolledToRight);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    checkArrows();
    window.addEventListener("resize", checkArrows);
    container.addEventListener("scroll", checkArrows);

    return () => {
      window.removeEventListener("resize", checkArrows);
      container.removeEventListener("scroll", checkArrows);
    };
  }, [checkArrows, children]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => scroll("left")}
        className={`absolute top-0 bottom-0 -left-2 z-10 flex items-center bg-gradient-to-r from-white via-white/80 to-transparent pr-4 transition-opacity duration-300 ${
          showLeftArrow ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
          <GoChevronLeft className="h-5 w-5 text-gray-600" />
        </div>
      </button>

      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        className={`absolute top-0 -right-2 bottom-0 z-10 flex items-center bg-gradient-to-l from-white via-white/80 to-transparent pl-4 transition-opacity duration-300 ${
          showRightArrow ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
          <GoChevronRight className="h-5 w-5 text-gray-600" />
        </div>
      </button>
    </div>
  );
};

// ================== FIXED DesktopRegionFilter COMPONENT ==================
const DesktopRegionFilter = ({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  isRTL,
  t,
  isOpen,
  onToggle,
  isDesktopView, // <-- Receive the viewport status
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle();
      }
    };

    // This is the crucial fix: Only listen for outside clicks when the dropdown
    // is open AND we are on a desktop screen. This prevents it from interfering
    // with the mobile modal.
    if (isOpen && isDesktopView) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle, isDesktopView]); // <-- Add isDesktopView to dependencies

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, { ...item }],
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <div
        className={`flex cursor-pointer items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-black transition-colors focus-within:outline-gray-300 hover:bg-[#e8f0f7] ${isOpen ? "ring-1 ring-gray-200" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span className="text-gray-400">
          <LuSearch />
        </span>
        <div
          className={`flex-grow px-2 text-black ${isRTL ? "text-right" : "text-left"} flex min-h-[24px] flex-wrap gap-1`}
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => (
                <span
                  key={item.id}
                  className="bg-primary-300/20 flex items-center rounded-md px-2 py-1 text-xs font-medium text-black"
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
                    <LuX />
                  </button>
                </span>
              ))
            : placeholder}
        </div>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <LuChevronDown />
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-gray-300 focus:outline-none ${isRTL ? "text-right" : "text-left"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`hover:bg-primary-300/20 my-0.5 flex cursor-pointer items-center justify-between rounded-md p-2 ${
                    selectedItems.some((item) => item.id === option.id)
                      ? "bg-primary-300/20"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(option);
                    onToggle();
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      readOnly
                      checked={selectedItems.some(
                        (item) => item.id === option.id,
                      )}
                      className="form-radio h-4 w-4 cursor-pointer rounded"
                    />
                    <span className="ltr:ml-2 rtl:mr-2">{option.name}</span>
                  </div>

                  {option.count && (
                    <span className="text-sm text-black">({option.count})</span>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-black">
                {t.search.noResultsFound}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const MobileRegionFilter = ({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isRTL, t } = useLanguage();

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, { ...item }],
    );
  };

  const handleItemSelectAndClose = (item) => {
    toggleItem(item);
    onToggle();
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div onClick={onToggle} className="cursor-pointer">
        <div className="flex min-h-[24px] flex-wrap items-center gap-2">
          {selectedItems.length > 0 ? (
            selectedItems.map((item) => (
              <span
                key={item.id}
                className="bg-primary-300/20 flex items-center rounded-md px-2 py-1 text-xs font-medium text-black"
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
                  <LuX />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex h-full max-h-full w-full flex-col gap-2">
            {selectedItems.length > 0 && (
              <div className="shrink-0 px-4 pt-4">
                <div className="flex flex-wrap gap-2 rounded-md border border-gray-200 p-2">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="bg-primary-300/20 flex items-center rounded-md px-2 py-1 text-xs font-medium text-black"
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
                        <LuX />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="shrink-0 p-4">
              <div
                className={`border-primary-600 focus-within:ring-primary-300 relative flex w-full items-center rounded-md border p-2 focus-within:ring-1 focus-within:outline-none ${
                  isRTL ? "pr-14" : "pl-14"
                }`}
              >
                <span
                  onClick={onToggle}
                  className={`text-primary-600 absolute inset-y-0 flex cursor-pointer items-center text-2xl ${
                    isRTL ? "right-3" : "left-3"
                  }`}
                >
                  <FaArrowLeft />
                </span>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className={`w-full border-none bg-transparent focus-within:outline-none ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            </div>

            <ul className="flex-grow overflow-y-auto px-4 pb-4">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    className={`hover:bg-primary-300/20 my-0.5 flex cursor-pointer items-center justify-between rounded-md p-2 ${
                      selectedItems.some((item) => item.id === option.id)
                        ? "bg-primary-300/20"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(option);
                      onToggle();
                    }}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        readOnly
                        checked={selectedItems.some(
                          (item) => item.id === option.id,
                        )}
                        className="form-radio h-4 w-4 cursor-pointer rounded"
                      />
                      <span className="ltr:ml-2 rtl:mr-2">{option.name}</span>
                    </div>

                    {option.count && (
                      <span className="text-sm text-black">
                        ({option.count})
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <li className="p-2 text-center text-black">
                  {t.search.noResultsFound}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

const CategoryFilter = ({
  options,
  selectedValue,
  setSelectedValue,
  label,
  isRTL,
  isOpen,
  onToggle,
  hasSearch = false,
  searchPlaceholder,
}) => {
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle();
        }
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setSearchTerm("");
    onToggle();
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        className={`flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition-colors focus-within:outline-gray-300 hover:bg-[#e8f0f7] ${isOpen ? "!bg-primary-400 text-white" : ""}`}
        onClick={onToggle}
      >
        <span>{label}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <LuChevronDown size={16} />
        </span>
      </button>

      {isOpen && (
        <>
          <div className={`fixed inset-0 z-10`}>
            <div className="relative h-full w-full px-4">
              <div
                className="absolute inset-0 z-[11] bg-black opacity-10"
                onClick={onToggle}
              ></div>
              <div className="mx-auto max-w-3xl">
                <div className="relative start-0 top-[120px] z-[12] mt-2 w-fit min-w-40 rounded-md border border-gray-300 bg-white p-2 shadow-lg lg:-mt-2">
                  {hasSearch && (
                    <div className="border-b border-gray-300 p-2">
                      <input
                        type="text"
                        placeholder={searchPlaceholder || "Search..."}
                        className={`focus:border-primary-400 focus:ring-primary-400 w-full rounded-md border border-gray-300 p-2 text-sm ${isRTL ? "text-right" : "text-left"}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  )}
                  <ul className="p-1">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option) => (
                        <li
                          key={option.id}
                          className={`hover:bg-primary-300/20 my-0.5 flex cursor-pointer items-center rounded-md p-2 text-gray-800 ${selectedValue === option.id ? "bg-primary-300/20" : ""}`}
                          onClick={() => handleSelect(option.id)}
                        >
                          <span className="w-full">{option.name}</span>
                        </li>
                      ))
                    ) : (
                      <li className="p-2 text-center text-gray-500">
                        {searchPlaceholder || "No results"}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const PropertyDropdown = ({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  isRTL,
  isOpen,
  onToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle();
        }
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, { ...item }],
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-full sm:w-auto">
      <div
        className={`flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition-colors focus-within:outline-gray-300 hover:bg-[#e8f0f7] ${isOpen ? "!bg-primary-400 text-white" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span>{placeholder}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <LuChevronDown />
        </span>
      </div>

      {isOpen && (
        <>
          <div className={`fixed inset-0 z-10`}>
            <div className="relative h-full w-full px-4">
              <div
                className="absolute inset-0 z-[11] bg-black opacity-10"
                onClick={onToggle}
              ></div>

              {/* code by shakil monsi   */}
              <div className="relative top-[120px] z-[12] mx-auto mt-2 rounded-md border border-gray-200 bg-white p-2 shadow-lg lg:-mt-2 lg:max-w-lg">
                {/* 🔍 Search Box */}
                <div className="p-2">
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className={`w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:ring-gray-300 focus:outline-none ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* 🔽 Filtered Options */}
                <ul className="max-h-60 overflow-y-auto p-1">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <li
                        key={option.id}
                        // This className with `flex` and `justify-between` is perfect for this layout.
                        className={`hover:bg-primary-300/20 my-0.5 flex cursor-pointer items-center justify-between rounded-md p-2 ${
                          selectedItems.some((item) => item.id === option.id)
                            ? "bg-primary-300/20"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(option);
                          onToggle();
                        }}
                      >
                        <span className="ltr:text-left rtl:text-right">
                          {option.name}
                        </span>

                        {option.count && (
                          <span className="text-sm text-black">
                            ({option.count})
                          </span>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-center text-black">
                      No results found
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) onToggle();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const handleMinChange = (e) =>
    setMinPrice(e.target.value === "" ? "" : Number.parseInt(e.target.value));
  const handleMaxChange = (e) =>
    setMaxPrice(e.target.value === "" ? "" : Number.parseInt(e.target.value));
  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    onApply();
  };
  const handleSearch = () => onApply();

  const MAX_POSSIBLE_PRICE = 3000000;
  const MIN_POSSIBLE_PRICE = 0;

  return (
    <div className="xs:w-auto relative w-full">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition-colors focus-within:outline-gray-300 hover:bg-[#e8f0f7] ${isOpen ? "!bg-primary-400 text-white" : ""}`}
      >
        <span>{t.search.price}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <LuChevronDown />
        </span>
      </button>
      {isOpen && (
        <>
          <div className={`fixed inset-0 z-10`}>
            <div className="relative h-full w-full px-4">
              <div
                className="absolute inset-0 z-[11] bg-black opacity-10"
                onClick={onToggle}
              ></div>
              <div
                className={`relative top-[120px] z-[12] mx-auto mt-2 max-w-xs rounded-md border border-gray-200 bg-white p-4 shadow-lg lg:-mt-2 ${isRTL ? "left-0" : "right-0"}`}
                style={{ minWidth: "300px" }}
              >
                <div className="mb-4 flex items-center justify-between text-sm font-medium text-black">
                  <span>
                    {minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice}{" "}
                    {t.search.currency}
                  </span>
                  <span>
                    {maxPrice === ""
                      ? `${MAX_POSSIBLE_PRICE}+`
                      : `${maxPrice}+`}{" "}
                    {t.search.currency}
                  </span>
                </div>
                <input
                  type="range"
                  min={MIN_POSSIBLE_PRICE}
                  max={MAX_POSSIBLE_PRICE}
                  value={minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice}
                  onChange={handleMinChange}
                  className="bg-primary-100/80 range-lg h-2 w-full cursor-pointer appearance-none rounded-md"
                />
                <input
                  type="range"
                  min={MIN_POSSIBLE_PRICE}
                  max={MAX_POSSIBLE_PRICE}
                  value={maxPrice === "" ? MAX_POSSIBLE_PRICE : maxPrice}
                  onChange={handleMaxChange}
                  className="bg-primary-100/80 range-lg mt-2 h-2 w-full cursor-pointer appearance-none rounded-md"
                />
                <div className="mt-4 flex gap-2">
                  <input
                    type="number"
                    placeholder={t.search.minPrice}
                    value={minPrice}
                    onChange={handleMinChange}
                    className={`focus-within:ring-primary-100 w-1/2 rounded-md border border-gray-200 p-2 text-sm focus-within:ring-1 focus-within:outline-none ${isRTL ? "text-right" : "text-left"}`}
                  />
                  <input
                    type="number"
                    placeholder={t.search.maxPrice}
                    value={maxPrice}
                    onChange={handleMaxChange}
                    className={`focus-within:ring-primary-100 w-1/2 rounded-md border border-gray-200 p-2 text-sm focus-within:ring-1 focus-within:outline-none ${isRTL ? "text-right" : "text-left"}`}
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={handleReset}
                    className="hover:bg-primary-100 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black"
                  >
                    {t.search.reset}
                  </button>
                  <button
                    onClick={handleSearch}
                    className="bg-primary-400 hover:bg-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white"
                  >
                    {t.search.search}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) onToggle();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  const handleReset = () => {
    setSearchTerm("");
    onApply();
  };
  const handleSearch = () => onApply();

  return (
    <div className="xs:w-auto relative w-full">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-black transition-colors focus-within:outline-gray-300 hover:bg-[#e8f0f7] ${isOpen ? "!bg-primary-400 text-white" : ""}`}
      >
        <span>{t.search.text}</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <LuChevronDown />
        </span>
      </button>
      {isOpen && (
        <>
          <div className={`fixed inset-0`}>
            <div className="relative h-full w-full px-4">
              <div
                className="absolute inset-0 bg-black opacity-10"
                onClick={onToggle}
              ></div>
              <div
                className={`relative top-[120px] z-[12] mx-auto mt-2 max-w-sm rounded-md border border-gray-200 bg-white p-4 shadow-lg lg:-mt-2 ${isRTL ? "left-0" : "right-0"}`}
                style={{ minWidth: "300px" }}
              >
                <p className="mb-2 text-sm text-black">
                  {t.search.searchUsingTextExample}
                </p>
                <div className="relative">
                  <span
                    className={`absolute inset-y-0 flex items-center ${isRTL ? "right-3" : "left-3"} text-gray-400`}
                  >
                    <LuSearch />
                  </span>
                  <input
                    type="text"
                    placeholder={t.search.searchByText}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full rounded-md border border-gray-200 p-2 text-sm focus-within:ring-1 focus-within:ring-gray-100 focus-within:outline-none ${isRTL ? "pr-10 text-right" : "pl-10 text-left"} text-sm`}
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={handleReset}
                    className="hover:bg-primary-600 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:text-white"
                  >
                    {t.search.reset}
                  </button>
                  <button
                    onClick={handleSearch}
                    className="bg-primary-500 hover:bg-primary-600 rounded-md px-4 py-2 text-sm font-medium text-white"
                  >
                    {t.search.search}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const SearchFilterBar = ({
  initialFilters,
  t,
  isRTL,
  children,
  isDesktopView,
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(null);

  const [allRegions, setAllRegions] = useState([]);
  const [allPropertyTypes, setAllPropertyTypes] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactionType, setTransactionType] = useState(
    initialFilters.transactionType,
  );
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [searchText, setSearchText] = useState(initialFilters.searchText);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [regionsRes, propertyTypesRes, transactionTypesRes] =
          await Promise.all([
            fetch("/regions.json"),
            fetch("/propertyTypes.json"),
            fetch("/transactionTypes.json"),
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

  useEffect(() => {
    if (allRegions.length > 0) {
      const initialSelected = allRegions.filter((r) =>
        initialFilters.regions.includes(r.id),
      );
      setSelectedRegions(initialSelected);
    }
    if (allPropertyTypes.length > 0) {
      const initialSelected = allPropertyTypes.filter((p) =>
        initialFilters.propertyTypes.includes(p.id),
      );
      setSelectedPropertyTypes(initialSelected);
    }
  }, [
    allRegions,
    allPropertyTypes,
    initialFilters.regions,
    initialFilters.propertyTypes,
  ]);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (transactionType) params.set("transactionType", transactionType);
    selectedRegions.forEach((region) => params.append("region", region.id));
    selectedPropertyTypes.forEach((type) =>
      params.append("propertyType", type.id),
    );
    if (minPrice !== "" && minPrice !== undefined)
      params.set("minPrice", minPrice.toString());
    if (maxPrice !== "" && maxPrice !== undefined)
      params.set("maxPrice", maxPrice.toString());
    if (searchText) params.set("searchText", searchText);
    navigate(`/search?${params.toString()}`, { replace: true });
  }, [
    transactionType,
    selectedRegions,
    selectedPropertyTypes,
    minPrice,
    maxPrice,
    searchText,
    navigate,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => updateURL(), 300);
    return () => clearTimeout(handler);
  }, [
    selectedRegions,
    selectedPropertyTypes,
    transactionType,
    minPrice,
    maxPrice,
    searchText,
    updateURL,
  ]);

  const toggleDropdown = useCallback((dropdownName) => {
    setShowDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  }, []);

  const filterProps = {
    allRegions,
    selectedRegions,
    setSelectedRegions,
    allPropertyTypes,
    selectedPropertyTypes,
    setSelectedPropertyTypes,
    transactionTypes,
    transactionType,
    setTransactionType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    searchText,
    setSearchText,
    t,
    isRTL,
    showDropdown,
    toggleDropdown,
    onApply: () => setShowDropdown(null),
    isDesktopView, // <-- Pass down the viewport status
  };

  return children(filterProps);
};

export default function SearchPageHeader() {
  const { isRTL, t, FloatingActionButton } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isDesktopView = useMediaQuery("(min-width: 1280px)");

  const isMobile = window.innerWidth <= 768;

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
      <nav
        className="border-b border-gray-200 bg-white px-4 py-6 shadow-sm"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <SearchFilterBar
          initialFilters={initialFilters}
          t={t}
          isRTL={isRTL}
          isDesktopView={isDesktopView}
        >
          {(props) => (
            <div className="mx-auto max-w-7xl">
              <div className="hidden items-center justify-start gap-5 xl:flex">
                <div className="flex items-center gap-10">
                  <button
                    onClick={toggleSidebar}
                    className="text-2xl text-[#556885]"
                  >
                    <FaBars />
                  </button>
                  <NavLink
                    to="/"
                    className={`flex items-center justify-start gap-2`}
                  >
                    <img src="/logo.png" alt="Logo" className="w-14" />
                    <div>
                      <p className="text-lg font-bold capitalize">
                        {t.site.name}
                      </p>
                      <p className="bg-primary-300 mx-auto w-fit rounded-md px-2 py-1 text-[8px] leading-normal text-white">
                        {t.site.tagline}
                      </p>
                    </div>
                  </NavLink>
                </div>
                <div className="w-full max-w-3xl space-y-2">
                  <DesktopRegionFilter
                    options={props.allRegions}
                    selectedItems={props.selectedRegions}
                    setSelectedItems={props.setSelectedRegions}
                    placeholder={t.search.areaPlaceholder}
                    searchPlaceholder={t.search.searchPlaceholder}
                    label={t.search.area}
                    isRTL={props.isRTL}
                    t={props.t}
                    isOpen={props.showDropdown === "area"}
                    onToggle={() => props.toggleDropdown("area")}
                    isDesktopView={props.isDesktopView} // <-- Pass prop
                  />
                  <div className="flex flex-wrap items-center justify-start gap-2">
                    <CategoryFilter
                      options={props.transactionTypes}
                      selectedValue={props.transactionType}
                      setSelectedValue={props.setTransactionType}
                      placeholder={t.search.transactionTypePlaceholder}
                      label={t.search.transactionType}
                      isRTL={props.isRTL}
                      t={props.t}
                      isOpen={props.showDropdown === "transactionType"}
                      onToggle={() => props.toggleDropdown("transactionType")}
                    />
                    <PropertyDropdown
                      options={props.allPropertyTypes}
                      selectedItems={props.selectedPropertyTypes}
                      setSelectedItems={props.setSelectedPropertyTypes}
                      placeholder={t.search.propertyTypePlaceholder}
                      searchPlaceholder={t.search.searchPlaceholder}
                      label={t.search.propertyType}
                      isRTL={props.isRTL}
                      t={props.t}
                      isOpen={props.showDropdown === "propertyTypes"}
                      onToggle={() => props.toggleDropdown("propertyTypes")}
                    />
                    <PriceRangeFilter
                      minPrice={props.minPrice}
                      maxPrice={props.maxPrice}
                      setMinPrice={props.setMinPrice}
                      setMaxPrice={props.setMaxPrice}
                      t={props.t}
                      isRTL={props.isRTL}
                      isOpen={props.showDropdown === "price"}
                      onToggle={() => props.toggleDropdown("price")}
                      onApply={props.onApply}
                    />
                    <TextSearchFilter
                      searchTerm={props.searchText}
                      setSearchTerm={props.setSearchText}
                      t={props.t}
                      isRTL={props.isRTL}
                      isOpen={props.showDropdown === "text"}
                      onToggle={() => props.toggleDropdown("text")}
                      onApply={props.onApply}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 xl:hidden">
                <div className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
                  <button onClick={toggleSidebar} className="text-2xl">
                    <FiAlignLeft />
                  </button>
                  <div className="relative flex-grow">
                    <MobileRegionFilter
                      options={props.allRegions}
                      selectedItems={props.selectedRegions}
                      setSelectedItems={props.setSelectedRegions}
                      placeholder={t.search.areaPlaceholder}
                      searchPlaceholder={t.search.searchPlaceholder}
                      label={t.search.area}
                      isOpen={props.showDropdown === "area"}
                      onToggle={() => props.toggleDropdown("area")}
                    />
                  </div>
                  <Link
                    to="/"
                    className="max-h-9 min-h-9 max-w-9 min-w-9 rounded-md"
                  >
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>

                <HorizontalScroller>
                  <CategoryFilter
                    options={props.transactionTypes}
                    selectedValue={props.transactionType}
                    setSelectedValue={props.setTransactionType}
                    placeholder={t.search.transactionTypePlaceholder}
                    label={t.search.transactionType}
                    isRTL={props.isRTL}
                    isOpen={props.showDropdown === "transactionType"}
                    onToggle={() => props.toggleDropdown("transactionType")}
                  />
                  <PropertyDropdown
                    options={props.allPropertyTypes}
                    selectedItems={props.selectedPropertyTypes}
                    setSelectedItems={props.setSelectedPropertyTypes}
                    placeholder={t.search.propertyTypePlaceholder}
                    searchPlaceholder={t.search.searchPlaceholder}
                    label={t.search.propertyType}
                    isRTL={props.isRTL}
                    isOpen={props.showDropdown === "propertyTypes"}
                    onToggle={() => props.toggleDropdown("propertyTypes")}
                  />
                  <PriceRangeFilter
                    minPrice={props.minPrice}
                    maxPrice={props.maxPrice}
                    setMinPrice={props.setMinPrice}
                    setMaxPrice={props.setMaxPrice}
                    t={props.t}
                    isRTL={props.isRTL}
                    isOpen={props.showDropdown === "price"}
                    onToggle={() => props.toggleDropdown("price")}
                    onApply={props.onApply}
                  />
                  <TextSearchFilter
                    searchTerm={props.searchText}
                    setSearchTerm={props.setSearchText}
                    t={props.t}
                    isRTL={props.isRTL}
                    isOpen={props.showDropdown === "text"}
                    onToggle={() => props.toggleDropdown("text")}
                    onApply={props.onApply}
                  />
                </HorizontalScroller>
              </div>
            </div>
          )}
        </SearchFilterBar>
      </nav>
      {isMobile && !FloatingActionButton && !sidebarOpen && <FabController />}
      {<SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
    </>
  );
}
