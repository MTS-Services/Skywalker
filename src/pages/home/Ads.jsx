import { useState, useEffect } from "react"
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

export default function Ads() {
  const [displayedAds, setDisplayedAds] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedAd, setSelectedAd] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { isRTL, t, language } = useLanguage()

  const ITEMS_PER_PAGE = 10

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

        // Load first page
        const firstPageAds = processedAds.slice(0, ITEMS_PER_PAGE)
        setDisplayedAds(firstPageAds)
      } catch (error) {
        console.error("Error fetching ads:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAds()
  }, [])

  // Handle load more button click
  const handleLoadMoreClick = () => {

    navigate("/search")
  }

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
      <section className="bg-primary-50/5 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 px-2">{t.ads.recentAdsTitle}</h3>
            <div className="flex flex-col items-center justify-start gap-4">
              {displayedAds.length > 0 ? (
                <>
                  {displayedAds.map((ad) => (
                    <div key={ad.id}>
                      <AdCard ad={ad} t={t} language={language} isRTL={isRTL} variant="compact" onClick={handleAdClick} />
                    </div>
                  ))}
                  <button
                    onClick={handleLoadMoreClick}
                    className="mt-6 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50"
                  >
                    {t.ads.loadMore}
                  </button>
                </>
              ) : (
                <p className="text-gray-600 py-5">{t.ads.noAds}</p>
              )}

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
