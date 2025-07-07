import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelectDropdown } from "../../components/shared/FilterDropdown";
import ButtonSubmit from "../../common/button/ButtonSubmit";
import { useLanguage } from "../../context/LanguageContext"; // LanguageContext থেকে language ব্যবহারের জন্য
import { LuChevronDown, LuSearch, LuX } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";

export default function Hero() {
  const { t, isRTL, currentRegionData } = useLanguage();

  return (
    <section className="relative h-[84vh] w-full overflow-hidden md:h-[70vh] lg:h-[100vh]">
      <div className="absolute right-0 bottom-0 left-0 -z-1 w-full">
        <img
          alt={t.site.name}
          width="1920"
          height="426"
          className="hidden h-auto w-full object-cover lg:block"
          src="/home-hero-desktop-hd.svg"
        />
        <img
          alt={t.site.name}
          width="1920"
          height="426"
          className="max-w-screen-[200px] h-auto w-full object-cover lg:hidden"
          src="/home-hero-mobile-hd.svg"
        />
      </div>

      <div className="container mx-auto mt-6 flex h-full w-full items-start justify-center p-4 lg:mt-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <div className="px-4 sm:px-8">
            <h1 className="mb-3 text-lg font-[700] text-black md:text-xl lg:text-[26px]">
              {t.home.bannerTitle}
            </h1>
            <p className="mb-8 text-[14px] font-normal text-[#556885] md:text-[14x]">
              {t.home.bannerSubTitle}
            </p>
          </div>
          <div className="shadow-primary-900/30 w-full max-w-md rounded-2xl px-4 sm:p-6 lg:-mt-3">
            <FilterComponent
              t={t}
              isRTL={isRTL}
              regionsData={currentRegionData}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterComponent({ t, isRTL, regionsData }) {
  const navigate = useNavigate();
  // useLanguage থেকে language এবং currentTransactionTypesData আনা হয়েছে
  const { language, currentTransactionTypesData } = useLanguage();

  const [selectedOption, setSelectedOption] = useState("rent");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]); // propertyTypeData এর স্টেট
  // transactionTypes স্টেটটি সরিয়ে দেওয়া হয়েছে, কারণ এটি এখন LanguageContext থেকে আসবে।
  // const [transactionTypes, setTransactionTypes] = useState([]); // এই লাইনটি সরিয়ে দেওয়া হয়েছে

  const [showDropdown, setShowDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // propertyTypeData লোড করার জন্য useEffect
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        // ভাষার উপর ভিত্তি করে সঠিক JSON ফাইলটি লোড করা হচ্ছে
        const url =
          language === "ar"
            ? "/propertyTypesArbic.json"
            : "/propertyTypes.json";
        const response = await fetch(url);
        const data = await response.json();
        setPropertyTypeData(data);
      } catch (error) {
        console.error("Error fetching property types data:", error);
      }
    };

    fetchPropertyTypes();
  }, [language]); // language স্টেট পরিবর্তন হলে এটি আবার রান করবে

  // currentTransactionTypesData লোড হওয়ার পর selectedOption সেট করার জন্য
  useEffect(() => {
    if (currentTransactionTypesData && currentTransactionTypesData.length > 0) {
      setSelectedOption(currentTransactionTypesData[0]?.id || "rent");
    }
  }, [currentTransactionTypesData]); // currentTransactionTypesData পরিবর্তন হলে এটি রান করবে



  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const toggleModalDropdown = (dropdownName) => {
    setShowDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (selectedOption) {
      params.set("transactionType", selectedOption);
    }

    selectedRegions.forEach((region) => {
      if (region.id && region.id !== "all") {
        params.append("region", region.id);
      }
    });

    selectedPropertyTypes.forEach((type) => {
      if (type.id && type.id !== "all") {
        params.append("propertyType", type.id);
      }
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <span className="hidden text-[#556885] xl:block">
        <MultiSelectDropdown
          options={regionsData}
          selectedItems={selectedRegions}
          setSelectedItems={setSelectedRegions}
          placeholder={t.home.typeAreaPlaceholder}
          searchPlaceholder={t.home.searchPlaceholder}
          isRTL={isRTL}
          isOpen={openDropdown === "regions"}
          onToggle={() => toggleDropdown("regions")}
        />
      </span>
      <span className="xl:hidden">
        <MobileRegionFilter
          options={regionsData}
          selectedItems={selectedRegions}
          setSelectedItems={setSelectedRegions}
          placeholder={t.home.typeAreaPlaceholder}
          searchPlaceholder={t.home.searchPlaceholder}
          label={t.home.searchPlaceholder}
          isOpen={showDropdown === "search"}
          onToggle={() => toggleModalDropdown("search")}
        />
      </span>

      <MultiSelectDropdown
        options={propertyTypeData} // এখানে propertyTypeData ব্যবহার করা হয়েছে
        selectedItems={selectedPropertyTypes}
        setSelectedItems={setSelectedPropertyTypes}
        placeholder={t.home.propertyTypePlaceholder}
        searchPlaceholder={t.home.searchPlaceholder}
        isRTL={isRTL}
        isOpen={openDropdown === "propertyTypes"}
        onToggle={() => toggleDropdown("propertyTypes")}
      />

      <div className="flex justify-center gap-1 overflow-hidden rounded-full border border-gray-300 bg-white p-1">
        {/* transactionTypes এর পরিবর্তে currentTransactionTypesData ব্যবহার করা হয়েছে */}
        {currentTransactionTypesData.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300 ease-in-out ${
              selectedOption === option.id
                ? "bg-primary-500 text-white"
                : "text-primary-900 hover:bg-primary-300/20 bg-transparent"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>

      <ButtonSubmit
        text={
          <span className="flex items-center gap-2">{t.home.searchButton}</span>
        }
        className="!w-full rounded-4xl"
      />
    </form>
  );
}












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
        : [...prev, item],
    );
  };

  const handleItemSelect = (item, e) => {
    e.stopPropagation();
    toggleItem(item);
    onToggle();
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div onClick={onToggle} className="mb-5 cursor-pointer">
        <div
          className={`flex w-full cursor-pointer flex-wrap items-center gap-2 rounded-3xl border border-gray-200 bg-white p-3 px-5 focus-within:ring-1 focus-within:ring-gray-200 ${
            isOpen ? "ring-1 ring-gray-300" : ""
          }`}
        >
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
            <span className="flex items-center justify-center gap-2 text-gray-500">
              <LuSearch /> {placeholder}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-white">
          <div className="flex h-full flex-col overflow-y-auto">
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
                className={`border-primary-600 focus-within:ring-primary-300 relative flex w-full items-center rounded-md border p-2 focus-within:ring-1 ${
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
                  className="w-full rounded-lg border border-gray-300 p-2 text-left focus:outline-none"
                  dir="ltr"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    className="hover:bg-primary-300/20 my-0.5 flex cursor-pointer items-center justify-between rounded-md p-2"
                    onClick={(e) => handleItemSelect(option, e)}
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
                      <span
                        className={`px-2 ${isRTL ? "mr-2" : "ml-2"} ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        {option.name}
                      </span>
                    </div>

                    {option.count !== undefined && option.count !== null && (
                      <span className="px-4 text-sm text-gray-700">
                        ({option.count})
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <li className="p-2 text-center text-gray-800">
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
