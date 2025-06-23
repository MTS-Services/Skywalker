import React, { useState, useRef, useEffect } from 'react';
import BannerImage from '../../assets/images/home-hero-banner.svg';
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { LuChevronDown } from "react-icons/lu";
import { RiCheckboxBlankLine } from "react-icons/ri";
// Assuming these are the placeholder images for the banner, adjust paths if real images are provided.

// Sample data for regions - in a real app, this would come from an API
const regionsData = [
    { id: 'all', name: { en: 'All Region', ar: 'كل المناطق' }, count: 2134 },
    { id: 'hawally', name: { en: 'Hawally Governorate', ar: 'محافظة حولي' }, count: 726 },
    { id: 'salmiya', name: { en: 'Salmiya', ar: 'السالمية' }, count: 104 },
    { id: 'salwa', name: { en: 'Salwa', ar: 'سلوى' }, count: 90 },
    { id: 'jabriya', name: { en: 'Jabriya', ar: 'الجابرية' }, count: 81 },
    { id: 'rumaithiya', name: { en: 'Rumaithiya', ar: 'الرميثية' }, count: 68 },
    { id: 'hawallyCity', name: { en: 'Hawally', ar: 'حولي' }, count: 64 },
    { id: 'zahra', name: { en: 'Zahra', ar: 'الزهراء' }, count: 63 },
    { id: 'siddeeq', name: { en: 'Siddeeq', ar: 'الصديق' }, count: 56 },
    { id: 'salam', name: { en: 'Salam', ar: 'السلام' }, count: 55 },
];

const propertyTypeData = [ // Renamed to avoid conflict and better reflect its use with MultiSelectDropdown
    { id: 'appartment', name: { en: 'Apartment', ar: 'شقة' } },
    { id: 'house', name: { en: 'House', ar: 'منزل' } },
    { id: 'land', name: { en: 'Land', ar: 'أرض' } },
    { id: 'building', name: { en: 'Building', ar: 'مبنى' } },

]

