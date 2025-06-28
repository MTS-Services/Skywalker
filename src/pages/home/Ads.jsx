import { useState, useEffect, useRef, useCallback } from "react";
import DetailsModal from "../adDetails/Modal";
import { useLanguage } from "../../context/LanguageContext";
import AdCard from "../../components/shared/AdCard";
import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import ButtonSubmit from "../../common/button/ButtonSubmit";

/**
 * Generates a URL-friendly slug from a string.
 * @param {string} title - The string to convert.
 * @returns {string} The generated slug.
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
};

export default function Ads() {
  const [allAds, setAllAds] = useState([]);
  const [displayedAds, setDisplayedAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const [loadingMore, setLoadingMore] = useState(false)
  // const [loadMoreClicked, setLoadMoreClicked] = useState(false) // Track if load more was clicked
  const { isRTL, t, language } = useLanguage();

  const ITEMS_PER_PAGE = 10;
  const observerRef = useRef();
  const loadMoreRef = useRef();

  // Fetch all ads on component mount
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/data/ads.json");
        const data = await response.json();
        const processedAds = data.map((ad) => ({
          ...ad,
          slug: ad.slug || generateSlug(ad.title),
          views: ad.views || 0,
        }));
        setAllAds(processedAds);

        // Load first page
        const firstPageAds = processedAds.slice(0, ITEMS_PER_PAGE);
        setDisplayedAds(firstPageAds);
        setHasMore(processedAds.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Handle load more button click
  const handleLoadMoreClick = () => {
    // setLoadMoreClicked(true) // Hide the button and enable infinite scroll
    // loadMoreAds()
    navigate("/search");
  };

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
    document.body.style.overflow = "";
    setTimeout(() => setSelectedAd(null), 300);
  };

  if (loading) {
    return (
      <section className="bg-primary-200/10 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-center justify-center py-20">
              <div className="border-primary-500 h-12 w-12 animate-spin rounded-full border-b-2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="mb-6 text-lg">{t.ads.recentAdsTitle}</h2>
            <div className="flex flex-col items-center justify-start gap-4">
              {displayedAds.map((ad) => (
                <div key={ad.id}>
                  <AdCard
                    ad={ad}
                    t={t}
                    language={language}
                    isRTL={isRTL}
                    variant="compact"
                    onClick={handleAdClick}
                  />
                </div>
              ))}

              {/* Loading More Indicator */}
              {/* {loadingMore && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  <span className="ml-3 text-primary-900">{t.search.loading}</span>
                </div>
              )} */}

              {/* Load More Button - only show if not clicked and has more items */}
              {/* {hasMore && !loadingMore && !loadMoreClicked && ( */}
              {/* <button
                onClick={handleLoadMoreClick}
                className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-400 focus:ring-opacity-50 mt-6 w-full rounded-full px-8 py-3 text-white transition-colors duration-300 focus:ring-2 focus:outline-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaCirclePlus size={18} />
                  {t.ads.loadMore}
                </span>
              </button> */}

              <ButtonSubmit
                onClick={handleLoadMoreClick}
                text={
                  <span className="flex items-center justify-center rounded-2xl">
                    <FaCirclePlus className="mr-2 text-xl" />
                    {t.ads.loadMore}
                  </span>
                }
                className="!w-full rounded-4xl"
              />

              {/* )} */}

              {/* Infinite Scroll Trigger - only active after load more is clicked */}
              {/* {loadMoreClicked && <div ref={loadMoreRef} className="h-4 w-full" />} */}

              {/* End of Results */}
              {/* {!hasMore && displayedAds.length > 0 && (
                <div className="text-center py-8 text-primary-900">{t.ads.allItemsLoaded}</div>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {showModal && selectedAd && (
        <DetailsModal
          show={showModal}
          onClose={closeModal}
          ad={selectedAd}
          t={t}
          isRTL={isRTL}
          language={language}
          formatTimeAgo={formatTimeAgo}
        />
      )}
    </>
  );
}
