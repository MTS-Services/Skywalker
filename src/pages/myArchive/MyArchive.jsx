import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MyCredits from "../../components/MyCredits";
import MyAdCard from "../../components/shared/MyAdCard";
import axios from "axios";
import DetailsModal from "../adDetails/Modal";
import FabController from "../fab/FabController";
import { useLanguage } from "../../context/LanguageContext";

export default function MyArchive() {
  const [myAds, setMyAds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const { isRTL, t, FloatingActionButton, language } = useLanguage();

  const isMobile = window.innerWidth <= 768;

  async function fetchMyAds() {
    try {
      const response = await axios.get("/myAds.json");
      const data = response.data;
      const nonOpenAds = data.filter((ad) => ad.isOpen !== true);
      setMyAds(nonOpenAds);
    } catch (error) {
      console.error("Error fetching my ads:", error);
    }
  }

  useEffect(() => {
    fetchMyAds();
  }, []);

  // console.log(showModal, selectedAd)

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

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-2xl">
          <MyCredits />
        </div>
        <div className="mx-auto max-w-2xl">
          <h1>
            <span>{t.myAds.myArchiveAds}</span>
            <NavLink to="/my-ads">
              <span className="text-xs font-bold"> ({t.myAds.title})</span>
            </NavLink>
          </h1>
          <div className="relative mt-5 min-h-48">
            <div className="flex h-auto flex-col gap-2 !overflow-visible px-0.5">
              {myAds.length > 0 ? (
                myAds.map((ad, index) => (
                  <MyAdCard
                    key={index}
                    ad={ad}
                    showRenew={true}
                    onClick={handleAdClick}
                  />
                ))
              ) : (
                <div className="mt-8 h-12 text-center font-bold">
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
      {isMobile && !FloatingActionButton && !showModal && <FabController />}
    </main>
  );
}
