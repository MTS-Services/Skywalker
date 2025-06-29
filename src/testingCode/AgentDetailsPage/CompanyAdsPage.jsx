import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FiClock, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import companiesData from "../../../public/companies.json";
import AdDetailsModal from "../AdDetailsModal";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
};

export default function CompanyAdsPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [companyAds, setCompanyAds] = useState([]);
  const [showAdModal, setShowAdModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const { isRTL, t, language } = useLanguage();

  useEffect(() => {
    const foundCompany = companiesData.find((comp) => comp.id === companyId);

    if (foundCompany) {
      setCompany(foundCompany);

      const adsWithSlugs = foundCompany.ads.map((ad) => ({
        ...ad,
        slug: ad.slug || generateSlug(ad.title),
        views: ad.views || 0,
      }));
      setCompanyAds(adsWithSlugs);
    } else {
      setCompany(null);
      setCompanyAds([]);
    }
  }, [companyId]);

  const formatTimeAgo = (dateString, lang) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);

    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) return lang === "ar" ? "الآن" : "just now";
      return `${minutes} ${lang === "ar" ? "دقيقة" : "minutes"}`;
    }

    return `${hours} ${lang === "ar" ? "ساعة" : "hours"}`;
  };

  const handleAdClick = (ad) => {
    setSelectedAd(ad);
    setShowAdModal(true);
  };

  const closeAdModal = () => {
    setShowAdModal(false);
    setTimeout(() => setSelectedAd(null), 300);
  };

  if (!company) {
    return <div className="py-10 text-center">Company not found.</div>;
  }

  return (
    <>
      <section className="bg-primary-700 text-on-primary py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-4 flex h-34 w-34 items-center justify-center overflow-hidden rounded-xl bg-white p-1">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={company.name}
                className="h-full w-full rounded-xl bg-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">🏢</span>
            )}
          </div>

          <h4 className="text-2xl font-bold text-white sm:text-lg">
            {company.name}
          </h4>
          <p className="mx-auto mt-2 px-2 text-center text-[14px] font-bold text-white lg:px-70">
            {company.description}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {company.social_media && company.social_media.whatsapp && (
              <a
                href={`tel:${company.social_media.whatsapp}`}
                className="text-on-success active:bg-active-success inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#38A854] px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none"
              >
                <FiPhone className={`text-xl ${isRTL ? 'rotate-265' : ''}`} />
                <span className="text-lg font-normal">
                  {company.social_media.whatsapp}
                </span>
              </a>
            )}
            {company.social_media && company.social_media.whatsapp && (
              <a
                href={`https://wa.me/${company.social_media.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg border-1 border-[#38A854] bg-white p-1 text-2xl text-[#38A854] transition-colors"
              >
                <FaWhatsapp className="f"></FaWhatsapp>
              </a>
            )}
            {company.social_media && company.social_media.instagram && (
              <a
                href={company.social_media.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg border-1 border-[#38A854] bg-white p-1 text-2xl text-[#38A854] transition-colors"
              >
                {/* Instagram icon (example, assuming you have an icon for it) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Company Ads List Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <h3></h3>
        <div className="container mx-auto px-4">
          <div className="mx-auto w-full max-w-3xl">
            <h3 className="mb-6 px-2 text-base font-[700] text-gray-800">
              {t.agent.companystTitle}({companyAds.length} {t.ads.adsCount})
            </h3>
            <div className="flex flex-col items-center justify-start gap-4">
              {companyAds.length > 0 ? (
                companyAds.map((ad) => (
                  <div
                    key={ad.id}
                    onClick={() => handleAdClick(ad)}
                    className="group w-full cursor-pointer"
                  >
                    <div className="active:border-primary-500 relative w-full rounded-lg border border-gray-200 bg-white p-3 shadow duration-300 sm:p-4">
                      <div className="flex gap-3 sm:gap-4">
                        {/* Image */}
                        <div className="relative flex-shrink-0">
                          <div className="h-20 w-20 overflow-hidden rounded-md sm:h-28 sm:w-28">
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

                        <div className="flex-1 overflow-hidden">
                          <h4 className="text-dark font-primary line-clamp-2 text-[15px] font-[700] break-words transition-colors sm:text-[15px]">
                            {ad.title}
                          </h4>
                          <div className="font-primary mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                            <div className="text-primary-900 py-1 text-sm font-[700]">
                              {ad.kd} {t.ads.currency}
                            </div>
                            <div className="
                            
                            
                            
                            font-primary flex items-center gap-1 text-[12px] font-[400] text-[#556885]">
                              <FiClock className="size-4" />
                              <span>
                                {formatTimeAgo(ad.postCreateAt, language)}
                              </span>
                            </div>
                          </div>
                          <p className="font-primary mt-2 line-clamp-2 text-sm text-[#556885]">
                            {ad.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-primary text-center text-gray-600">
                  No ads found for this company.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Details Modal Component */}
      <AdDetailsModal
        show={showAdModal}
        onClose={closeAdModal}
        ad={selectedAd}
        t={t}
        isRTL={isRTL}
        language={language}
        formatTimeAgo={formatTimeAgo}
      />
    </>
  );
}
