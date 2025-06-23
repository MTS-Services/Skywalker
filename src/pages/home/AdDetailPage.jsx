import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiClock, FiEye, FiX, FiShare2, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const AdDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayImage, setDisplayImage] = useState('');
  const [showLightbox, setShowLightbox] = useState(false);
  const [isLightboxActive, setIsLightboxActive] = useState(false);

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
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(adUrl);
        alert(language === 'ar' ? t.home.linkCopied : t.home.linkCopied);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert(language === 'ar' ? t.home.failedToCopy : t.home.failedToCopy);
      }
    }
  };

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch('/ads.json');
        const data = await response.json();
        const foundAd = data.find(ad => ad.slug === slug);
        if (foundAd) {
          setAd(foundAd);
        } else {
          navigate('/404');
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [slug]);

  useEffect(() => {
    if (showLightbox) {
      const timer = setTimeout(() => {
        setIsLightboxActive(true);
      }, 5);
      return () => clearTimeout(timer);
    } else {
      setIsLightboxActive(false);
    }
  }, [showLightbox]);

  useEffect(() => {
    let timer;
    if (!isLightboxActive && !showLightbox) {
      timer = setTimeout(() => {
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [isLightboxActive, showLightbox]);

  useEffect(() => {
    if (ad && ad.images && ad.images.length > 0) {
      setDisplayImage(ad.images[0]);
    } else {
      setDisplayImage('');
    }
  }, [ad]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!ad) {
    return <div className="flex justify-center items-center h-screen">Ad not found</div>;
  }

  const formatWhatsAppNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, '');
    return digitsOnly;
  };

  const whatsappLink = `https://wa.me/${formatWhatsAppNumber(ad.whatsapp)}`;


  return (
    <>
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <div className={`flex flex-col items-center bg-primary-700 text-primary-50 rounded-b-lg px-6 relative`}>
          <div className="h-8" />
          <div className="max-w-2xl mx-auto">
            <h1 className="text-on-primary text-center">
              {ad.title}
            </h1>
          </div>
          <div className="h-1.5" />
          <div className="text-2xl font-bold">{ad.kd} {t.home.currency}</div>
          <div className="h-6" />
          <div className="flex gap-3">
            <div className={`flex items-center justify-center gap-1 rounded bg-primary-600 py-1 px-1.5 `}>
              <FiClock />
              <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
            </div>
            <div className="flex items-center justify-center gap-1 rounded bg-primary-600 py-1 px-1.5 min-w-[62px]">
              <FiEye />
              <span>{ad.views}</span>
            </div>
            <div onClick={() => handleShareClick(ad)} className='flex items-center gap-1 rounded bg-primary-600 py-1 px-1.5'>
              <FiShare2 />
            </div>
          </div>
          <div className="h-6" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="p-6 text-center text-dark text-lg leading-xl">
            {ad.description}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <a href={`tel:${ad.whatsapp}`} className="text-base shrink-0 inline-flex items-center justify-center gap-2 select-none whitespace-nowrap transition-colors disabled:opacity-50 h-12 rounded-lg font-bold bg-success text-on-success active:bg-active-success px-2.5 bg-primary-300 text-white">
            <FiPhone className="text-xl" />
            <div className="text-xl font-normal">{ad.whatsapp}</div>
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="border border-primary-300 text-primary-600 rounded-lg p-1 bg-main text-xl size-12 flex items-center justify-center"
          >
            <FaWhatsapp />
          </a>
        </div>

        <div className="h-12" />
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-center main-image-container xl:max-h-96 max-h-[67vh] min-h-28">
            {displayImage && (
              <img
                alt={ad.title}
                className="rounded-lg object-contain cursor-pointer"
                src={displayImage}
                onClick={() => setShowLightbox(true)}
              />
            )}
          </div>
          <div className="h-3.5" />
          <div className="flex justify-center" data-disable-swipe="true">
            <div className="flex overflow-auto gap-2 p-1">
              {Array.isArray(ad.images) && ad.images.slice(0, 10).map((imgId, index) => (
                <div
                  key={index}
                  className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer"
                  onClick={() => setDisplayImage(ad.images[index])}
                >
                  <img
                    alt="thumbnail"
                    className="h-full w-full object-cover"
                    src={ad.images[index]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-6" />

        {showLightbox && (
          <div
            className={`fixed inset-0 bg-black/80 flex justify-center items-center z-[100] p-6
                                        transition-opacity duration-300 ease-in-out`}
            onClick={() => setShowLightbox(false)}
          >
            <div className={`relative w-full max-w-4xl
                                        transform transition-all duration-300 ease-out
                                        ${isLightboxActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-video overflow-hidden rounded-md">
                <img
                  src={displayImage}
                  alt="Lightbox"
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                className="absolute -top-10 -right-10 text-primary-700 text-xl p-2 rounded-full bg-primary-50/80 hover:bg-primary-50 transition-all duration-200"
                onClick={() => setShowLightbox(false)}>
                <FiX />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdDetailPage;