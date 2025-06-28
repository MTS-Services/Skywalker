import { useNavigate } from "react-router-dom"
import { FiAlertTriangle, FiEye, FiPhone, FiShare2, FiX } from "react-icons/fi"
import { RxClock, RxReload } from "react-icons/rx";
import { useLanguage } from "../../context/LanguageContext"
import DiagonalRibbon from "../DiagonalRibbon"
import { BsPin, BsPinFill, BsTranslate } from "react-icons/bs";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const MyAdCard = ({ ad, onClick, showRenew }) => {
    const { isRTL, t, language } = useLanguage()
    const navigate = useNavigate()
    // Renamed state variables for clarity
    const [showMakeSuperModal, setShowMakeSuperModal] = useState(false)
    const [showRemoveSuperModal, setShowRemoveSuperModal] = useState(false)
    const [showRenewModal, setShowRenewModal] = useState(false)
    const [showTranslateModal, setShowTranslateModal] = useState(false)

    const formatTimeAgo = (dateString, lang) => {
        const postDate = new Date(dateString)
        const now = new Date()
        const seconds = Math.floor((now - postDate) / 1000)
        const hours = Math.floor(seconds / 3600)

        if (hours < 1) {
            const minutes = Math.floor(seconds / 60)
            if (minutes < 1) return lang === "ar" ? "الآن" : "just now"
            return `${minutes} ${lang === "ar" ? "دقيقة" : "minutes"} `
        }

        return `${hours} ${lang === "ar" ? "ساعة" : "hours"} `
    }

    const handleClick = () => {
        // if (onClick) {
        onClick(ad)
        // } else {
        //     navigate(`/ ads / ${ad.slug} `)
        // }
    }

    // Updated handlers to use the new state variable names
    const handleMakeSuperModel = () => {
        setShowMakeSuperModal(!showMakeSuperModal)
    }

    const handleRemoveSuperModel = () => {
        setShowRemoveSuperModal(!showRemoveSuperModal)
    }

    const handleOpenRenewModal = () => {
        setShowRenewModal(!showRenewModal)
    }

    const handleOpenTranslateModal = () => {
        setShowTranslateModal(!showTranslateModal)
    }

    return (
        <>
            <div className="relative w-full rounded-lg shadow-card-shadow p-3 xl:p-4 cursor-pointer border border-transparent bg-white">
                <DiagonalRibbon text={ad.isOpen ? (`${t.myAds.open}`) : (ad.isArchive ? (`${t.myAds.archive}`) : (`${t.myAds.deleted}`))} backgroundColor={ad.isOpen ? (`#556895`) : (ad.isArchive ? (`#556885`) : (`#242424`))} />
                <div className="absolute inset-0 bg-transparent rounded-lg z-[1]" onClick={handleClick}></div>

                {/* Main Content */}
                <div className="flex gap-3">
                    {/* Image */}
                    <div className="relative">
                        <div className="size-14 xl:size-28 flex-shrink-0 relative rounded-md overflow-hidden">
                            <img
                                alt={ad.title}
                                src={
                                    ad.images && ad.images.length > 0
                                        ? ad.images[0]
                                        : "https://placehold.co/112x112/EBF4FF/333333?text=Ad"
                                }
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="overflow-hidden pe-6">
                        <div className="font-bold text-lg text-dark line-clamp-2 break-words">
                            {ad.title}
                        </div>

                        <div className="h-0.5"></div>

                        {/* Price & Stats */}
                        <div className="flex gap-3">
                            <div className="rounded font-bold text-primary-900">{ad.kd} {t.ads.currency}</div>

                            <div className="rounded text-xs flex items-center gap-1">
                                <RxClock />
                                <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <FiEye />
                                <div className="text-xs">{ad.views}</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="h-2"></div>
                        <div className="line-clamp-2 text-sm">
                            {ad.description}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="h-4"></div>
                <div className="flex gap-3 items-center justify-center">
                    {/* Action Button 1 */}
                    {showRenew && (
                        <button onClick={handleOpenRenewModal} className="relative z-[2] text-base shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 rounded-lg font-bold text-on-primary bg-transparent m-0 p-0 h-auto active:bg-transparent">
                            <div className="relative flex items-center justify-center rounded cursor-pointer h-6 w-6 active:border bg-green-200">
                                <RxReload className="text-green-700" />
                            </div>
                        </button>
                    )}
                    {/* Action Button 2 */}
                    <button onClick={ad.isSuper ? handleRemoveSuperModel : handleMakeSuperModel} className="relative z-[2] text-base shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 rounded-lg font-bold text-on-primary bg-transparent m-0 p-0 h-auto active:bg-transparent">
                        <div className="relative flex items-center justify-center rounded cursor-pointer h-6 w-6 active:border bg-red-200">
                            {ad.isSuper ? (
                                <BsPinFill className="text-red-700" />
                            ) : (
                                <BsPin className="text-red-700" />
                            )}
                        </div>
                    </button>
                    {/* Action Button 3 */}
                    <button onClick={handleOpenTranslateModal} className="relative z-[2] text-base shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 rounded-lg font-bold text-on-primary bg-transparent m-0 p-0 h-auto active:bg-transparent">
                        <div className="relative flex items-center justify-center rounded cursor-pointer h-6 w-6 active:border bg-indigo-200">
                            <BsTranslate className="text-indigo-700" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Modals */}
            {showMakeSuperModal && addSuperModal({ ad, handleMakeSuperModel, t })}
            {showRemoveSuperModal && removeSuperModal({ ad, handleRemoveSuperModel, t })}
            {showRenewModal && renewModal({ ad, handleOpenRenewModal, t })}
            {showTranslateModal && translateModal({ ad, handleOpenTranslateModal, t, language, isRTL })}

        </>
    )
}

