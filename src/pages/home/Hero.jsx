import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import BannerImage from "../../assets/images/home-hero-banner.svg"
import { MultiSelectDropdown } from "../../components/shared/FilterDropdown";
import ButtonSubmit from "../../common/button/ButtonSubmit";

/**
 * Hero Component: Displays the main hero section with a background and search filters.
 */
export default function Hero({ t, isRTL }) {
  return (
    <section className="relative py-6 sm:py-12 md:py-12 lg:py-20">
      <div className="absolute right-0 bottom-0 left-0 w-full">
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
          className="h-auto w-full max-w-screen-2xl object-cover lg:hidden"
          src="/home-hero-mobile-hd.svg"
        />
      </div>

      <div className="container mx-auto flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <h1 className="text-lx mb-3 text-black md:text-xl lg:text-2xl">
            {t.home.bannerTitle}
          </h1>
          <p className="text-primary-800 mb-8 text-base md:text-lg">
            {t.home.bannerSubTitle}
          </p>
          <div className="shadow-primary-900/30 w-full max-w-md rounded-2xl bg-white/20 p-4 shadow-lg backdrop-blur-xs sm:p-6">
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
      {/* <button
        type="submit"
        className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-400 focus:ring-opacity-50 w-full rounded-full py-3 text-white shadow-lg transition-colors duration-300 focus:ring-2 focus:outline-none"
      >
        {t.home.searchButton}
      </button> */}

      <ButtonSubmit
        text={
          <span className="flex items-center gap-2">{t.home.searchButton}</span>
        }
        className="!w-full rounded-4xl"
      />
    </form>
  );
}
