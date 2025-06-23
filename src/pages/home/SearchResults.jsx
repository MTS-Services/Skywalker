import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiClock, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { LuChevronDown } from "react-icons/lu";

// --- Data Constants ---
const allRegions = [
    { id: 'all', name: { en: 'All Region', ar: 'كل المناطق' } },
    { id: 'hawally', name: { en: 'Hawally', ar: 'حولي' } },
    { id: 'salmiya', name: { en: 'Salmiya', ar: 'السالمية' } },
    { id: 'salwa', name: { en: 'Salwa', ar: 'سلوى' } },
    { id: 'jabriya', name: { en: 'Jabriya', ar: 'الجابرية' } },
];
const allPropertyTypes = [
    { id: 'apartment', name: { en: 'Apartment', ar: 'شقة' } },
    { id: 'house', name: { en: 'House', ar: 'منزل' } },
    { id: 'land', name: { en: 'Land', ar: 'أرض' } },
    { id: 'building', name: { en: 'Building', ar: 'مبنى' } },
    { id: 'chalet', name: { en: 'Chalet', ar: 'شاليه' } },
    { id: 'farm', name: { en: 'Farm', ar: 'مزرعة' } },
];
const transactionTypes = [
    { id: 'rent', name: { en: 'Rent', ar: 'ايجار' } },
    { id: 'sale', name: { en: 'Sale', ar: 'بيع' } },
    { id: 'exchange', name: { en: 'Exchange', ar: 'بدل' } },
];

/**
 * Main SearchResults Page Component
 */
const SearchResults = () => {
    const { t, isRTL, language } = useLanguage();
    const location = useLocation();
    const [allAds, setAllAds] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters are derived directly from the URL search params
    const filters = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            transactionType: params.get('transactionType') || 'sale',
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
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className={`container mx-auto px-4 py-6`} dir={isRTL ? 'rtl' : 'ltr'}>
                {/* --- New Filter Bar --- */}
                <SearchFilterBar initialFilters={filters} t={t} isRTL={isRTL} />
                
                <h1 className="text-2xl font-bold mb-6 mt-8">
                    {t.search.searchResults} ({loading ? '...' : filteredAds.length} {t.search.ads})
                </h1>

                {loading ? (
                    <div className="text-center p-10">{t.search.loading}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredAds.length > 0 ? (
                            filteredAds.map(ad => <AdCard key={ad.id} ad={ad} t={t} language={language} />)
                        ) : (
                            <div className="text-center p-10 text-gray-500 col-span-full bg-white rounded-lg shadow">
                                {t.search.noResultsFound}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * The main filter bar component, styled like the Hero filter.
 */
const SearchFilterBar = ({ initialFilters, t, isRTL }) => {
    const navigate = useNavigate();
    
    // States for each filter control, initialized from URL params
    const [transactionType, setTransactionType] = useState(initialFilters.transactionType);
    const [selectedRegions, setSelectedRegions] = useState(
        allRegions
            .filter(r => initialFilters.regions.includes(r.id))
            .map(r => ({ ...r, name: r.name[isRTL ? 'ar' : 'en'] })) // FIX: Ensure name is a string here
    );
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(
        allPropertyTypes
            .filter(p => initialFilters.propertyTypes.includes(p.id))
            .map(p => ({ ...p, name: p.name[isRTL ? 'ar' : 'en'] })) // FIX: Ensure name is a string here
    );

    // This effect synchronizes the URL with the local state of the filters
    useEffect(() => {
        const params = new URLSearchParams();
        if (transactionType) {
            params.set('transactionType', transactionType);
        }
        selectedRegions.forEach(region => {
            if (region.id !== 'all') {
                params.append('regions', region.id);
            }
        });
        selectedPropertyTypes.forEach(type => {
            params.append('propertyTypes', type.id);
        });
        
        // Using replace to avoid bloating browser history on every filter change
        navigate(`/search?${params.toString()}`, { replace: true });

    }, [transactionType, selectedRegions, selectedPropertyTypes, navigate]);

    return (
        <div className='w-full bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiSelectDropdown
                    options={allRegions.map(region => ({...region, name: region.name[isRTL ? 'ar' : 'en']}))}
                    selectedItems={selectedRegions}
                    setSelectedItems={setSelectedRegions}
                    placeholder={t.search.typeAreaPlaceholder}
                    searchPlaceholder={t.search.searchPlaceholder}
                    isRTL={isRTL}
                />
                <MultiSelectDropdown
                    options={allPropertyTypes.map(type => ({...type, name: type.name[isRTL ? 'ar' : 'en']}))}
                    selectedItems={selectedPropertyTypes}
                    setSelectedItems={setSelectedPropertyTypes}
                    placeholder={t.search.propertyTypePlaceholder}
                    searchPlaceholder={t.search.searchPlaceholder}
                    isRTL={isRTL}
                />
            </div>
            <div className="flex justify-center rounded-full overflow-hidden border border-primary-400 gap-1 p-1 bg-white">
                {transactionTypes.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out ${transactionType === option.id ? 'bg-primary-400 text-white' : 'bg-transparent text-primary-400 hover:bg-primary-50'}`}
                        onClick={() => setTransactionType(option.id)}
                    >
                        {option.name[isRTL ? 'ar' : 'en']}
                    </button>
                ))}
            </div>
        </div>
    );
};

/**
 * A reusable multi-select dropdown component, adapted from Hero.jsx.
 */
function MultiSelectDropdown({ options, selectedItems, setSelectedItems, placeholder, searchPlaceholder, isRTL }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Custom hook for closing dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleItem = (item) => {
        setSelectedItems((prev) =>
            prev.some((selected) => selected.id === item.id)
                ? prev.filter((selected) => selected.id !== item.id)
                : [...prev, { ...item, name: item.name }] // Ensure name is a string when added from selected options
        );
    };

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className="w-full p-3 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-primary-400 bg-white cursor-pointer flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-gray-400"><BiSearch size={20} /></span>
                <div className={`flex-grow px-2 text-gray-500 ${isRTL ? 'text-right' : 'text-left'} flex flex-wrap gap-1 min-h-[24px]`}>
                    {selectedItems.length > 0 ? 
                        selectedItems.map(item => (
                            <span key={item.id} className="flex items-center bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                                {item.name}
                                <button type="button" onClick={(e) => { e.stopPropagation(); toggleItem(item);}} className={`${isRTL ? 'mr-1' : 'ml-1'} hover:text-red-500`}>
                                    <RxCross2 />
                                </button>
                            </span>
                        ))
                        : placeholder
                    }
                </div>
                <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}><LuChevronDown size={20} /></span>
            </div>
            {isOpen && (
                <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className={`w-full p-2 border border-gray-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <ul className="p-1">
                        {filteredOptions.length > 0 ? filteredOptions.map((option) => (
                            <li
                                key={option.id}
                                className={`flex items-center justify-between p-2 cursor-pointer hover:bg-primary-50 rounded-md ${isRTL ? 'flex-row-reverse' : ''}`}
                                onClick={() => toggleItem(option)}
                            >
                                <div className={`flex items-center ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <input
                                        type="checkbox"
                                        readOnly
                                        checked={selectedItems.some((item) => item.id === option.id)}
                                        className="form-checkbox h-4 w-4 text-primary-400 rounded cursor-pointer"
                                    />
                                    <span className={`text-gray-800 ${isRTL ? 'mr-2' : 'ml-2'}`}>{option.name}</span>
                                </div>
                                {option.count && <span className="text-gray-500 text-sm">({option.count})</span>}
                            </li>
                        )) : (
                            <li className="p-2 text-gray-500 text-center">{t.search.noResults}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

/**
 * AdCard Component: Renders a single ad in the list.
 */
const AdCard = ({ ad, t, language }) => {
    const navigate = useNavigate();

    const formatTimeAgo = (dateString, lang) => {
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
                <div className="flex-shrink-0 relative w-full sm:w-48 h-48 sm:h-36 rounded-md overflow-hidden">
                    <img
                        alt={ad.title}
                        src={ad.images && ad.images.length > 0 ? ad.images[0] : 'https://placehold.co/192x144/EBF4FF/333333?text=Ad'}
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
                    <p className="mt-3 text-gray-600 line-clamp-2 text-base">
                        {ad.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;