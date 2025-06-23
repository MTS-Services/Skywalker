import React, { useState, useEffect } from 'react';
import DetailsModal from './Modal';
import { useLanguage } from '../../context/LanguageContext';

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .trim();
};

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

    const formatTimeAgo = (dateString, language) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - postDate) / 1000);
        const hours = Math.floor(seconds / 3600);

        if (hours === 0) {
            return language === 'ar' ? "0 ساعة" : "0 hours";
        }

        return hours + (language === 'ar' ? " ساعة" : " hours");
    };

    const handleAdClick = (ad) => {
        setSelectedAd(ad);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAd(null);
    };

    return (
        <>
            <section className='bg-gray-50 py-10'>
                <div className="container w-full max-w-7xl mx-auto">
                    <div className={`w-full max-w-xl mx-auto mb-4`}>
                        <h3 className={`text-xl font-bold text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}>
                            {t.home.recentAdsTitle}
                        </h3>

                        <div className={`flex flex-col items-center justify-start gap-4 mt-4`}>
                            {ads.map((ad) => (
                                <div
                                    key={ad.id}
                                    onClick={() => handleAdClick(ad)}
                                    className="w-full cursor-pointer"
                                >
                                    <div className="relative w-full rounded-lg shadow-card-shadow p-3 xl:p-4 border border-transparent bg-primary-50/50 active:border-primary-500">
                                        <div className="flex gap-3">
                                            <div className="relative">
                                                <div className="size-14 xl:size-28 flex-shrink-0 relative rounded-md overflow-hidden">
                                                    <img
                                                        alt={ad.title}
                                                        src={ad.images && ad.images[0] ? ad.images[0] : ''}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="absolute -top-[6px] -start-2">
                                                    <svg width="49" height="37" viewBox="0 0 49 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 27.6018L9 37V20L0 27.6018Z" fill="#1e8877"></path>
                                                        <path d="M48.5 2C48.5 1.17157 47.8284 0.5 47 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V27.5H47C47.8284 27.5 48.5 26.8284 48.5 26V2Z" fill="#2dcaaa " stroke="#32e0bb "></path>
                                                    </svg>
                                                    <div className="w-full text-white absolute top-0 start-[1px] bg-stickyTag rounded-sm px-1 h-[28px] text-base">
                                                        <div className="flex items-center justify-center h-full font-bold whitespace-nowrap overflow-hidden">
                                                            {t.home.super}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="font-bold text-lg text-dark line-clamp-2 break-words">
                                                    {ad.title}
                                                </div>
                                                <div className="h-0.5"></div>
                                                <div className="flex gap-3">
                                                    <div className="rounded font-bold text-primary-dark">
                                                        {ad.kd} {t.home.currency}
                                                    </div>
                                                    <div className="rounded text-xs flex items-center gap-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" className="shrink-0 fill-current size-4">
                                                            <path d="M520-496v-144q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v159q0 8 3 15.5t9 13.5l132 132q11 11 28 11t28-11q11-11 11-28t-11-28L520-496ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"></path>
                                                        </svg>
                                                        {formatTimeAgo(ad.postCreateAt, language)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="h-2"></div>
                                                    <div className="line-clamp-2">
                                                        {ad.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* {showModal && selectedAd && ( */}
                <DetailsModal
                    show={showModal}
                    onClose={closeModal}
                    ad={selectedAd}
                    t={t}
                    isRTL={isRTL}
                    language={language}
                    formatTimeAgo={formatTimeAgo}
                />
            {/* )} */}
        </>
    )
}