import React from 'react';
import { FiClock, FiEye, FiMapPin, FiInfo, FiHash, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const AdDetails = ({ 
  ad, 
  t, 
  isRTL, 
  language, 
  formatTimeAgo, 
  handleShareClick,
  showHeader = true,
  onClose
}) => {
  const formatWhatsAppNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, '');
    return digitsOnly;
  };

  const whatsappLink = `https://wa.me/${formatWhatsAppNumber(ad.whatsapp)}`;

  return (
    <div className={`${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {showHeader && (
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-800">{ad.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      
      <div className="p-4">
        {/* Image */}
        {ad.images && ad.images.length > 0 && (
          <div className="mb-4">
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="w-full h-auto max-h-80 object-cover rounded-md"
            />
            {ad.images.length > 1 && (
              <p className="text-sm text-gray-500 text-center mt-2">
                ({ad.images.length} {language === 'ar' ? 'صور' : 'images'} available)
              </p>
            )}
          </div>
        )}

        {/* Price */}
        <div className="text-2xl font-bold text-primary-dark mb-4">
          {ad.kd} {t.home.kd}
        </div>

        {/* Details: Time, Views */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <FiClock className="shrink-0 size-4" />
            <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiEye className="shrink-0 size-4" />
            <span>{ad.views} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
          </div>
        </div>

        {/* Description */}
        <h3 className="font-bold text-lg text-dark mb-2">{t.home.description}</h3>
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{ad.description}</p>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {ad.area && (
            <div className="flex items-center gap-2">
              <FiMapPin className="text-gray-500" />
              <strong>{t.home.area}:</strong> {ad.area}
            </div>
          )}
          <div className="flex items-center gap-2">
            <FiHash className="text-gray-500" />
            <strong>{t.home.adId}:</strong> {ad.id}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            <FaWhatsapp size={20} />
            {t.home.whatsapp}: {ad.whatsapp}
          </a>
          <button
            onClick={() => handleShareClick(ad)}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            <FiShare2 size={20} />
            {t.home.shareAd}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;