import { useState, useRef, useEffect } from "react";
import { LuChevronDown, LuSearch, LuX } from "react-icons/lu";

/**
 * Reusable MultiSelectDropdown Component
 */
export const MultiSelectDropdown = ({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  label,
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
    document.addEventListener("mousedown", handleClickOutside);
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
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <div
        className={`focus-within:ring-primary-400 border-primary-100 flex w-full cursor-pointer items-center rounded-3xl border bg-white p-3 focus-within:ring-1 ${isOpen ? "ring-primary-400 ring-1" : ""}`}
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
        <span className="text-primary-400">
          <LuSearch />
        </span>
        <div
          className={`text-primary-900 flex-grow px-2 ${isRTL ? "text-right" : "text-left"} flex min-h-[24px] flex-wrap gap-1`}
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => (
                <span
                  key={item.id}
                  className="bg-primary-50 text-primary-900 flex items-center rounded-full px-2 py-1 text-xs font-medium"
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
        <span
          className={`text-primary-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        <div className="border-primary-200 absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`border-primary-100 focus:ring-primary-400 w-full rounded-lg border p-2 focus:ring-1 focus:outline-none ${isRTL ? "text-right" : "text-left"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`hover:bg-primary-50 flex cursor-pointer items-center justify-between rounded-md p-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(option);
                  }}
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
                      className={`text-primary-900 ${isRTL ? "mr-2" : "ml-2"}`}
                    >
                      {option.name}
                    </span>
                  </div>
                  {option.count && (
                    <span className="text-primary-900 text-sm">
                      ({option.count})
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="text-primary-900 p-2 text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

/**
 * Reusable SingleSelectDropdown Component
 */
export const SingleSelectDropdown = ({
  options,
  selectedValue,
  setSelectedValue,
  placeholder,
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
    document.addEventListener("mousedown", handleClickOutside);
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
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`border-primary-200 text-primary-900 hover:bg-primary-50/60 flex items-center justify-between gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors ${isOpen ? "ring-primary-400 ring-1" : ""}`}
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
        <div
          className={`border-primary-200 absolute z-20 mt-2 max-h-60 w-fit min-w-44 overflow-y-auto rounded-lg border bg-white shadow-lg ${isRTL ? "left-0" : "right-0"}`}
        >
          {hasSearch && (
            <div className="border-primary-100 border-b p-2">
              <input
                type="text"
                placeholder={searchPlaceholder || "Search..."}
                className={`border-primary-100 focus:border-primary-400 focus:ring-primary-400 w-full rounded-lg border p-2 text-sm ${isRTL ? "text-right" : "text-left"}`}
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
                  className={`hover:bg-primary-50 flex cursor-pointer items-center rounded-md p-2 text-gray-800 ${isRTL ? "flex-row-reverse" : ""}`}
                  onClick={() => handleSelect(option.id)}
                >
                  <input
                    type="radio"
                    readOnly
                    checked={selectedValue === option.id}
                    className="text-primary-400 h-4 w-4 cursor-pointer"
                  />
                  <span className={`${isRTL ? "mr-2" : "ml-2"}`}>
                    {option.name}
                  </span>
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-gray-500">
                {searchPlaceholder || "No results"}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
