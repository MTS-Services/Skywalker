import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext"
import AdCard from "../../components/shared/AdCard"
import { MultiSelectDropdown, SingleSelectDropdown } from "../../components/shared/FilterDropdown"
import DetailsModal from "../adDetails/Modal"
import { LuChevronDown, LuSearch } from "react-icons/lu"
import BannerImage from "../../assets/images/home-hero-banner.svg"

/**
 * Main SearchResults Page Component
 */
const SearchResults = () => {
  const { t, isRTL, language } = useLanguage()
  const location = useLocation()
  const [allAds, setAllAds] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedAd, setSelectedAd] = useState(null)

  const formatTimeAgo = (dateString, lang) => {
    const postDate = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - postDate) / 1000)
    const hours = Math.floor(seconds / 3600)

    if (hours < 1) {
      const minutes = Math.floor(seconds / 60)
      if (minutes < 1) return lang === "ar" ? "الآن" : "just now"
      return `${minutes} ${lang === "ar" ? "دقيقة" : "minutes"}`
    }

    return `${hours} ${lang === "ar" ? "ساعة" : "hours"}`
  }

  const handleAdClick = (ad) => {
    setSelectedAd(ad)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setTimeout(() => setSelectedAd(null), 300)
  }

  // Filters are derived directly from the URL search params
  const filters = useMemo(() => {
    const params = new URLSearchParams(location.search)

    return {
      transactionType: params.get("transactionType") || "",
      regions: params.getAll("region"), // Use 'region' to match Hero
      propertyTypes: params.getAll("propertyType"), // Use 'propertyType' to match Hero
      minPrice: params.get("minPrice") ? Number.parseInt(params.get("minPrice")) : "",
      maxPrice: params.get("maxPrice") ? Number.parseInt(params.get("maxPrice")) : "",
      searchText: params.get("searchText") || "",
    }
  }, [location.search])

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true)
      try {
        const response = await fetch("/data/ads.json")
        const data = await response.json()
        setAllAds(data)
      } catch (error) {
        console.error("Error fetching ads:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAds()
  }, [])

  const filteredAds = useMemo(() => {
    if (!allAds.length) return []

    const filtered = allAds.filter((ad) => {
      const adKd = Number.parseFloat(ad.kd.replace(/,/g, ""))

      // Transaction type filter
      const transactionMatch = !filters.transactionType || ad.transactionType === filters.transactionType

      // Region filter - check if any selected regions match
      const regionMatch = filters.regions.length === 0 || filters.regions.includes(ad.region)

      // Property type filter - check if any selected property types match
      const propertyTypeMatch = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(ad.propertyType)

      // Price filter
      const priceMatch =
        (filters.minPrice === "" || adKd >= filters.minPrice) && (filters.maxPrice === "" || adKd <= filters.maxPrice)

      // Text search filter
      const textMatch =
        !filters.searchText ||
        ad.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        ad.description.toLowerCase().includes(filters.searchText.toLowerCase())

      return transactionMatch && regionMatch && propertyTypeMatch && priceMatch && textMatch
    })

    return filtered
  }, [allAds, filters])

  return (
    <div className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Filter Bar  */}
      <div className="relative z-10 flex min-h-[50vh] items-center justify-center bg-primary-50/20 p-4">
        <div className="absolute right-0 bottom-0 left-0 flex w-full justify-center">
          <img
            alt="Cityscape background"
            width="1920"
            height="426"
            className="h-auto w-full max-w-screen-2xl object-cover"
            src={BannerImage || "/placeholder.svg"}
          />
        </div>
        <div className="w-full max-w-md rounded-2xl bg-primary-50/20 p-4 shadow-lg shadow-primary-900/30 backdrop-blur-sm sm:p-6">
          <SearchFilterBar initialFilters={filters} t={t} isRTL={isRTL} />
        </div>
      </div>
      <div className="bg-primary-200/10 px-4 py-6">
        <div className={`container max-w-3xl mx-auto`}>

          <h1 className="mt-8 mb-6 text-2xl font-bold">
            {t.search.searchResults} ({loading ? "..." : filteredAds.length} {t.search.ads})
          </h1>

          {loading ? (
            <div className="p-10 text-center">{t.search.loading}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredAds.length > 0 ? (
                filteredAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    ad={ad}
                    t={t}
                    language={language}
                    isRTL={isRTL}
                    variant="default"
                    onClick={handleAdClick}
                  />
                ))
              ) : (
                <div className="col-span-full rounded-lg bg-white p-10 text-center text-primary-800 shadow shadow-primary-200/50">
                  {t.search.noResultsFound}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <DetailsModal
        show={showModal}
        onClose={closeModal}
        ad={selectedAd}
        t={t}
        isRTL={isRTL}
        language={language}
        formatTimeAgo={formatTimeAgo}
      />
    </div>
  )
}

/**
 * The main filter bar component, styled like the Hero filter.
 */
