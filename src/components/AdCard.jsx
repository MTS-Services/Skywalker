import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiEye } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { formatTimeAgo } from '../utils/dateUtils';

const AdCard = ({ ad }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div
      onClick={() => navigate(`/ads/${ad.slug}`)}
      className="group w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden rounded-md sm:h-36 sm:w-48">
          <img
            alt={ad.title}
            src={
              ad.images && ad.images.length > 0
                ? ad.images[0]
                : 'https://placehold.co/192x144/EBF4FF/333333?text=Ad'
            }
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {ad.isSuper && (
            <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
              {t.ads.super}
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <h4 className="text-dark group-hover:text-primary-600 text-lg font-bold transition-colors">
            {ad.title}
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiClock className="size-4" />
              <span>{formatTimeAgo(ad.postCreateAt, t)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiEye className="size-4" />
              <span>{ad.views}</span>
            </div>
            <div className="text-primary-dark text-lg font-bold">
              {ad.kd} {t.ads.currency}
            </div>
          </div>
          <p className="mt-3 line-clamp-2 text-base text-gray-600">
            {ad.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdCard;