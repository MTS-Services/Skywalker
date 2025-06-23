import React, { useState, useEffect } from 'react';
import DetailsModal from './Modal';
import { useLanguage } from '../../context/LanguageContext';
import { FiClock } from 'react-icons/fi';

/**
 * Generates a URL-friendly slug from a string.
 * @param {string} title - The string to convert.
 * @returns {string} The generated slug.
 */
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .trim();
};

/**
 * Ads Component
 * * Fetches and displays a list of recent advertisements.
 * Allows users to click on an ad to view details in a modal.
 */
export default function Ads() {
    const [ads, setAds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);
    const { isRTL, t, language } = useLanguage();

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await fetch('/ads.json');
                const data = await response.json();
                const processedAds = data.map(ad => ({
                    ...ad,
                    slug: ad.slug || generateSlug(ad.title),
                    views: ad.views || 0
                }));
                setAds(processedAds);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        };
        fetchAds();
    }, []);

    const formatTimeAgo = (dateString, lang) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - postDate) / 1000);
        const hours = Math.floor(seconds / 3600);

        if (hours < 1) {
            const minutes = Math.floor(seconds / 60);
            if (minutes < 1) return lang === 'ar' ? "الآن" : "just now";
            return `${minutes} ${lang === 'ar' ? 'دقيقة' : 'minutes'}`;
        }

        return `${hours} ${lang === 'ar' ? "ساعة" : "hours"}`;
    };

    const handleAdClick = (ad) => {
        setSelectedAd(ad);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        // Delay clearing ad to allow for outro animation
        setTimeout(() => setSelectedAd(null), 300);
    };

    return (
        <>
            <section className='bg-gray-50 py-10 md:py-16'>
                <div className="container mx-auto px-4">
                    <div className="w-full max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 px-2">
                            {t.ads.recentAdsTitle}
                        </h3>
                        <div className="flex flex-col items-center justify-start gap-4">
                            {ads.map((ad) => (
                                <div
                                    key={ad.id}
                                    onClick={() => handleAdClick(ad)}
                                    className="w-full cursor-pointer group"
                                >
                                    <div className="relative w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-3 sm:p-4 border border-transparent bg-white active:border-primary-500">
                                        <div className="flex gap-3 sm:gap-4">
                                            {/* Image */}
                                            <div className="flex-shrink-0 relative">
                                                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-md overflow-hidden">
                                                    <img
                                                        alt={ad.title}
                                                        src={ad.images && ad.images.length > 0 ? ad.images[0] : 'https://placehold.co/112x112/EBF4FF/333333?text=Ad'}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                {/* Super Tag */}
                                                <div className="absolute -top-1.5 -start-1.5">

                                                    {isRTL ? (
                                                        <svg width="49" height="37" viewBox="0 0 49 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M49 27.6018L40 37V20L49 27.6018Z" fill="#1e8877"></path>
                                                            <path d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H47C47.8284 0.5 48.5 1.17157 48.5 2V27.5H2C1.17157 27.5 0.5 26.8284 0.5 26V2Z" fill="#2dcaaa" stroke="#32e0bb"></path>
                                                        </svg>
                                                    ) : (
                                                        <svg width="49" height="37" viewBox="0 0 49 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 27.6018L9 37V20L0 27.6018Z" fill="#1e8877"></path>
                                                            <path d="M48.5 2C48.5 1.17157 47.8284 0.5 47 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V27.5H47C47.8284 27.5 48.5 26.8284 48.5 26V2Z" fill="#2dcaaa" stroke="#32e0bb"></path>
                                                        </svg>
                                                    )}


                                                    <div className="absolute top-0 start-0.5 w-full h-[28px] flex items-center justify-center">
                                                        <div className="text-white text-sm font-bold whitespace-nowrap overflow-hidden px-1">
                                                            {t.ads.super}
                                                        </div>
                                                    </div>
                                                </div>
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
                                                    <div className="flex items-center gap-1 text-gray-500">
                                                        <FiClock className="size-4" />
                                                        <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-gray-600 line-clamp-2 text-sm">
                                                    {ad.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <DetailsModal
                show={showModal}
                onClose={closeModal}
                ad={selectedAd}
                t={t}
                isRTL={isRTL}
                language={language}
                formatTimeAgo={formatTimeAgo}
            />
        </>
    )
}