export default function Hero({ t, isRTL }) {
    // Mocking the useLanguage hook for standalone component functionality

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden">
                {/* Background Image Placeholder */}
                <div className="absolute landscape:bottom-0 portrait:bottom-[calc(50px_+_((100vh_-_667px)_*_0.10))] left-0 right-0 flex justify-center" >
                    <img alt="Background" width="1920" height="426" className="object-contain" src={BannerImage} />
                </div>

                <div className={`container mx-auto max-w-7xl h-full min-h-[calc(100vh-100px)] flex items-center justify-center z-10 p-4`}>
                    <div className="flex flex-col items-center text-center bg-opacity-90 p-8 rounded-lg w-full">
                        <h2 className={`text-xl lg:text-2xl font-bold text-gray-800 mb-2 ${isRTL ? "mr-2" : "ml-2"}`}>
                            {t.home.bannerTitle}
                        </h2>
                        <p className="text-gray-600 mb-6">{t.home.bannerSubTitle}</p>

                        <div className='w-full max-w-md'>
                            <FilterComponent t={t} isRTL={isRTL} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

function FilterComponent({ t, isRTL }) {
    const [selectedOption, setSelectedOption] = useState("Rent"); // Default selected option
    const [selectedRegions, setSelectedRegions] = useState([]); // State for selected regions
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]); // State for selected property types


    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="w-full">
                    {/* Multi-Select Region Dropdown */}
                    <MultiSelectDropdown
                        options={regionsData.map(region => ({
                            id: region.id,
                            name: region.name[isRTL ? 'ar' : 'en'],
                            count: region.count
                        }))}
                        selectedItems={selectedRegions}
                        setSelectedItems={setSelectedRegions}
                        placeholder={t.home.typeAreaPlaceholder}
                        searchPlaceholder={t.home.searchPlaceholder}
                        isRTL={isRTL}
                    />

                    {/* Property Type Multi-Select Dropdown */}
                    <MultiSelectDropdown
                        options={propertyTypeData.map(type => ({
                            id: type.id,
                            name: type.name[isRTL ? 'ar' : 'en'],
                            // Property types don't have counts in your sample data, so no 'count' prop here
                        }))}
                        selectedItems={selectedPropertyTypes}
                        setSelectedItems={setSelectedPropertyTypes}
                        placeholder={t.home.propertyTypePlaceholder}
                        searchPlaceholder={t.home.searchPlaceholder} // You might want a specific placeholder for property type search
                        isRTL={isRTL}
                    />

                    {/* Rent/Sale/Exchange Buttons */}
                    <div className={`flex justify-center mb-6 rounded-full overflow-hidden border border-primary-color gap-1 p-1 `}>
                        <button
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition duration-300 ease-in-out cursor-pointer
            ${selectedOption === 'Rent' ? 'bg-primary-color text-white' : 'bg-white text-primary-color hover:bg-primary-color/10'}`}
                            onClick={() => handleOptionClick('Rent')}
                        >
                            {t.home.rent}
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition duration-300 ease-in-out cursor-pointer
            ${selectedOption === 'Sale' ? 'bg-primary-color text-white' : 'bg-white text-primary-color hover:bg-primary-color/10'}`}
                            onClick={() => handleOptionClick('Sale')}
                        >
                            {t.home.sale}
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-full transition duration-300 ease-in-out cursor-pointer
            ${selectedOption === 'Exchange' ? 'bg-primary-color text-white' : 'bg-white text-primary-color hover:bg-primary-color/10'}`}
                            onClick={() => handleOptionClick('Exchange')}
                        >
                            {t.home.exchange}
                        </button>
                    </div>

                    {/* Search Button */}
                    <button
                        className="w-full py-3 bg-primary-color text-white font-semibold rounded-full shadow-lg hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-opacity-50 transition duration-300 ease-in-out cursor-pointer"
                    >
                        {t.home.searchButton}
                    </button>
                </div>
            </form>
        </>
    );
}

function MultiSelectDropdown({ options, selectedItems, setSelectedItems, placeholder, searchPlaceholder, isRTL }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleItem = (item) => {
        setSelectedItems((prev) =>
            prev.some((selected) => selected.id === item.id)
                ? prev.filter((selected) => selected.id !== item.id)
                : [...prev, item]
        );
    };

    const removeItem = (itemToRemove) => {
        setSelectedItems((prev) => prev.filter((item) => item.id !== itemToRemove.id));
    };

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative mb-4 w-full" ref={dropdownRef}>
            {/* Selected Tags Display */}
            {selectedItems.length > 0 && (
                <div className={`flex flex-wrap gap-2 mb-2 p-2 rounded-2xl border border-gray-200 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    {selectedItems.map((item) => (
                        <span
                            key={item.id}
                            className="flex items-center bg-primary-color/10 !text-black dark:text-white text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap"
                        >
                            {item.name}
                            <button
                                type="button"
                                onClick={() => removeItem(item)}
                                className={`ml-2 text-primary-color hover:text-primary-color focus:outline-none ${isRTL ? 'mr-2 ml-0' : 'ml-2 mr-0'}`}
                            >
                                <RxCross2 />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Input Field (acts as dropdown trigger) */}
            <div
                className={`w-full p-3 pr-4 border border-gray-300 rounded-full focus-within:ring-2 focus-within:ring-primary-color bg-white cursor-pointer flex items-center ${isRTL ? 'pl-4 text-right' : 'pr-4 text-left'}`}
                onClick={() => setIsOpen(!isOpen)}
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
                <span className={`text-gray-400 ${isRTL ? 'right-3 ml-2' : 'left-3 mr-2'}`}>
                    <BiSearch />
                </span>
                <span className="flex-grow text-gray-500">
                    {placeholder}
                </span>
                <span className={`text-gray-400 ${isRTL ? 'left-3 mr-2' : 'right-3 ml-2'}`}>
                    <LuChevronDown />
                </span>
            </div>

            {/* Dropdown List */}
            {isOpen && (
                <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2">
                        <div className="relative">
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className={`w-full p-2 border border-gray-300 rounded-md pl-10 ${isRTL ? 'pr-10 text-right' : 'pl-10 text-left'}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                        />
                        <span className={`absolute inset-y-0 flex items-center ${isRTL ? 'right-3' : 'left-3'} text-gray-400`}>
                            <BiSearch />
                        </span>
                        {searchTerm && (
                            <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className={`absolute inset-y-0 flex items-center ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}
                            >
                            <RxCross2 />
                            </button>
                        )}
                        </div>
                    </div>
                    <ul className="p-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <li
                                    key={option.id}
                                    className={`flex items-center justify-between p-2 cursor-pointer hover:bg-blue-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                                    onClick={() => toggleItem(option)}
                                >
                                    <label className={`flex items-center cursor-pointer flex-grow ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.some((item) => item.id === option.id)}
                                            onChange={() => toggleItem(option)}
                                            className={`form-checkbox h-4 w-4 text-primary-color rounded ${isRTL ? 'ml-2' : 'mr-2'}`}
                                        />
                                        <span className={`text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>{option.name}</span>
                                    </label>
                                    {option.count && <span className="text-gray-500 text-sm">({option.count})</span>}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500 text-center">{isRTL ? 'لا توجد نتائج' : 'No results found.'}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}