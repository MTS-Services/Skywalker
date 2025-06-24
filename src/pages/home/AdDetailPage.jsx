"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useLanguage } from "../../context/LanguageContext"
import { FiClock, FiEye, FiX, FiShare2, FiPhone } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"

/**
 * AdDetailPage Component
 * Renders the detailed view of a single advertisement.
 * It fetches ad data based on the slug from the URL parameters.
 */
const AdDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t, isRTL, language } = useLanguage()
  const [ad, setAd] = useState(null)
  const [loading, setLoading] = useState(true)
  const [displayImage, setDisplayImage] = useState("")
  const [showLightbox, setShowLightbox] = useState(false)
  const [isLightboxActive, setIsLightboxActive] = useState(false)

  /**
   * Formats a date string into a "time ago" format.
   * @param {string} dateString - The ISO date string to format.
   * @param {string} language - The current language ('en' or 'ar').
   * @returns {string} The formatted time ago string.
   */
  const formatTimeAgo = (dateString, language) => {
    const postDate = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - postDate) / 1000)
    const hours = Math.floor(seconds / 3600)

    if (hours < 1) {
      const minutes = Math.floor(seconds / 60)
      if (minutes < 1) return language === "ar" ? "الآن" : "just now"
      return `${minutes} ${language === "ar" ? "دقيقة" : "minutes"}`
    }

    return `${hours} ${language === "ar" ? "ساعة" : "hours"}`
  }

  /**
   * Handles the share functionality.
   * Uses the Web Share API if available, otherwise copies the link to the clipboard.
   * @param {object} ad - The ad object to be shared.
   */
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

  // Effect to fetch ad details
  useEffect(() => {
    const fetchAd = async () => {
      setLoading(true)
      try {
        const response = await fetch("/data/ads.json")
        const data = await response.json()
        const foundAd = data.find((ad) => ad.slug === slug)
        if (foundAd) {
          setAd(foundAd)
          if (foundAd.images && foundAd.images.length > 0) {
            setDisplayImage(foundAd.images[0])
          }
        } else {
          navigate("/404")
        }
      } catch (error) {
        console.error("Error fetching ad:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAd()
  }, [slug, navigate])

  // Effect for lightbox animation
  useEffect(() => {
    let timer
    if (showLightbox) {
      timer = setTimeout(() => setIsLightboxActive(true), 5)
    } else {
      setIsLightboxActive(false)
    }
    return () => clearTimeout(timer)
  }, [showLightbox])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!ad) {
    return <div className="flex justify-center items-center h-screen">Ad not found</div>
  }

  const whatsappLink = `https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`

  return (
    <>
      <div className="overflow-x-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <div className="flex flex-col items-center bg-primary-700 text-primary-50 rounded-b-lg px-4 sm:px-6 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl md:text-2xl font-bold text-on-primary">{ad.title}</h1>
            <div className="mt-2 text-2xl md:text-3xl font-bold">
              {ad.kd} {t.ads.currency}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-primary-600 py-1.5 px-3 text-sm">
              <FiClock />
              <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-primary-600 py-1.5 px-3 text-sm">
              <FiEye />
              <span>{ad.views}</span>
            </div>
            <button
              onClick={() => handleShareClick(ad)}
              className="flex items-center justify-center gap-1.5 rounded-full bg-primary-600 py-1.5 px-3 text-sm hover:bg-primary-500 transition-colors"
            >
              <FiShare2 />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="p-4 sm:p-6 text-center text-dark text-base md:text-lg leading-relaxed">{ad.description}</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center px-4">
          <a
            href={`tel:${ad.whatsapp}`}
            className="w-full sm:w-auto text-base shrink-0 inline-flex items-center justify-center gap-2 select-none whitespace-nowrap transition-colors disabled:opacity-50 h-12 rounded-lg font-bold bg-success text-on-success active:bg-active-success px-6 bg-primary-300 text-white"
          >
            <FiPhone className="text-xl" />
            <span className="text-lg font-normal">{ad.whatsapp}</span>
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary-300 text-primary-600 rounded-lg p-1 bg-main text-2xl h-12 w-full sm:w-12 flex items-center justify-center hover:bg-primary-100 transition-colors"
          >
            <FaWhatsapp />
          </a>
        </div>

        <div className="py-8 sm:py-12">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex justify-center main-image-container max-h-[70vh]">
              {displayImage && (
                <img
                  alt={ad.title}
                  className="rounded-lg object-contain max-w-full max-h-full cursor-pointer"
                  src={displayImage || "/placeholder.svg"}
                  onClick={() => setShowLightbox(true)}
                />
              )}
            </div>
            {ad.images && ad.images.length > 1 && (
              <div className="mt-4 flex justify-center">
                <div className="flex overflow-x-auto gap-2 p-1">
                  {ad.images.map((imgSrc, index) => (
                    <div
                      key={index}
                      className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${displayImage === imgSrc ? "border-primary-500" : "border-transparent"}`}
                      onClick={() => setDisplayImage(imgSrc)}
                    >
                      <img
                        alt={`thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                        src={imgSrc || "/placeholder.svg"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showLightbox && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-[100] p-4 sm:p-6 transition-opacity duration-300 ease-in-out"
          onClick={() => setShowLightbox(false)}
        >
          <div
            className={`relative w-full max-w-5xl transform transition-all duration-300 ease-out ${isLightboxActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-auto max-h-[85vh] aspect-video overflow-hidden rounded-md flex justify-center items-center">
              <img
                src={displayImage || "/placeholder.svg"}
                alt="Lightbox"
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </div>
            <button
              className="absolute top-0 -right-0 mt-2 mr-2 sm:-top-4 sm:-right-4 text-white text-2xl p-2 rounded-full bg-black/50 hover:bg-black/80 transition-all duration-200"
              onClick={() => setShowLightbox(false)}
            >
              <FiX />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AdDetailPage
