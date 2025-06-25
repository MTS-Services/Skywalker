import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BannerImage from "../../assets/images/home-hero-banner.svg"
import { MultiSelectDropdown } from "../../components/shared/FilterDropdown"

/**
 * Hero Component: Displays the main hero section with a background and search filters.
 */
export default function Hero({ t, isRTL }) {
  return (
    <section className="relative z-10 flex min-h-[calc(100vh-150px)] items-center justify-center bg-primary-50/20 md:min-h-[calc(100vh-200px)]">
      <div className="absolute right-0 bottom-0 left-0 flex w-full justify-center">
        <img
          alt="Cityscape background"
          width="1920"
          height="426"
          className="h-auto w-full max-w-screen-2xl object-cover"
          src={BannerImage || "/placeholder.svg"}
        />
      </div>
      <div className="relative z-10 container mx-auto flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <h2 className="mb-3 text-xl md:text-2xl font-bold text-primary-900 lg:text-3xl">{t.home.bannerTitle}</h2>
          <p className="mb-8 text-base text-primary-800 md:text-lg">{t.home.bannerSubTitle}</p>
          <div className="w-full max-w-md rounded-2xl bg-primary-50/20 p-4 shadow-lg shadow-primary-900/30 backdrop-blur-sm sm:p-6">
            <FilterComponent t={t} isRTL={isRTL} />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * FilterComponent: Renders the search controls and handles search submission.
 */
function FilterComponent({ t, isRTL }) {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState("rent")
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([])
  const [regionsData, setRegionsData] = useState([])
  const [propertyTypeData, setPropertyTypeData] = useState([])
  const [transactionTypes, setTransactionTypes] = useState([])

  // Add dropdown state management
  const [openDropdown, setOpenDropdown] = useState(null)

  // Fetch data from JSON files
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsRes, propertyTypesRes, transactionTypesRes] = await Promise.all([
          fetch("/data/regions.json"),
          fetch("/data/propertyTypes.json"),
          fetch("/data/transactionTypes.json"),
        ])

        const regions = await regionsRes.json()
        const propertyTypes = await propertyTypesRes.json()
        const transactions = await transactionTypesRes.json()

        setRegionsData(regions)
        setPropertyTypeData(propertyTypes)
        setTransactionTypes(transactions)
        setSelectedOption(transactions[0]?.id || "rent")
      } catch (error) {
        console.error("Error fetching filter data:", error)
      }
    }

    fetchData()
  }, [])

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()

    // Add transaction type
    if (selectedOption) {
      params.set("transactionType", selectedOption)
    }

    // Add regions - use the exact same parameter name as SearchResults expects
    selectedRegions.forEach((region) => {
      if (region.id && region.id !== "all") {
        params.append("region", region.id) // Use 'region' not 'regions'
      }
    })

    // Add property types - use the exact same parameter name as SearchResults expects  
    selectedPropertyTypes.forEach((type) => {
      if (type.id && type.id !== "all") {
        params.append("propertyType", type.id) // Use 'propertyType' not 'propertyTypes'
      }
    })

    console.log("Hero search params:", params.toString()) // Debug log
    navigate(`/search?${params.toString()}`)
  }

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
      <div className="border-primary-400 flex justify-center gap-1 overflow-hidden rounded-full border bg-white p-1">
        {transactionTypes.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${selectedOption === option.id ? "bg-primary-400 text-white" : "text-primary-400 hover:bg-primary-50 bg-transparent"}`}
            onClick={() => setSelectedOption(option.id)}
          >
            {option.name}
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
  )
}
