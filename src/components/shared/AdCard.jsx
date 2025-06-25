import { useNavigate } from "react-router-dom"
import { FiClock } from "react-icons/fi"

/**
 * Reusable AdCard Component
 * Displays a single ad in a consistent format across the application
 */
const AdCard = ({ ad, t, language, isRTL, onClick }) => {
  const navigate = useNavigate()

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

  const handleClick = () => {
    if (onClick) {
      onClick(ad)
    } else {
      navigate(`/ads/${ad.slug}`)
    }
  }
  return (
    <div onClick={handleClick} className="w-full cursor-pointer group">
      <div className="relative w-full rounded-lg shadow shadow-primary-100/50 hover:shadow-lg transition-shadow duration-300 p-3 sm:p-4 border border-transparent bg-white active:border-primary-500">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Image */}
          <div className="flex-shrink-0 relative">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-md overflow-hidden">
              <img
                alt={ad.title}
                src={
                  ad.images && ad.images.length > 0
                    ? ad.images[0]
                    : "https://placehold.co/112x112/EBF4FF/333333?text=Ad"
                }
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Super Tag */}
            {ad.isSuper && (
              <div className="absolute -top-1.5 -start-1.5">
                {isRTL ? (
                  <svg width="49" height="37" viewBox="0 0 49 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M49 27.6018L40 37V20L49 27.6018Z" fill="#1e8877"></path>
                    <path
                      d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H47C47.8284 0.5 48.5 1.17157 48.5 2V27.5H2C1.17157 27.5 0.5 26.8284 0.5 26V2Z"
                      fill="#2dcaaa"
                      stroke="#32e0bb"
                    ></path>
                  </svg>
                ) : (
                  <svg width="49" height="37" viewBox="0 0 49 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 27.6018L9 37V20L0 27.6018Z" fill="#1e8877"></path>
                    <path
                      d="M48.5 2C48.5 1.17157 47.8284 0.5 47 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V27.5H47C47.8284 27.5 48.5 26.8284 48.5 26V2Z"
                      fill="#2dcaaa"
                      stroke="#32e0bb"
                    ></path>
                  </svg>
                )}
                <div className="absolute top-0 start-0.5 w-full h-[28px] flex items-center justify-center">
                  <div className="text-white text-sm font-bold whitespace-nowrap overflow-hidden px-1">
                    {t.ads.super}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Details */}
          <div className="flex-1 overflow-hidden">
            <h4 className="font-bold text-base sm:text-lg text-dark line-clamp-2 break-words group-hover:text-primary-600 transition-colors">
              {ad.title}
            </h4>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <div className="font-bold text-primary-dark text-base">
                {ad.kd} {t.ads.currency}
              </div>
              <div className="flex items-center gap-1 text-primary-800">
                <FiClock className="size-4" />
                <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
              </div>
            </div>
            <p className="mt-2 text-primary-900 line-clamp-2 text-sm">{ad.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdCard
