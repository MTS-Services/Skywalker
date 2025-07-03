import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import MyCredits from '../../components/MyCredits'
import { useLanguage } from '../../context/LanguageContext';
import MyAdCard from '../../components/shared/MyAdCard';
import axios from 'axios';
import DetailsModal from "../adDetails/Modal"

export default function MyArchive() {
    const [myAds, setMyAds] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [selectedAd, setSelectedAd] = useState(null)
    const { isRTL, t, language } = useLanguage();


    const fetchMyAds = async () => {
        try {
            const response = await axios.get('/myAds.json');
            const data = response.data;
            const nonOpenAds = data.filter(ad => ad.isOpen !== true);
            setMyAds(nonOpenAds);
        } catch (error) {
            console.error('Error fetching my ads:', error);
        }
    }

    useEffect(() => {
        fetchMyAds();
    }, []);

    // console.log(showModal, selectedAd)


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

    return (
        <main className='min-h-screen bg-gray-100 py-10'>
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto mb-8">
                    <MyCredits />
                </div>
                <div className="max-w-2xl mx-auto">
                    <h1>
                        <span>{t.myAds.myArchiveAds}</span>
                        <NavLink to="/my-ads">
                            <span className="text-xs font-bold"> ({t.myAds.title})</span>
                        </NavLink>
                    </h1>
                    <div className="relative min-h-48 mt-5">
                        <div className="!overflow-visible h-auto flex flex-col gap-2 px-0.5">
                            {myAds.length > 0 ? (
                                myAds.map((ad, index) => (
                                    <MyAdCard key={index} ad={ad} showRenew={true} onClick={handleAdClick} />
                                ))
                            ) : (
                                <div className="text-center mt-8 h-12 font-bold">
                                    {t.myAds.noResults}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
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
        </main>
    )
}