function addSuperModal({ ad, handleMakeSuperModel, t }) {
    return (
        <>
            <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
            <div className="fixed inset-0 w-screen overflow-y-auto z-30">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                        <h2 className="text-xl font-bold mb-2">
                            {t.myAds.confirmation}
                        </h2>
                        <div>
                            <div>{t.myAds.makeSuper}</div>
                            <div className="h-4"></div>
                            <div className="flex flex-row justify-between gap-3">
                                <button onClick={handleMakeSuperModel} className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md text-primary-900 underline-offset-4 mx-7 border border-primary-200 hover:bg-primary-50/50 px-3 py-1">
                                    {t.myAds.cancel}
                                </button>
                                <button onClick={handleMakeSuperModel} className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto  rounded-md font-bold bg-primary text-white active:bg-active-primary  px-5 py-1 bg-primary-500 hover:bg-primary-600">
                                    {t.myAds.confirm}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
function removeSuperModal({ ad, handleRemoveSuperModel, t }) {
    return (
        <>
            <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
            <div className="fixed inset-0 w-screen overflow-y-auto z-30">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                        <h2 className="text-xl font-bold mb-2">
                            {t.myAds.confirmation}
                        </h2>
                        <div>
                            <div>{t.myAds.removeSuper}</div>
                            <div className="h-4"></div>
                            <div className="flex flex-row justify-between gap-3">
                                <button onClick={handleRemoveSuperModel} className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md text-primary-900 underline-offset-4 mx-7 border border-primary-200 hover:bg-primary-50/50 px-3 py-1">
                                    {t.myAds.cancel}
                                </button>
                                <button onClick={handleRemoveSuperModel} className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto  rounded-md font-bold bg-primary text-white active:bg-active-primary  px-5 py-1 bg-primary-500 hover:bg-primary-600">
                                    {t.myAds.confirm}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function renewModal({ ad, handleOpenRenewModal, t }) {
    return (
        <>
            <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
            <div className="fixed inset-0 w-screen overflow-y-auto z-30">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                        <h2 className="text-xl font-bold mb-2">
                            {t.myAds.confirmation}
                        </h2>
                        <div>
                            <div>{t.myAds.renew}</div>
                            <div className="h-4"></div>
                            <div className="flex flex-row justify-between gap-3">
                                <button onClick={handleOpenRenewModal} className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md text-primary-900 underline-offset-4 mx-7 border border-primary-200 hover:bg-primary-50/50 px-3 py-1">
                                    {t.myAds.cancel}
                                </button>
                                <button onClick={handleOpenRenewModal} className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto  rounded-md font-bold bg-primary text-white active:bg-active-primary  px-5 py-1 bg-primary-500 hover:bg-primary-600">
                                    {t.myAds.confirm}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function translateModal({ ad, handleOpenTranslateModal, t, language, isRTL }) {
    const formatTimeAgo = (dateString, lang) => {
        const postDate = new Date(dateString)
        const now = new Date()
        const seconds = Math.floor((now - postDate) / 1000)
        const hours = Math.floor(seconds / 3600)

        if (hours < 1) {
            const minutes = Math.floor(seconds / 60)
            if (minutes < 1) return lang === "ar" ? "just now" : "الآن"
            return `${minutes} ${lang === "ar" ? "minutes" : "دقيقة"}`
        }

        return `${hours} ${lang === "ar" ? "hours" : "ساعة"}`
    }

    const handleShareClick = async (ad) => {
        const adUrl = `${window.location.origin}/ads/${ad.slug}`
        if (navigator.share) {
            try {
                await navigator.share({
                    title: ad.title,
                    text: ad.description,
                    url: adUrl,
                })
            } catch (error) {
                console.error("Error sharing:", error)
            }
        } else {
            try {
                await navigator.clipboard.writeText(adUrl)
                alert(t.ads.linkCopied)
            } catch (err) {
                console.error("Failed to copy text: ", err)
                alert(t.ads.failedToCopy)
            }
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
            <div className="fixed inset-0 w-screen overflow-y-auto z-30" dir={isRTL ? "ltr" : "rtl"}>
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                        <div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-on-main">
                                        {t.myAds.translateTitle}
                                        {/* {language === "ar" ? "Your translated Ad to Arabic is published" : } */}
                                    </h2>

                                    <button onClick={handleOpenTranslateModal}><FiX /></button>
                                </div>
                                <div className="h-4"></div>
                                {/* Warning/Error Message Section */}
                                <div className="overflow-x-hidden">
                                    <div className="flex items-center justify-center gap-2 text-xl p-2 w-full shadow-inner text-white bg-orange-400 rounded-t-lg">
                                        < FiAlertTriangle />

                                        {/* if language is not Arabic
                                        تم حذف هذا الاعلان او إنتهاء مدته
                                        if language is Arabic
                                        This post have been deleted or archived */}
                                        <span>{t.myAds.translateMessage}</span>
                                        {/* <span>{language === "ar" ? "This post have been deleted or archived" : "تم حذف هذا الاعلان او إنتهاء مدته"}</span> */}
                                    </div>
                                    {/* Ad Content Preview Section */}
                                    <div className="flex flex-col items-center bg-primary-400 rounded-b-lg text-white px-6 relative">
                                        <div className="max-w-2xl mx-auto mt-4">
                                            <h1 className="text-on-primary text-center">
                                                {ad.title}
                                            </h1>
                                        </div>
                                        <div className="text-2xl font-bold mt-1.5">{ad.kd} {t.myAds.currency}</div>
                                        <div className="h-6"></div>
                                        <div className="flex gap-3">
                                            <div className="flex items-center justify-center gap-1 rounded bg-primary-300 py-1 px-1.5 text-xs">
                                                <RxClock />
                                                {formatTimeAgo(ad.postCreateAt, language)}
                                            </div>
                                            {/* Views count */}
                                            <div className="flex items-center justify-center gap-1 rounded bg-primary-300 py-1 px-1.5 text-xs min-w-[62px]">
                                                <FiEye />
                                                <div>{ad.views}</div>
                                            </div>
                                            {/* Download button */}
                                            <button onClick={() => handleShareClick(ad)} type="button" className="flex items-stretch">
                                                <div className="flex items-center justify-center gap-1 rounded bg-primary-300 py-1 px-1.5 text-xs">
                                                    <FiShare2 />
                                                </div>
                                            </button>
                                        </div>
                                        <div className="h-6"></div>
                                    </div>
                                </div>
                                {/* Ad Description */}
                                <div className="max-w-2xl mx-auto">
                                    <div className="p-6 text-center text-xl leading-lg">
                                        {ad.description}
                                    </div>
                                </div>
                                {/* Call and WhatsApp Buttons */}
                                <div className="flex gap-3 justify-center">
                                    <a
                                        href={`tel:${ad.whatsapp}`}
                                        className="bg-success active:bg-active-success bg-green-600 inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none sm:w-auto"
                                    >
                                        <FiPhone className={isRTL ? "" : "-rotate-90"} />
                                        <div className="text-xl font-normal">{ad.whatsapp}</div>
                                    </a>
                                    <div>
                                        <a
                                            href={`https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="border-green-600 text-green-600 bg-main hover:bg-green-100 flex h-12 w-full items-center justify-center rounded-lg border p-1 text-2xl transition-colors sm:w-12"
                                        >
                                            <FaWhatsapp />
                                        </a>
                                    </div>
                                </div>
                                <div className="h-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAdCard