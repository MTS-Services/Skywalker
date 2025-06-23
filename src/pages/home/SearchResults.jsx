import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiClock, FiX } from 'react-icons/fi';

const allRegions = [
    { id: 'all', name: { en: 'All Region', ar: 'كل المناطق' } },
    { id: 'hawally', name: { en: 'Hawally Governorate', ar: 'محافظة حولي' } },
    { id: 'salmiya', name: { en: 'Salmiya', ar: 'السالمية' } },
    { id: 'salwa', name: { en: 'Salwa', ar: 'سلوى' } },
    { id: 'jabriya', name: { en: 'Jabriya', ar: 'الجابرية' } },
];

const allPropertyTypes = [
    { id: 'apartment', name: { en: 'Apartment', ar: 'شقة' } },
    { id: 'house', name: { en: 'House', ar: 'منزل' } },
    { id: 'land', name: { en: 'Land', ar: 'أرض' } },
    { id: 'building', name: { en: 'Building', ar: 'مبنى' } },
];

const transactionTypes = [
    { id: 'rent', name: { en: 'Rent', ar: 'ايجار' } },
    { id: 'sale', name: { en: 'Sale', ar: 'بيع' } },
    { id: 'exchange', name: { en: 'Exchange', ar: 'بدل' } },
];


const SearchResults = () => {
    const { t, isRTL, language } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    const [allAds, setAllAds] = useState([]);
    const [loading, setLoading] = useState(true);

    const filters = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            transactionType: params.get('transactionType'),
            regions: params.getAll('regions'),
            propertyTypes: params.getAll('propertyTypes'),
        };
    }, [location.search]);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const response = await fetch('/ads.json');
                const data = await response.json();
                setAllAds(data);
            } catch (error) {
                console.error('Error fetching ads:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);
    
    const filteredAds = useMemo(() => {
        if (!allAds.length) return [];
        return allAds.filter(ad => {
            const transactionMatch = !filters.transactionType || ad.transactionType === filters.transactionType;
            const regionMatch = filters.regions.length === 0 || filters.regions.includes(ad.region);
            const propertyTypeMatch = filters.propertyTypes.length === 0 || filters.propertyTypes.includes(ad.propertyType);
            return transactionMatch && regionMatch && propertyTypeMatch;
        });
    }, [allAds, filters]);

    const handleRemoveFilter = (key, value) => {
        const params = new URLSearchParams(location.search);
        const currentValues = params.getAll(key);
        
        // For multi-value filters, remove only the specific value
        if(currentValues.length > 1) {
            params.delete(key);
            currentValues.filter(v => v !== value).forEach(v => params.append(key, v));
        } else {
             params.delete(key);
        }
        
        navigate(`/search?${params.toString()}`);
    };

    const getFilterName = (type, id) => {
        const lang = isRTL ? 'ar' : 'en';
        let source;
        if (type === 'regions') source = allRegions;
        else if (type === 'propertyTypes') source = allPropertyTypes;
        else if (type === 'transactionType') source = transactionTypes;
        else return id;
        
        const item = source.find(i => i.id === id);
        return item ? item.name[lang] : id;
    };
    
    return (
        <div>
            <div className={`container mx-auto px-4 py-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Active Filters Display */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="font-semibold">{t.search.activeFilters}:</span>
                    {filters.transactionType && (
                        <FilterTag 
                            label={getFilterName('transactionType', filters.transactionType)} 
                            onRemove={() => handleRemoveFilter('transactionType', filters.transactionType)} 
                        />
                    )}
                    {filters.regions.map(regionId => (
                        <FilterTag 
                            key={regionId} 
                            label={getFilterName('regions', regionId)} 
                            onRemove={() => handleRemoveFilter('regions', regionId)} 
                        />
                    ))}
                    {filters.propertyTypes.map(typeId => (
                        <FilterTag 
                            key={typeId} 
                            label={getFilterName('propertyTypes', typeId)} 
                            onRemove={() => handleRemoveFilter('propertyTypes', typeId)}
                        />
                    ))}
                </div>

                <h1 className="text-2xl font-bold mb-6">
                    {t.search.searchResults} ({loading ? '...' : filteredAds.length} {t.search.ads})
                </h1>

                {loading ? (
                    <p>{t.search.loading}</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredAds.length > 0 ? (
                            filteredAds.map(ad => <AdCard key={ad.id} ad={ad} t={t} language={language} isRTL={isRTL} />)
                        ) : (
                            <p className="text-center text-gray-500 col-span-full">{t.search.noResultsFound}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


const FilterTag = ({ label, onRemove }) => (
    <span className="flex items-center bg-primary-100 text-primary-800 text-sm font-medium pl-3 pr-2 py-1 rounded-full">
        {label}
        <button onClick={onRemove} className="ml-2 text-primary-600 hover:text-primary-900">
            <FiX size={16} />
        </button>
    </span>
);


const AdCard = ({ ad, t, language, isRTL }) => {
    const navigate = useNavigate();

    const formatTimeAgo = (dateString, lang) => {
        // Implementation from your Ads.jsx component
        const postDate = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - postDate) / 1000);
        const hours = Math.floor(seconds / 3600);

        if (hours < 1) {
          const minutes = Math.floor(seconds / 60);
          if(minutes < 1) return lang === 'ar' ? "الآن" : "just now";
          return `${minutes} ${lang === 'ar' ? 'دقيقة' : 'minutes'}`;
        }
        
        return `${hours} ${lang === 'ar' ? "ساعة" : "hours"}`;
    };
    
    return (
        <div
            onClick={() => navigate(`/ads/${ad.slug}`)}
            className="w-full cursor-pointer group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                <div className="flex-shrink-0 relative w-full sm:w-48 h-48 sm:h-auto rounded-md overflow-hidden">
                    <img
                        alt={ad.title}
                        src={ad.images && ad.images.length > 0 ? ad.images[0] : 'https://placehold.co/192x192/EBF4FF/333333?text=Ad'}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                     {ad.isSuper && (
                         <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                             {t.search.super}
                         </div>
                     )}
                </div>
                <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-lg text-dark group-hover:text-primary-600 transition-colors">
                        {ad.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className="font-bold text-primary-dark text-lg">
                            {ad.kd} {t.search.currency}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <FiClock className="size-4" />
                            <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
                        </div>
                    </div>
                    <p className="mt-3 text-gray-600 line-clamp-3 text-base">
                        {ad.description}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default SearchResults;
