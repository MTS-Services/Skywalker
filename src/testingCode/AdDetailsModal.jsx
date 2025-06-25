import React, { useState, useEffect } from "react";
import { TfiAngleLeft } from "react-icons/tfi";
import { FiClock, FiEye, FiX, FiPhone, FiShare2 } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

/**
 * AdDetailsModal Component
 * * এটি একটি মডেল যা একটি বিজ্ঞাপনের বিস্তারিত তথ্য প্রদর্শন করে।
 * এতে একটি ইমেজ গ্যালারি, বিজ্ঞাপনের বিবরণ এবং যোগাযোগের অপশন রয়েছে।
 */
export default function AdDetailsModal({
  ad,
  show,
  onClose,
  t,
  isRTL,
  language,
  formatTimeAgo,
}) {
  const [displayImage, setDisplayImage] = useState("");
  const [showLightbox, setShowLightbox] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isLightboxActive, setIsLightboxActive] = useState(false);

  // মডেলের প্রবেশ/প্রস্থান অ্যানিমেশন নিয়ন্ত্রণ করতে
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setIsModalActive(true), 5);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setIsModalActive(false);
    }
  }, [show]);

  // লাইটবক্সের প্রবেশ/প্রস্থান অ্যানিমেশন নিয়ন্ত্রণ করতে
  useEffect(() => {
    if (showLightbox) {
      const timer = setTimeout(() => setIsLightboxActive(true), 5);
      return () => clearTimeout(timer);
    } else {
      setIsLightboxActive(false);
    }
  }, [showLightbox]);

  // যখন একটি বিজ্ঞাপন নির্বাচন করা হয় তখন প্রাথমিক ডিসপ্লে ছবি সেট করতে
  useEffect(() => {
    if (ad && ad.images && ad.images.length > 0) {
      setDisplayImage(ad.images[0]);
    } else {
      setDisplayImage(
        "https://placehold.co/800x600/EBF4FF/333333?text=No+Image",
      );
    }
  }, [ad]);

  if (!ad) {
    return null;
  }

  const whatsappLink = `https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`;

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

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-start bg-black/60 transition-opacity duration-300 ease-in-out ${show ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      >
        <div
          className={`relative flex h-full w-full max-w-5xl transform flex-col bg-white text-gray-800 shadow-lg transition-transform duration-300 ease-out ${
            isRTL
              ? isModalActive
                ? "translate-x-0"
                : "translate-x-full"
              : isModalActive
                ? "translate-x-0"
                : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <header className="relative flex h-20 flex-shrink-0 items-center border-b px-4 py-4 sm:px-6">
            <button
              className={`text-primary-500 -m-2 cursor-pointer p-2 text-2xl ${isRTL ? "rotate-180" : ""}`}
              onClick={onClose}
            >
              <TfiAngleLeft />
            </button>
            <div className="absolute top-1/2 left-1/2 h-10 -translate-x-1/2 -translate-y-1/2 transform">
              <a aria-label="Home" href="/">
                <img alt="Logo" src="/logo.png" className="h-full w-auto" />
              </a>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="bg-primary-700 text-primary-50 flex flex-col items-center px-4 py-6 sm:px-6">
              <h1 className="text-on-primary text-center text-xl font-bold sm:text-2xl">
                {ad.title}
              </h1>
              <div className="mt-2 text-2xl font-bold sm:text-3xl">
                {ad.kd} {t.ads.currency}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                <div className="bg-primary-600 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm">
                  <FiClock />
                  <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
                </div>
                <div className="bg-primary-600 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs sm:text-sm">
                  <FiEye />
                  <span>{ad.views}</span>
                </div>
                <button
                  onClick={() => handleShareClick(ad)}
                  className="bg-primary-600 hover:bg-primary-500 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors sm:text-sm"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className="mx-auto max-w-4xl">
              <p className="text-dark p-4 text-center text-base leading-relaxed sm:p-6 md:text-lg">
                {ad.description}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row">
              <a
                href={`tel:${ad.whatsapp}`}
                className="bg-success text-on-success active:bg-active-success bg-primary-300 inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none sm:w-auto"
              >
                <FiPhone className="text-xl" />
                <span className="text-lg font-normal">{ad.whatsapp}</span>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary-300 text-primary-600 bg-main hover:bg-primary-100 flex h-12 w-full items-center justify-center rounded-lg border p-1 text-2xl transition-colors sm:w-12"
              >
                <FaWhatsapp />
              </a>
            </div>

            <div className="py-6 sm:py-8">
              <div className="container mx-auto px-4">
                <div className="flex max-h-[60vh] justify-center">
                  {displayImage && (
                    <img
                      alt={ad.title}
                      className="max-h-full max-w-full cursor-pointer rounded-lg object-contain"
                      src={displayImage}
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
                          className={`h-14 w-14 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 sm:h-16 sm:w-16 ${displayImage === imgSrc ? "border-primary-500" : "border-transparent"}`}
                          onClick={() => setDisplayImage(imgSrc)}
                        >
                          <img
                            alt={`thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                            src={imgSrc}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {showLightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 sm:p-6"
          onClick={() => setShowLightbox(false)}
        >
          <div
            className={`relative w-full max-w-5xl transform transition-all duration-300 ease-out ${isLightboxActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex aspect-video h-auto max-h-[85vh] w-full items-center justify-center overflow-hidden rounded-md">
              <img
                src={displayImage}
                alt="Lightbox"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </div>
            <button
              className="absolute top-0 -right-0 mt-2 mr-2 rounded-full bg-black/50 p-2 text-2xl text-white transition-all hover:bg-black/80 sm:-top-4 sm:-right-4"
              onClick={() => setShowLightbox(false)}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
