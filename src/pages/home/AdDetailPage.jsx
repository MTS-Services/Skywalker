import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import AdDetails from './AdDetails';

const AdDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

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
          // Handle not found
        }
      } catch (error) {
        console.error('Error fetching ad:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!ad) {
    return <div className="flex justify-center items-center h-screen">Ad not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate(-1)} 
        className={`mb-4 flex items-center text-primary-color ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        {isRTL ? (
          <>
            <span className="ml-2">←</span> {t.home.backButton}
          </>
        ) : (
          <>
            <span className="mr-2">←</span> {t.home.backButton}
          </>
        )}
      </button>
      <AdDetails 
        ad={ad}
        t={t}
        isRTL={isRTL}
        language={language}
        formatTimeAgo={formatTimeAgo}
        handleShareClick={handleShareClick}
        showHeader={false}
        timeFromat={formatTimeAgo}
      />
    </div>
  );
};

export default AdDetailPage;