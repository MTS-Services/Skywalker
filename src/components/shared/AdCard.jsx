import { useNavigate } from "react-router-dom";
import { FiClock } from "react-icons/fi";

/**
 * Reusable AdCard Component
 * Displays a single ad in a consistent format across the application
 */
const AdCard = ({ ad, t, language, isRTL, onClick }) => {
  const navigate = useNavigate();

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

  const handleClick = () => {
    if (onClick) {
      onClick(ad);
    } else {
      navigate(`/ads/${ad.slug}`);
    }
  };
  return (
    <div onClick={handleClick} className="group w-full cursor-pointer">
      <div className="active:border-primary-500 relative w-full rounded-lg border border-transparent bg-rose-50 p-3 text-black shadow shadow-gray-200 transition-shadow duration-300 hover:shadow-md sm:p-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Image */}
          <div className="relative flex-shrink-0">
            <div className="h-20 w-20 overflow-hidden rounded-md sm:h-28 sm:w-28">
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
              <div className="absolute -start-1.5 -top-1.5">
                {isRTL ? (
                  <svg
                    width="49"
                    height="37"
                    viewBox="0 0 49 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49 27.6018L40 37V20L49 27.6018Z"
                      fill="#821220"
                    ></path>
                    <path
                      d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H47C47.8284 0.5 48.5 1.17157 48.5 2V27.5H2C1.17157 27.5 0.5 26.8284 0.5 26V2Z"
                      fill="#D7263D"
                      stroke="#D7263D"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    width="49"
                    height="37"
                    viewBox="0 0 49 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 27.6018L9 37V20L0 27.6018Z"
                      fill="#821220"
                    ></path>
                    <path
                      d="M48.5 2C48.5 1.17157 47.8284 0.5 47 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V27.5H47C47.8284 27.5 48.5 26.8284 48.5 26V2Z"
                      fill="#D7263D"
                      stroke="#D7263D"
                    ></path>
                  </svg>
                )}
                <div className="absolute start-0.5 top-0 flex h-[28px] w-full items-center justify-center">
                  <h4 className="overflow-hidden px-1 text-sm font-bold whitespace-nowrap text-gray-600">
                    {t.ads.super}
                  </h4>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 overflow-hidden">
            <h2 className="">{ad.title}</h2>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-primary-900">
                {ad.kd} {t.ads.currency}
              </h3>
              <div className="flex items-center gap-1 text-gray-600">
                <FiClock size={16} />
                <h4>{formatTimeAgo(ad.postCreateAt, language)}</h4>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-gray-600">{ad.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
