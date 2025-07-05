import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FiClock, FiEye, FiX, FiShare2, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import dayjs from "dayjs";

/**
 * AdDetailPage Component
 * Renders the detailed view of a single advertisement.
 * It fetches ad data based on the slug from the URL parameters.
 */
const AdDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayImage, setDisplayImage] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const [isLightboxActive, setIsLightboxActive] = useState(false);

  /**
   * Formats a date string into a "time ago" format.
   * @param {string} dateString - The ISO date string to format.
   * @param {string} language - The current language ('en' or 'ar').
   * @returns {string} The formatted time ago string.
   */
  const formatTimeAgo = (dateString, language) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);

    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) return language === "ar" ? "الآن" : "just now";
      return `${minutes} ${language === "ar" ? "دقيقة" : "minutes"}`;
    }

    return `${hours} ${language === "ar" ? "ساعة" : "hours"}`;
  };

  /**
   * Handles the share functionality.
   * Uses the Web Share API if available, otherwise copies the link to the clipboard.
   * @param {object} ad - The ad object to be shared.
   */
  const handleShareClick = async (ad) => {
    const adUrl = `${window.location.origin}/ads/${ad.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: ad.title,
          text: ad.description,
          url: adUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(adUrl);
        alert(t.ads.linkCopied);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        alert(t.ads.failedToCopy);
      }
    }
  };
  const getDaysAgo = (postDate) => {
    const now = new Date();
    const post = new Date(postDate);
    const diffTime = now - post;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Effect to fetch ad details
  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true);
      try {
        const response = await fetch("/ads.json");
        const data = await response.json();
        const foundAd = data.find((ad) => ad.slug === slug);
        if (foundAd) {
          setAd(foundAd);
          if (foundAd.images && foundAd.images.length > 0) {
            setDisplayImage(foundAd.images[0]);
          }
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [slug, navigate]);

  // Effect for lightbox animation
  useEffect(() => {
    let timer;
    if (showLightbox) {
      timer = setTimeout(() => setIsLightboxActive(true), 5);
    } else {
      setIsLightboxActive(false);
    }
    return () => clearTimeout(timer);
  }, [showLightbox]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="flex h-screen items-center justify-center">
        Ad not found
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`;

  return (
    <>
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <div className="bg-primary-600 flex flex-col items-center rounded-b-lg px-4 py-6 text-white sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-4 text-center text-lg md:text-lg lg:text-2xl">
              {ad.title}
            </h1>
            <div className="mt-4 !text-lg font-[var(--font-bold)] sm:text-3xl">
              {ad.kd} {t.ads.currency}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            <div className="bg-primary-300/30 hover:bg-primary-500 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm">
              <FiClock />
              <span>{getDaysAgo(ad.postCreateAt)} Days</span>
            </div>

            <div className="bg-primary-300/30 flex items-center gap-1.5 rounded-md px-2 py-2 text-xs sm:text-sm">
              <FiEye />
              <span>{ad.views}</span>
            </div>
            <button
              onClick={() => handleShareClick(ad)}
              className="bg-primary-300/30 hover:bg-primary-500 flex items-center gap-1.5 rounded-md px-4 py-2 text-xs transition-colors sm:text-sm"
            >
              <FiShare2 />
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="text-dark mt-4 p-4 text-center text-base leading-relaxed sm:p-6 md:text-base">
            {ad.description}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row">
          <a
            href={`tel:${ad.whatsapp}`}
            className="bg-success active:bg-active-success inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-green-600 px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none sm:w-auto"
          >
            <FiPhone className="text-xl" />
            <span className="text-lg font-normal">{ad.whatsapp}</span>
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-main flex h-12 w-full items-center justify-center rounded-lg border border-green-600 p-1 text-2xl text-green-600 transition-colors hover:bg-green-100 sm:w-12"
          >
            <FaWhatsapp />
          </a>
        </div>

        <div className="py-8 sm:py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="main-image-container flex max-h-[70vh] justify-center">
              {displayImage && (
                <img
                  alt={ad.title}
                  className="max-h-full max-w-full cursor-pointer rounded-lg object-contain"
                  src={displayImage || "/placeholder.svg"}
                  onClick={() => setShowLightbox(true)}
                />
              )}
            </div>
            {ad.images && ad.images.length > 1 && (
              <div className="mt-4 flex justify-center">
                <div className="flex gap-2 overflow-x-auto p-1">
                  {ad.images.map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 ${displayImage === imgSrc ? "border-primary-500" : "border-transparent"}`}
                      onClick={() => setDisplayImage(imgSrc)}
                    >
                      <img
                        alt={`thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                        src={imgSrc || "/placeholder.svg"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 ease-in-out sm:p-6"
          onClick={() => setShowLightbox(false)}
        >
          <div
            className={`relative w-full max-w-5xl transform transition-all duration-300 ease-out ${isLightboxActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex aspect-video h-auto max-h-[85vh] w-full items-center justify-center overflow-hidden rounded-md">
              <img
                src={displayImage || "/placeholder.svg"}
                alt="Lightbox"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </div>
            <button
              className="absolute top-0 -right-0 mt-2 mr-2 rounded-full bg-black/50 p-2 text-2xl text-white transition-all duration-200 hover:bg-black/80 sm:-top-4 sm:-right-4"
              onClick={() => setShowLightbox(false)}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdDetailPage;