const SearchFilterBar = ({ initialFilters, t, isRTL }) => {
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(null)
  const [allRegions, setAllRegions] = useState([])
  const [allPropertyTypes, setAllPropertyTypes] = useState([])
  const [transactionTypes, setTransactionTypes] = useState([])

  const [transactionType, setTransactionType] = useState(initialFilters.transactionType)
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([])
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice)
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice)
  const [searchText, setSearchText] = useState(initialFilters.searchText)

  // Fetch filter data from JSON files
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [regionsRes, propertyTypesRes, transactionTypesRes] = await Promise.all([
          fetch("/data/regions.json"),
          fetch("/data/propertyTypes.json"),
          fetch("/data/transactionTypes.json"),
        ])

        const regions = await regionsRes.json()
        const propertyTypes = await propertyTypesRes.json()
        const transactions = await transactionTypesRes.json()

        setAllRegions(regions)
        setAllPropertyTypes(propertyTypes)
        setTransactionTypes(transactions)
      } catch (error) {
        console.error("Error fetching filter data:", error)
      }
    }

    fetchFilterData()
  }, [])

  // Set initial selected items from URL params - only when data is loaded
  useEffect(() => {
    if (allRegions.length > 0 && allPropertyTypes.length > 0) {
      // Set initial selected regions based on URL params
      const initialSelectedRegions = allRegions
        .filter((r) => initialFilters.regions.includes(r.id))
        .map((r) => ({ ...r }))
      setSelectedRegions(initialSelectedRegions)

      // Set initial selected property types based on URL params
      const initialSelectedPropertyTypes = allPropertyTypes
        .filter((p) => initialFilters.propertyTypes.includes(p.id))
        .map((p) => ({ ...p }))
      setSelectedPropertyTypes(initialSelectedPropertyTypes)
    }
  }, [allRegions, allPropertyTypes, initialFilters.regions, initialFilters.propertyTypes])

  // Function to update URL with current filter state
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()

    if (transactionType) {
      params.set("transactionType", transactionType)
    }

    selectedRegions.forEach((region) => {
      if (region.id && region.id !== "all") {
        params.append("region", region.id)
      }
    })

    selectedPropertyTypes.forEach((type) => {
      if (type.id && type.id !== "all") {
        params.append("propertyType", type.id)
      }
    })

    if (minPrice !== "" && minPrice !== undefined) {
      params.set("minPrice", minPrice.toString())
    }
    if (maxPrice !== "" && maxPrice !== undefined) {
      params.set("maxPrice", maxPrice.toString())
    }
    if (searchText) {
      params.set("searchText", searchText)
    }

    navigate(`/search?${params.toString()}`, { replace: true })
  }, [transactionType, selectedRegions, selectedPropertyTypes, minPrice, maxPrice, searchText, navigate])

  // Update URL whenever filters change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL()
    }, 100) // Small debounce to prevent too many URL updates

    return () => clearTimeout(timeoutId)
  }, [selectedRegions, selectedPropertyTypes, transactionType, minPrice, maxPrice, searchText, updateURL])

  const toggleDropdown = useCallback((dropdownName) => {
    setShowDropdown((prev) => (prev === dropdownName ? null : dropdownName))
  }, [])

  return (
    <div className="w-full space-y-4">
      {/* Area Search MultiSelectDropdown */}
      <MultiSelectDropdown
        options={allRegions}
        selectedItems={selectedRegions}
        setSelectedItems={setSelectedRegions}
        placeholder={t.search.areaPlaceholder}
        searchPlaceholder={t.search.searchPlaceholder}
        label={t.search.area}
        isRTL={isRTL}
        isOpen={showDropdown === "area"}
        onToggle={() => toggleDropdown("area")}
      />

      {/* Property Types MultiSelectDropdown */}
      <MultiSelectDropdown
        options={allPropertyTypes}
        selectedItems={selectedPropertyTypes}
        setSelectedItems={setSelectedPropertyTypes}
        placeholder={t.search.propertyTypePlaceholder}
        searchPlaceholder={t.search.searchPlaceholder}
        label={t.search.propertyType}
        isRTL={isRTL}
        isOpen={showDropdown === "propertyTypes"}
        onToggle={() => toggleDropdown("propertyTypes")}
      />

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Transaction Type Dropdown */}
        <SingleSelectDropdown
          options={transactionTypes}
          selectedValue={transactionType}
          setSelectedValue={setTransactionType}
          placeholder={t.search.transactionTypePlaceholder}
          label={t.search.transactionType}
          isRTL={isRTL}
          isOpen={showDropdown === "transactionType"}
          onToggle={() => toggleDropdown("transactionType")}
        />

        {/* Price Filter */}
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          t={t}
          isRTL={isRTL}
          isOpen={showDropdown === "price"}
          onToggle={() => toggleDropdown("price")}
          onApply={() => setShowDropdown(null)}
        />

        {/* Text Search Filter */}
        <TextSearchFilter
          searchTerm={searchText}
          setSearchTerm={setSearchText}
          t={t}
          isRTL={isRTL}
          isOpen={showDropdown === "text"}
          onToggle={() => toggleDropdown("text")}
          onApply={() => setShowDropdown(null)}
        />
      </div>
    </div>
  )
}

