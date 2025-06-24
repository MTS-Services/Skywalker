import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

const MultiSelectDropdown = ({
  options,
  selectedItems,
  setSelectedItems,
  placeholder,
  searchPlaceholder,
  label,
  isRTL,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((selected) => selected.id === item.id)
        ? prev.filter((selected) => selected.id !== item.id)
        : [...prev, item]
    );
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={`border-primary-100 focus-within:ring-primary-400 flex w-full cursor-pointer items-center rounded-3xl border bg-white p-3 focus-within:ring-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-primary-400">
          <FiSearch size={20} />
        </span>
        <div
          className={`flex-grow px-2 text-primary-900 ${
            isRTL ? 'text-right' : 'text-left'
          } flex flex-wrap gap-1`}
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => (
                <span
                  key={item.id}
                  className="flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-900"
                >
                  {item.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(item);
                    }}
                    className={`${isRTL ? 'mr-1' : 'ml-1'} hover:text-red-500`}
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))
            : placeholder}
        </div>
        <span
          className={`text-primary-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
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
      </div>

      {isOpen && (
        <div className="border-primary-200 absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`border-primary-100 w-full rounded-lg border p-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-400 ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`hover:bg-primary-50 flex cursor-pointer items-center justify-between rounded-md p-2 ${
                    isRTL ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => toggleItem(option)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      readOnly
                      checked={selectedItems.some(
                        (item) => item.id === option.id
                      )}
                      className="form-checkbox text-primary-400 h-4 w-4 cursor-pointer rounded"
                    />
                    <span
                      className={`text-primary-900 ${
                        isRTL ? 'mr-2' : 'ml-2'
                      }`}
                    >
                      {option.name}
                    </span>
                  </div>
                  {option.count && (
                    <span className="text-sm text-primary-900">
                      ({option.count})
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-center text-primary-900">
                {searchPlaceholder}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;