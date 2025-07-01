import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import BannerImage from "../../assets/images/home-hero-banner.svg"
import { MultiSelectDropdown } from "../../components/shared/FilterDropdown";
import ButtonSubmit from "../../common/button/ButtonSubmit";
import { useLanguage } from "../../context/LanguageContext";
import { LuChevronDown, LuSearch, LuX } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";

/**
 * Hero Component: Displays the main hero section with a background and search filters.
 */
export default function Hero({ t, isRTL }) {
  return (
    <section className="relative md:h-[70vh] h-[84vh] w-full overflow-hidden lg:h-[100vh]">
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
            <h1 className="mb-3 text-lg text-black md:text-xl lg:text-[22px]">
              {t.home.bannerTitle}
            </h1>
            <p className="mb-8 text-[14px] font-normal text-[#556885] md:text-[14x]">
              {t.home.bannerSubTitle}
            </p>
          </div>
          <div className="shadow-primary-900/30 w-full max-w-md rounded-2xl px-4 sm:p-6 lg:-mt-3">
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
  const [selectedOption, setSelectedOption] = useState("rent");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [regionsData, setRegionsData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(null);

  // Add dropdown state management
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fetch data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsRes, propertyTypesRes, transactionTypesRes] =
          await Promise.all([
            fetch("/regions.json"),
            fetch("/propertyTypes.json"),
            fetch("/transactionTypes.json"),
          ]);

        const regions = await regionsRes.json();
        const propertyTypes = await propertyTypesRes.json();
        const transactions = await transactionTypesRes.json();

        setRegionsData(regions);
        setPropertyTypeData(propertyTypes);
        setTransactionTypes(transactions);
        setSelectedOption(transactions[0]?.id || "rent");
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const toggleModalDropdown = (dropdownName) => {
    setShowDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Add transaction type
    if (selectedOption) {
      params.set("transactionType", selectedOption);
    }

    // Add regions - use the exact same parameter name as SearchResults expects
    selectedRegions.forEach((region) => {
      if (region.id && region.id !== "all") {
        params.append("region", region.id); // Use 'region' not 'regions'
      }
    });

    // Add property types - use the exact same parameter name as SearchResults expects
    selectedPropertyTypes.forEach((type) => {
      if (type.id && type.id !== "all") {
        params.append("propertyType", type.id); // Use 'propertyType' not 'propertyTypes'
      }
    });

    console.log("Hero search params:", params.toString()); // Debug log
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <span className="hidden xl:block">
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
        options={propertyTypeData}
        selectedItems={selectedPropertyTypes}
        setSelectedItems={setSelectedPropertyTypes}
        placeholder={t.home.propertyTypePlaceholder}
        searchPlaceholder={t.home.searchPlaceholder}
        isRTL={isRTL}
        isOpen={openDropdown === "propertyTypes"}
        onToggle={() => toggleDropdown("propertyTypes")}
      />
      <div className="flex justify-center gap-1 overflow-hidden rounded-full border border-gray-300 bg-white p-1">
        {transactionTypes.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300 ease-in-out ${selectedOption === option.id ? "bg-primary-500 text-white" : "text-primary-900 hover:bg-primary-300/20 bg-transparent"}`}
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
      <div onClick={onToggle} className="mb-5 cursor-pointer">
        <div
          className={`flex w-full cursor-pointer items-center rounded-3xl border border-gray-200 bg-white p-3 px-5 focus-within:ring-1 focus-within:ring-gray-200 ${isOpen ? "ring-1 ring-gray-300" : ""}`}
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
              <LuSearch /> {placeholder}{" "}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-white">
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
                      isRTL ? "flex-row-reverse" : ""
                    } ${
                      selectedItems.some((item) => item.id === option.id)
                        ? "bg-primary-300/20"
                        : ""
                    }`}
                    onClick={() => handleItemSelectAndClose(option)}
                  >
                    <div
                      className={`flex items-center ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={selectedItems.some(
                          (item) => item.id === option.id,
                        )}
                        className="form-checkbox text-primary-400 pointer-events-none h-4 w-4 rounded"
                      />
                      <span className={`text-black ${isRTL ? "mr-2" : "ml-2"}`}>
                        {option.name}
                      </span>
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