/**
 * Price Range Filter Component with Slider and Input fields.
 */
function PriceRangeFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice, t, isRTL, isOpen, onToggle, onApply }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle()
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onToggle])

  const handleMinChange = (e) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value)
    setMinPrice(value)
  }

  const handleMaxChange = (e) => {
    const value = e.target.value === "" ? "" : Number.parseInt(e.target.value)
    setMaxPrice(value)
  }

  const handleReset = () => {
    setMinPrice("")
    setMaxPrice("")
    onApply()
  }

  const handleSearch = () => {
    onApply()
  }

  const MAX_POSSIBLE_PRICE = 3000000
  const MIN_POSSIBLE_PRICE = 0

  return (
    <div className="relative w-full xs:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full flex items-center justify-between gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-900 shadow-sm transition-colors hover:bg-primary-50/60 ${isOpen ? "ring-1 ring-primary-400" : ""}`}
        onClick={onToggle}
      >
        <span>{t.search.price}</span>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <LuChevronDown />
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute z-20 mt-2 rounded-lg border border-primary-200 bg-white p-4 shadow-lg ${isRTL ? "left-0" : "right-0"}`}
          style={{ minWidth: "300px" }}
        >
          <div className="mb-4 flex items-center justify-between text-sm font-medium text-primary-900">
            <span>
              {minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice} {t.search.currency}
            </span>
            <span>
              {maxPrice === "" ? `${MAX_POSSIBLE_PRICE}+` : `${maxPrice}+`} {t.search.currency}
            </span>
          </div>
          <input
            type="range"
            min={MIN_POSSIBLE_PRICE}
            max={MAX_POSSIBLE_PRICE}
            value={minPrice === "" ? MIN_POSSIBLE_PRICE : minPrice}
            onChange={handleMinChange}
            className="w-full h-2 bg-primary-100/80 rounded-lg appearance-none cursor-pointer range-lg"
          />
          <input
            type="range"
            min={MIN_POSSIBLE_PRICE}
            max={MAX_POSSIBLE_PRICE}
            value={maxPrice === "" ? MAX_POSSIBLE_PRICE : maxPrice}
            onChange={handleMaxChange}
            className="w-full h-2 bg-primary-100/80 rounded-lg appearance-none cursor-pointer range-lg mt-2"
          />
          <div className="mt-4 flex gap-2">
            <input
              type="number"
              placeholder={t.search.minPrice}
              value={minPrice}
              onChange={handleMinChange}
              className={`w-1/2 rounded-lg border border-primary-200 p-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-100 ${isRTL ? "text-right" : "text-left"}`}
            />
            <input
              type="number"
              placeholder={t.search.maxPrice}
              value={maxPrice}
              onChange={handleMaxChange}
              className={`w-1/2 rounded-lg border border-primary-200 p-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-100 ${isRTL ? "text-right" : "text-left"}`}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleReset}
              className="rounded-lg px-4 py-2 text-sm font-medium border border-primary-100 text-primary-900 hover:bg-primary-100"
            >
              {t.search.reset}
            </button>
            <button
              onClick={handleSearch}
              className="rounded-lg bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500"
            >
              {t.search.search}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Text Search Filter Component.
 */
function TextSearchFilter({ searchTerm, setSearchTerm, t, isRTL, isOpen, onToggle, onApply }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) {
          onToggle()
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onToggle])

  const handleReset = () => {
    setSearchTerm("")
    onApply()
  }

  const handleSearch = () => {
    onApply()
  }

  return (
    <div className="relative w-full xs:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className={`w-full flex items-center justify-between gap-2 rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-medium text-primary-700 shadow-sm transition-colors hover:bg-primary-50/60 ${isOpen ? "ring-1 ring-primary-400" : ""}`}
        onClick={onToggle}
      >
        <span>{t.search.text}</span>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <LuChevronDown />
        </span>
      </button>

      {isOpen && (
        <div
          className={`w-full absolute z-0 mt-2 rounded-lg border border-primary-200 bg-white p-4 shadow-lg ${isRTL ? "left-0" : "right-0"}`}
          style={{ minWidth: "300px" }}
        >
          <p className="mb-2 text-sm text-primary-900">{t.search.searchUsingTextExample}</p>
          <div className="relative">
            <span className={`absolute inset-y-0 flex items-center ${isRTL ? "right-3" : "left-3"} text-primary-400`}>
              <LuSearch />
            </span>
            <input
              type="text"
              placeholder={t.search.searchByText}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-lg border border-primary-200 p-2 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-primary-100 ${isRTL ? "pr-10 text-right" : "pl-10 text-left"} text-sm`}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleReset}
              className="rounded-lg px-4 py-2 text-sm font-medium border border-primary-100 text-primary-900 hover:bg-primary-100"
            >
              {t.search.reset}
            </button>
            <button
              onClick={handleSearch}
              className="rounded-lg bg-primary-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500"
            >
              {t.search.search}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults
