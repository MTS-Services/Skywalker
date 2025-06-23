import React, { useState, useEffect } from 'react';
import { TfiAngleLeft } from "react-icons/tfi";
import { FiClock, FiEye, FiX, FiPhone, FiShare2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * DetailsModal Component
 * * A modal that displays detailed information about an advertisement.
 * It includes an image gallery, ad details, and contact actions.
 */
export default function DetailsModal({ ad, show, onClose, t, isRTL, language, formatTimeAgo }) {
    const [displayImage, setDisplayImage] = useState('');
    const [showLightbox, setShowLightbox] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isLightboxActive, setIsLightboxActive] = useState(false);

    // Effect to control modal enter/exit animation
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
            const timer = setTimeout(() => setIsModalActive(true), 5);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = '';
            setIsModalActive(false);
        }
    }, [show]);

    // Effect to control lightbox enter/exit animation
    useEffect(() => {
        if (showLightbox) {
            const timer = setTimeout(() => setIsLightboxActive(true), 5);
            return () => clearTimeout(timer);
        } else {
            setIsLightboxActive(false);
        }
    }, [showLightbox]);

    // Effect to set the initial display image when an ad is selected
    useEffect(() => {
        if (ad && ad.images && ad.images.length > 0) {
            setDisplayImage(ad.images[0]);
        } else {
            setDisplayImage('https://placehold.co/800x600/EBF4FF/333333?text=No+Image');
        }
    }, [ad]);

    if (!ad) {
        return null;
    }
    
    const whatsappLink = `https://wa.me/${ad.whatsapp.replace(/\D/g, '')}`;

    const handleShareClick = async (ad) => {
        const adUrl = `${window.location.origin}/ads/${ad.slug}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: ad.title, text: ad.description, url: adUrl });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(adUrl);
                alert(t.ads.linkCopied);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert(t.ads.failedToCopy);
            }
        }
    };
    
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-50 flex justify-start
                    transition-opacity duration-300 ease-in-out
                    ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            >
                <div 
                    className={`relative bg-white text-gray-800 h-full w-full max-w-5xl shadow-lg
                        transform transition-transform duration-300 ease-out flex flex-col
                        ${isRTL ? 
                            (isModalActive ? 'translate-x-0' : 'translate-x-full') : 
                            (isModalActive ? 'translate-x-0' : '-translate-x-full')
                        }`}
                    onClick={(e) => e.stopPropagation()}
                    dir={isRTL ? "rtl" : "ltr"}
                >
                    <header className="relative py-4 px-4 sm:px-6 flex items-center h-20 border-b flex-shrink-0">
                        <button className={`p-2 -m-2 cursor-pointer text-2xl text-primary-500 ${isRTL ? 'rotate-180' : ''}`} onClick={onClose}>
                            <TfiAngleLeft />
                        </button>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-10">
                            <a aria-label="Home" href="/">
                                <img alt="Logo" src="/logo.png" className="h-full w-auto" />
                            </a>
                        </div>
                    </header>

                    <main className="overflow-y-auto flex-1">
                        <div className="flex flex-col items-center bg-primary-700 text-primary-50 px-4 sm:px-6 py-6">
                            <h1 className="text-xl sm:text-2xl font-bold text-center text-on-primary">{ad.title}</h1>
                            <div className="mt-2 text-2xl sm:text-3xl font-bold">{ad.kd} {t.ads.currency}</div>
                            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                                <div className="flex items-center gap-1.5 rounded-full bg-primary-600 py-1 px-3 text-xs sm:text-sm"><FiClock /><span>{formatTimeAgo(ad.postCreateAt, language)}</span></div>
                                <div className="flex items-center gap-1.5 rounded-full bg-primary-600 py-1 px-3 text-xs sm:text-sm"><FiEye /><span>{ad.views}</span></div>
                                <button onClick={() => handleShareClick(ad)} className='flex items-center gap-1.5 rounded-full bg-primary-600 py-1 px-3 text-xs sm:text-sm hover:bg-primary-500 transition-colors'><FiShare2 /></button>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <p className="p-4 sm:p-6 text-center text-dark text-base md:text-lg leading-relaxed">{ad.description}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
                            <a href={`tel:${ad.whatsapp}`} className="w-full sm:w-auto text-base shrink-0 inline-flex items-center justify-center gap-2 select-none whitespace-nowrap transition-colors h-12 rounded-lg font-bold bg-success text-on-success active:bg-active-success px-6 bg-primary-300 text-white">
                                <FiPhone className="text-xl" />
                                <span className="text-lg font-normal">{ad.whatsapp}</span>
                            </a>
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="border border-primary-300 text-primary-600 rounded-lg p-1 bg-main text-2xl h-12 w-full sm:w-12 flex items-center justify-center hover:bg-primary-100 transition-colors">
                                <FaWhatsapp />
                            </a>
                        </div>
                        
                        <div className="py-6 sm:py-8">
                            <div className="container mx-auto px-4">
                                <div className="flex justify-center max-h-[60vh]">
                                    {displayImage && (
                                        <img alt={ad.title} className="rounded-lg object-contain max-w-full max-h-full cursor-pointer" src={displayImage} onClick={() => setShowLightbox(true)} />
                                    )}
                                </div>
                                {ad.images && ad.images.length > 1 && (
                                <div className="mt-4 flex justify-center">
                                    <div className="flex overflow-x-auto gap-2 p-1">
                                        {ad.images.map((imgSrc, index) => (
                                            <div key={index} className={`h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${displayImage === imgSrc ? 'border-primary-500' : 'border-transparent'}`} onClick={() => setDisplayImage(imgSrc)}>
                                                <img alt={`thumbnail ${index + 1}`} className="h-full w-full object-cover" src={imgSrc} />
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
                    className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100] p-4 sm:p-6 transition-opacity duration-300"
                    onClick={() => setShowLightbox(false)}
                >
                    <div className={`relative w-full max-w-5xl transform transition-all duration-300 ease-out ${isLightboxActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="w-full h-auto max-h-[85vh] aspect-video overflow-hidden rounded-md flex justify-center items-center">
                            <img src={displayImage} alt="Lightbox" className="w-auto h-auto max-w-full max-h-full object-contain" />
                        </div>
                        <button className="absolute top-0 -right-0 mt-2 mr-2 sm:-top-4 sm:-right-4 text-white text-2xl p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all" onClick={() => setShowLightbox(false)}>
                            <FiX />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
