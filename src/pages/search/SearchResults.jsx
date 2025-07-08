import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import AdCard from "../../components/shared/AdCard";
import DetailsModal from "../adDetails/Modal";
import axios from "axios";

/**
 * Main SearchResults Page Component
 * This component is now only responsible for DISPLAYING search results.
 * All filtering logic has been moved to the SearchPageHeader.
 */
const SearchResults = () => {
  const { t, isRTL, language } = useLanguage();
  const location = useLocation();
  const [allAds, setAllAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const formatTimeAgo = (dateString, lang) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) return lang === "ar" ? "الآن" : "just now";
      return `${minutes} ${lang === "ar" ? "دقيقة" : "minutes"}`;
    }
    return `${hours} ${lang === "ar" ? "ساعة" : "hours"}`;
  };

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedAd(null), 300);
  };

  const filters = useMemo(() => {
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
  
  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/ads.json");
      const data = await response.data;
      setAllAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = useMemo(() => {
    if (!allAds.length) return [];
    return allAds.filter((ad) => {
      const adKd = Number.parseFloat(ad.kd.replace(/,/g, ""));
      const transactionMatch = !filters.transactionType || ad.transactionType === filters.transactionType;
      const regionMatch = filters.regions.length === 0 || filters.regions.includes(ad.region);
      const propertyTypeMatch = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(ad.propertyType);
      const priceMatch =
        (filters.minPrice === "" || adKd >= filters.minPrice) &&
        (filters.maxPrice === "" || adKd <= filters.maxPrice);
      const textMatch =
        !filters.searchText ||
        ad.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        ad.description.toLowerCase().includes(filters.searchText.toLowerCase());
      return transactionMatch && regionMatch && propertyTypeMatch && priceMatch && textMatch;
    });
  }, [allAds, filters]);

  return (
    <div className="min-h-[60vh]" dir={isRTL ? "rtl" : "ltr"}>
      <div className=" px-4 py-6">
        <div className="container mx-auto max-w-xl">
          <h1 className="mb-6 mt-4 text-[20px] font-bold">
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
                <div className="col-span-full rounded-lg bg-white p-10 text-center text-primary-900 font-[700] shadow-card-shadow">
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
  );
};

export default SearchResults;