import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { TfiAngleLeft } from "react-icons/tfi";
import { LuClock4, LuEye } from "react-icons/lu";
import { RiExternalLinkFill } from "react-icons/ri";


export default function Modal({ ad, show, onClose, t, isRTL, language, formatTimeAgo }) {
    const [displayImage, setDisplayImage] = useState('');
    const [showLightbox, setShowLightbox] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isLightboxActive, setIsLightboxActive] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setIsModalActive(true);
            }, 5);
            return () => clearTimeout(timer);
        } else {
            setIsModalActive(false);
        }
    }, [show]);

    // --- Lightbox Visibility and Animation Logic ---
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
        if (!isModalActive && !show) {
            timer = setTimeout(() => {
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [isModalActive, show]);

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

    if (!ad || !show) {
        return null;
    }

    const formatWhatsAppNumber = (number) => {
        const digitsOnly = number.replace(/\D/g, '');
        return digitsOnly;
    };

    const whatsappLink = `https://wa.me/${formatWhatsAppNumber(ad.whatsapp)}`;

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

    return (
        <>
            {/* Main Modal Overlay and Content */}
            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 z-50 flex max-h-screen
                transition-opacity duration-300 ease-in-out
                ${isModalActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}> {/* Changed to isModalActive */}

                <div className={`relative bg-white text-gray-800 overflow-y-auto h-full max-w-7xl w-full shadow-lg
                    transform transition-transform duration-500 ease-out
                    ${isRTL ?
                        (isModalActive ? 'translate-x-0' : 'translate-x-full') : // RTL: slides in from right
                        (isModalActive ? 'translate-x-0' : '-translate-x-full') // LTR: slides in from left
                    }`}>

                    <div className="min-h-full bg-main post-details-drawer-open-ltr">
                        <div className="relative py-4 px-6 flex items-center h-20">
                            <button className={`p-4 -m-4 cursor-pointer text-3xl text-primary-300 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} onClick={onClose}>
                                <TfiAngleLeft />
                            </button>

                            <div className="w-[156px] h-[44px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <a aria-label="Home" href="https://www.boshamlan.com/en">
                                    <div className="relative w-full h-full">
                                        <img
                                            alt="Logo"
                                            src="/logo.png"
                                            className="absolute inset-0 w-full h-full"
                                        />
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="overflow-x-hidden" dir="ltr">
                            <div className="flex flex-col items-center bg-primary text-primary-50 px-6 relative bg-primary-700">
                                <div className="h-8" />

                                <div className="max-w-2xl mx-auto">
                                    <h1 className="text-primary-50 text-center">
                                        {ad.title}
                                    </h1>
                                </div>

                                <div className="h-1.5" />
                                <div className="text-2xl font-bold text-primary-50">{ad.kd} {t.home.currency}</div>
                                <div className="h-6" />

                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1 rounded bg-primary-600 py-1 px-1.5">
                                        <LuClock4 />
                                        {formatTimeAgo(ad.postCreateAt, language)}
                                    </div>

                                    <div className="flex items-center gap-1 rounded bg-primary-600 py-1 px-1.5 min-w-[62px]">
                                        <LuEye />
                                        <div>{ad.views}</div>
                                    </div>
                                    <div onClick={() => handleShareClick(ad)} className='flex items-center gap-1 rounded bg-primary-600 py-1 px-1.5'>
                                        <RiExternalLinkFill />
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
                                <a href={`tel:${ad.whatsapp}`} className="text-lg inline-flex items-center gap-2 h-12 rounded-lg font-bold bg-success text-on-success px-2.5 bg-primary-300 text-white" >
                                    <FaPhone className='rotate-90 text-white' />
                                    <div className="font-normal">{ad.whatsapp}</div>
                                </a>
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="border border-primary-300 text-primary-600 rounded-lg p-1 text-xl size-12 flex items-center justify-center"
                                >
                                    <FaWhatsapp />
                                </a>
                            </div>

                            <div className="h-12" />

                            {/* Image Gallery */}
                            <div className="container">
                                <div
                                    className="flex justify-center xl:max-h-96 max-h-[67vh] min-h-28"                                    
                                >
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

                                <div className="flex justify-center">
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
                        </div>
                    </div>

                </div>
                <div className="flex-grow" onClick={onClose}></div>
            </div>


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
        </>
    );
}