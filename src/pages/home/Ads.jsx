import { useState, useEffect, useRef, useCallback } from "react"
import DetailsModal from "../adDetails/Modal"
import { useLanguage } from "../../context/LanguageContext"
import AdCard from "../../components/shared/AdCard"
import { useNavigate } from "react-router-dom"

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
    .trim()
}

/**
 * Ads Component with Pagination and Infinite Scroll
 * Fetches and displays a list of recent advertisements with load more functionality.
 */
export default function Ads() {
  const [allAds, setAllAds] = useState([])
  const [displayedAds, setDisplayedAds] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedAd, setSelectedAd] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  // const [loadingMore, setLoadingMore] = useState(false)
  // const [loadMoreClicked, setLoadMoreClicked] = useState(false) // Track if load more was clicked
  const { isRTL, t, language } = useLanguage()

  const ITEMS_PER_PAGE = 10
  const observerRef = useRef()
  const loadMoreRef = useRef()

  // Fetch all ads on component mount
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/data/ads.json")
        const data = await response.json()
        const processedAds = data.map((ad) => ({
          ...ad,
          slug: ad.slug || generateSlug(ad.title),
          views: ad.views || 0,
        }))
        setAllAds(processedAds)

        // Load first page
        const firstPageAds = processedAds.slice(0, ITEMS_PER_PAGE)
        setDisplayedAds(firstPageAds)
        setHasMore(processedAds.length > ITEMS_PER_PAGE)
      } catch (error) {
        console.error("Error fetching ads:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAds()
  }, [])

  // Load more ads function
  // const loadMoreAds = useCallback(() => {
  //   if (loadingMore || !hasMore) return

  //   setLoadingMore(true)

  //   // Simulate loading delay for better UX
  //   setTimeout(() => {
  //     const nextPage = currentPage + 1
  //     const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
  //     const endIndex = startIndex + ITEMS_PER_PAGE
  //     const newAds = allAds.slice(startIndex, endIndex)

  //     if (newAds.length > 0) {
  //       setDisplayedAds((prev) => [...prev, ...newAds])
  //       setCurrentPage(nextPage)
  //       setHasMore(endIndex < allAds.length)
  //     } else {
  //       setHasMore(false)
  //     }

  //     setLoadingMore(false)
  //   }, 100)
  // }, [allAds, currentPage, loadingMore, hasMore])

  // Handle load more button click
  const handleLoadMoreClick = () => {
    // setLoadMoreClicked(true) // Hide the button and enable infinite scroll
    // loadMoreAds()
    navigate("/search")
  }

  // Intersection Observer for infinite scroll - only after load more is clicked
  // useEffect(() => {
  //   if (!loadMoreClicked) return // Don't start infinite scroll until load more is clicked

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasMore && !loadingMore) {
  //         loadMoreAds()
  //       }
  //     },
  //     { threshold: 0.1 },
  //   )

  //   if (loadMoreRef.current) {
  //     observer.observe(loadMoreRef.current)
  //   }

  //   observerRef.current = observer

  //   return () => {
  //     if (observerRef.current) {
  //       observerRef.current.disconnect()
  //     }
  //   }
  // }, [loadMoreAds, hasMore, loadingMore, loadMoreClicked])

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
    document.body.style.overflow = ""
    setTimeout(() => setSelectedAd(null), 300)
  }

  if (loading) {
    return (
      <section className="bg-primary-200/10 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-primary-200/10 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-900 mb-6 px-2">{t.ads.recentAdsTitle}</h3>
            <div className="flex flex-col items-center justify-start gap-4">
              {displayedAds.map((ad) => (
                <div key={ad.id}>
                  <AdCard ad={ad} t={t} language={language} isRTL={isRTL} variant="compact" onClick={handleAdClick} />
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
              <button
                onClick={handleLoadMoreClick}
                className="mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
              >
                {t.ads.loadMore}
              </button>
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
  )
}
