import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdFileUpload } from "react-icons/md";
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import ButtonSubmit from "../../common/button/ButtonSubmit";
import { useLanguage } from "../../context/LanguageContext";

const SingleSelectDropdown = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder,
  noResultsText,
  isRTL,
}) => {
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

  const handleSelectOption = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOption = options.find((o) => o.id === selectedValue);

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <div
        className="flex h-[42px] cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white p-2 rtl:flex-row-reverse"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiSearch className="flex-shrink-0 text-[var(--color-primary-500)]" />
        <div className="flex-grow rtl:text-right">
          {!selectedOption ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <span className="text-sm font-medium text-gray-800">
              {selectedOption.name}
            </span>
          )}
        </div>
        <div className="flex-shrink-0">
          {selectedOption && (
            <FiX
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={clearSelection}
            />
          )}
        </div>
        <div className="flex-shrink-0">
          {isOpen ? (
            <FiChevronUp className="text-primary-500" />
          ) : (
            <FiChevronDown className="text-primary-500" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto p-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={`flex cursor-pointer items-center rounded-md p-2 hover:bg-cyan-50 ${selectedValue === option.id ? "bg-cyan-100" : ""}`}
                  onClick={() => handleSelectOption(option.id)}
                >
                  <span className="text-gray-700 ltr:ml-3 rtl:mr-3">
                    {option.name}
                  </span>
                  {option.count && (
                    <span className="text-sm text-gray-500 ltr:ml-auto rtl:mr-auto">
                      {option.count}
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">{noResultsText}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Component: MultiSelectDropdown
const MultiSelectDropdown = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  searchPlaceholder,
  noResultsText,
  isRTL,
}) => {
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

  const toggleOption = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <div
        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white p-2 rtl:flex-row-reverse"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiSearch className="flex-shrink-0 text-[var(--color-primary-500)]" />
        <div className="flex-grow rtl:text-right">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap items-center gap-1 rtl:flex-row-reverse">
              {selectedValues.map((value) => {
                const option = options.find((o) => o.id === value);
                return (
                  <span
                    key={value}
                    className="flex items-center gap-1 rounded-md bg-cyan-100 px-2 py-1 text-sm font-medium text-cyan-800"
                  >
                    {option ? option.name : ""}
                    <FiX
                      className="cursor-pointer hover:text-cyan-600"
                      onClick={(e) => {
                        toggleOption(value);
                        e.stopPropagation();
                      }}
                    />
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {isOpen ? (
            <FiChevronUp className="text-primary-500" />
          ) : (
            <FiChevronDown className="text-primary-500" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="p-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto p-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex cursor-pointer items-center rounded-md p-2 hover:bg-cyan-50"
                  onClick={() => toggleOption(option.id)}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary-500)] focus:ring-[var(--color-primary-500)]"
                    checked={selectedValues.includes(option.id)}
                    readOnly
                  />
                  <span className="text-gray-700 ltr:ml-3 rtl:mr-3">
                    {option.name}
                  </span>
                  {option.count && (
                    <span className="text-sm text-gray-500 ltr:ml-auto rtl:mr-auto">
                      {option.count}
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">{noResultsText}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// Component: AdUploadForm
// --- Main Component: AdUploadForm ---
const AdUploadForm = () => {
  const { t, isRTL } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState({
    purposes: [],
    propertyTypes: [],
    areas: [],
  });

  // 1. UPDATED: Changed 'purposes' to hold a single value (null) instead of an array
  const [formData, setFormData] = useState({
    purposes: null, // Changed from []
    propertyTypes: null,
    description: "",
    regions: null,
    price: "",
    images: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [purposesRes, propTypesRes, areasRes] = await Promise.all([
          axios.get("/transactionTypes.json"),
          axios.get("/propertyTypes.json"),
          axios.get("/regions.json"),
        ]);
        setOptions({
          purposes: purposesRes.data || [],
          propertyTypes: propTypesRes.data || [],
          areas: areasRes.data || [],
        });
      } catch (error) {
        console.error("Failed to fetch form data:", error);
        toast.error(t.adUploadForm.dataLoadError);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // This handler is now no longer used by 'purposes' but can be kept for other potential multi-selects
  const handleMultiSelectChange = (fieldName, selectedId) => {
    setFormData((prev) => {
      const currentSelection = prev[fieldName];
      const newSelection = currentSelection.includes(selectedId)
        ? currentSelection.filter((id) => id !== selectedId)
        : [...currentSelection, selectedId];
      return { ...prev, [fieldName]: newSelection };
    });
  };

  // Handler for all single-select dropdowns
  const handleSingleSelectChange = (fieldName, selectedId) => {
    setFormData((prev) => ({ ...prev, [fieldName]: selectedId }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + formData.images.length > 12) {
      toast.error(t.adUploadForm.fileLimitError);
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success(
      t.adUploadForm.submitSuccess || "Advertisement uploaded successfully!",
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img
          src="/loading.png"
          alt={t.adUploadForm.loading || "Loading..."}
          className="h-20 w-20"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 mb-40 max-w-4xl p-4 sm:p-6 md:p-8 lg:mb-60">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">
          {t.adUploadForm.formTitle}
        </h1>
        <p className="mb-8 text-gray-600">{t.adUploadForm.formSubtitle}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2"
      >
        {/* 2. UPDATED: Switched 'Purpose' field to use SingleSelectDropdown */}
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.purposeLabel}
          </label>
          <SingleSelectDropdown
            options={options.purposes}
            selectedValue={formData.purposes}
            onChange={(id) => handleSingleSelectChange("purposes", id)}
            placeholder={t.adUploadForm.purposePlaceholder}
            searchPlaceholder={t.adUploadForm.searchPlaceholder}
            noResultsText={t.adUploadForm.noResults}
            isRTL={isRTL}
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.propertyTypeLabel}
          </label>
          <SingleSelectDropdown
            options={options.propertyTypes}
            selectedValue={formData.propertyTypes}
            onChange={(id) => handleSingleSelectChange("propertyTypes", id)}
            placeholder={t.adUploadForm.propertyTypePlaceholder}
            searchPlaceholder={t.adUploadForm.searchPlaceholder}
            noResultsText={t.adUploadForm.noResults}
            isRTL={isRTL}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.descriptionLabel}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
            placeholder={t.adUploadForm.descriptionPlaceholder}
            rows={4}
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.areaLabel}
          </label>
          <SingleSelectDropdown
            options={options.areas}
            selectedValue={formData.regions}
            onChange={(id) => handleSingleSelectChange("regions", id)}
            placeholder={t.adUploadForm.areaPlaceholder}
            searchPlaceholder={t.adUploadForm.searchPlaceholder}
            noResultsText={t.adUploadForm.noResults}
            isRTL={isRTL}
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.priceLabel}
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
            placeholder={t.adUploadForm.pricePlaceholder}
          />
        </div>

        <div className="mt-4 rounded-lg border-2 border-dashed border-[var(--color-primary-500)] p-6 text-center md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800">
            {t.adUploadForm.mediaUploadTitle}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t.adUploadForm.mediaUploadSubtitle}
          </p>
          <label
            htmlFor="file-upload"
            className="mt-4 inline-block cursor-pointer rounded-md bg-[var(--color-primary-600)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-700)]"
          >
            {t.adUploadForm.mediaSelectButton}
          </label>
          <input
            type="file"
            multiple
            id="file-upload"
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
          />
          {formData.images.length > 0 && (
            <div className="mt-4 text-sm font-medium text-gray-700">
              {formData.images.length}{" "}
              {formData.images.length === 1
                ? t.adUploadForm.fileSingular
                : t.adUploadForm.filePlural}{" "}
              {t.adUploadForm.filesSelected}
            </div>
          )}
        </div>

        <div className="mt-4 md:col-span-2">
          <ButtonSubmit
            text={
              <span className="flex items-center justify-center">
                <MdFileUpload className="mr-2 text-xl" />
                {t.adUploadForm.submitButton}
              </span>
            }
            className="!w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default AdUploadForm;
