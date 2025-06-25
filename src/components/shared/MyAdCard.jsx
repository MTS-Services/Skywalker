import { useNavigate } from "react-router-dom"
import { FiClock } from "react-icons/fi"
import { useLanguage } from "../../context/LanguageContext"
/**
 * Reusable AdCard Component
 * Displays a single ad in a consistent format across the application
 */
const MyAdCard = ({ ad, onClick }) => {
    const { isRTL, t, language } = useLanguage()
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
        <div className="relative w-full rounded-lg card-shadow p-3 xl:p-4 cursor-pointer border border-transparent bg-main active:border-not-sticky-highlighted">
            {/* Ribbon */}
            <div className="bo-diagonal-ribbon z-[1] bo-diagonal-ribbon-right" style={{ '--c': 'var(--on-bg-main)' }}>
                <div className="relative w-16 h-[18px] flex items-center justify-center text-xs -top-[1px]">
                    Archived
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-3">
                {/* Image */}
                <div className="relative">
                    <div className="size-14 xl:size-28 flex-shrink-0 relative rounded-md overflow-hidden">
                        <img
                            alt="Post"
                            width={112}
                            height={112}
                            className="h-full w-full object-cover"
                            src="https://res.cloudinary.com/boshamlan/image/upload/q_auto,f_auto,c_thumb,w_192,h_192/zv6iyzup4e42u6sd9wmv.jpg"
                        />
                    </div>
                </div>

                {/* Details */}
                <div className="overflow-hidden pe-6">
                    <div className="font-bold text-lg text-dark line-clamp-2 break-words">
                        Apartment for Rent in Funaitees
                    </div>

                    <div className="h-0.5"></div>

                    {/* Price & Stats */}
                    <div className="flex gap-3">
                        <div className="rounded font-bold text-primary-dark">750 KD</div>

                        <div className="rounded text-xs flex items-center gap-1">
                            <svg className="shrink-0 fill-current size-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48..."></path>
                            </svg>
                            239 days
                        </div>

                        <div className="flex items-center gap-1">
                            <svg className="shrink-0 fill-current h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79..."></path>
                            </svg>
                            <div className="text-xs">1491</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="h-2"></div>
                    <div className="line-clamp-2 text-sm">
                        Apartment for rent in the Alf-Nitais area, super deluxe finishing on the second floor, four bedrooms,
                        2 master and 2 including bathroom + hall + kitchen + maid’s room with bathroom + laundry room + 2 car
                        parking spaces next to each other. Rent 750. Contact 90078005
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="h-4"></div>
            <div className="flex gap-3 items-center justify-center">
                {/* Action Button 1 */}
                <button className="action-button" style={{ backgroundColor: 'rgba(14, 160, 130, 0.12)', borderColor: 'rgb(14, 160, 130)' }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'rgb(14, 160, 130)' }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48..."></path>
                    </svg>
                </button>

                {/* Action Button 2 */}
                <button className="action-button" style={{ backgroundColor: 'rgba(212, 19, 12, 0.12)', borderColor: 'rgb(212, 19, 12)' }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'rgb(212, 19, 12)' }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48..."></path>
                    </svg>
                </button>

                {/* Action Button 3 */}
                <button className="action-button" style={{ backgroundColor: 'rgba(132, 136, 194, 0.12)', borderColor: 'rgb(132, 136, 194)' }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'rgb(132, 136, 194)' }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48..."></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default MyAdCard
