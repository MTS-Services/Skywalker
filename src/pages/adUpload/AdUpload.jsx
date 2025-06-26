// src/components/AdUploadForm.js

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdFileUpload } from "react-icons/md";
import { FiSearch, FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import ButtonSubmit from "../../common/button/ButtonSubmit";
import { useLanguage } from "../../context/LanguageContext";

// --- Helper Component: MultiSelectDropdown (Final RTL and Color Fix) ---
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
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* CHANGED: This container now correctly reverses for RTL */}
      <div
        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white p-2 rtl:flex-row-reverse"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* CHANGED: Applied global color */}
        <FiSearch className="flex-shrink-0 text-[var(--color-primary-500)]" />

        {/* This div now handles the growing text/pills area */}
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
                        e.stopPropagation();
                        toggleOption(value);
                      }}
                    />
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* CHANGED: Applied global color */}
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

// --- Main Component: AdUploadForm (No changes needed here from last time) ---
const AdUploadForm = () => {
  const { t, isRTL } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState({
    purposes: [],
    propertyTypes: [],
    areas: [],
  });
  const [formData, setFormData] = useState({
    purposes: [],
    propertyTypes: [],
    description: "",
    regions: [],
    price: "",
    images: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [purposesRes, propTypesRes, areasRes] = await Promise.all([
          axios.get("/data/transactionTypes.json"),
          axios.get("/data/propertyTypes.json"),
          axios.get("/data/regions.json"),
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

  const handleMultiSelectChange = (fieldName, selectedId) => {
    setFormData((prev) => {
      const currentSelection = prev[fieldName];
      const newSelection = currentSelection.includes(selectedId)
        ? currentSelection.filter((id) => id !== selectedId)
        : [...currentSelection, selectedId];
      return { ...prev, [fieldName]: newSelection };
    });
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

  if (isLoading) {
    return <div className="p-10 text-center">{t.adUploadForm.loading}</div>;
  }

  return (
    <div className="mx-auto mt-16 h-screen max-w-4xl p-4 sm:p-6 md:p-8">
      <form className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="font-open-sans mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.purposeLabel}
          </label>
          <MultiSelectDropdown
            options={options.purposes}
            selectedValues={formData.purposes}
            onChange={(id) => handleMultiSelectChange("purposes", id)}
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
          <MultiSelectDropdown
            options={options.propertyTypes}
            selectedValues={formData.propertyTypes}
            onChange={(id) => handleMultiSelectChange("propertyTypes", id)}
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
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
            placeholder={t.adUploadForm.descriptionPlaceholder}
            rows={4}
          />
        </div>

        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t.adUploadForm.areaLabel}
          </label>
          <MultiSelectDropdown
            options={options.areas}
            selectedValues={formData.regions}
            onChange={(id) => handleMultiSelectChange("regions", id)}
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
            className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
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
