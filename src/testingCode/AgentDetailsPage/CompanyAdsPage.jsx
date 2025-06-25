import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FiClock, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Temporary data imports - In a real application, you'd fetch this from an API
// আপনার দেওয়া JSON ডেটা সরাসরি ব্যবহার করা হচ্ছে, তাই companiesData আমদানি করার দরকার নেই।
// কিন্তু এই উদাহরণের জন্য, আমরা companiesData ইম্পোর্ট করছি, ধরে নিচ্ছি এটি আপনার ফাইল সিস্টেমে বিদ্যমান।
import companiesData from "../../../public/companies.json"; // Assuming this path is correct
import AdDetailsModal from "../AdDetailsModal";

/**
 * Generates a URL-friendly slug from a string.
 * @param {string} title - The string to convert.
 * @returns {string} The generated slug.
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
};

/**
 * CompanyAdsPage Component
 * Displays a company's profile and its associated advertisements.
 * Allows users to view ad details in a modal.
 */
export default function CompanyAdsPage() {
  const { companyId } = useParams(); // URL থেকে companyId নিচ্ছি
  const [company, setCompany] = useState(null);
  const [companyAds, setCompanyAds] = useState([]);
  const [showAdModal, setShowAdModal] = useState(false); // মোডাল দেখানোর জন্য স্টেট
  const [selectedAd, setSelectedAd] = useState(null); // নির্বাচিত বিজ্ঞাপনের ডেটা রাখার জন্য স্টেট
  const { isRTL, t, language } = useLanguage();

  useEffect(() => {
    // কোম্পানির ডেটা ফেচ করা
    const foundCompany = companiesData.find((comp) => comp.id === companyId);

    if (foundCompany) {
      setCompany(foundCompany);
      // কোম্পানির ads অ্যারে থেকে বিজ্ঞাপনগুলি সেট করা
      const adsWithSlugs = foundCompany.ads.map((ad) => ({
        ...ad,
        slug: ad.slug || generateSlug(ad.title),
        views: ad.views || 0, // Ensure views exist
      }));
      setCompanyAds(adsWithSlugs);
    } else {
      setCompany(null);
      setCompanyAds([]);
    }
  }, [companyId]);

  // সময়কে "X ঘন্টা আগে" বা "X মিনিট আগে" ফর্ম্যাটে দেখানোর জন্য ফাংশন
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

  // বিজ্ঞাপনের কার্ডে ক্লিক করলে মোডাল খোলার ফাংশন
  const handleAdClick = (ad) => {
    setSelectedAd(ad);
    setShowAdModal(true);
  };

  // মোডাল বন্ধ করার ফাংশন
  const closeAdModal = () => {
    setShowAdModal(false);
    // অ্যানিমেশন শেষ হওয়ার জন্য কিছুটা বিলম্ব করে ডেটা পরিষ্কার করা
    setTimeout(() => setSelectedAd(null), 300);
  };

  // যদি কোম্পানি না পাওয়া যায়, তাহলে "Company not found" দেখানো হবে।
  if (!company) {
    return <div className="py-10 text-center">Company not found.</div>;
  }

  return (
    <>
      {/* Company Profile Section */}
      <section className="bg-primary-700 text-on-primary py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Company Logo/Placeholder */}
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
            {company.logo_url ? ( // logo_url ব্যবহার করুন
              <img
                src={company.logo_url} // logo_url ব্যবহার করুন
                alt={company.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-4xl text-gray-400">🏢</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {company.name}
          </h1>
          <p className="mt-2 text-lg text-white">{company.description}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {/* আপনার ডেটাতে 'phone' প্রপার্টি নেই, 'whatsapp' আছে social_media অবজেক্টের মধ্যে।
                যদি সরাসরি ফোন নম্বর থাকে, তবে company.phone ব্যবহার করুন।
                এই উদাহরণের জন্য, আমরা whatsapp ব্যবহার করছি, অথবা আপনি আপনার ডেটা অনুযায়ী ঠিক করে নিন। */}
            {company.social_media && company.social_media.whatsapp && (
              <a
                href={`tel:${company.social_media.whatsapp}`}
                className="text-on-success active:bg-active-success inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg border border-white bg-[#38A854] px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none"
              >
                <FiPhone className="text-xl" />
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
                <FaWhatsapp />
              </a>
            )}
            {/* Instagram Link যোগ করুন যদি থাকে এবং company.social_media.instagram প্রপার্টি বিদ্যমান থাকে */}
            {company.social_media &&
              company.social_media.instagram && ( // এই কন্ডিশনটি যোগ করা হয়েছে
                <a
                  href={company.social_media.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary-300 text-primary-600 bg-main hover:bg-primary-100 flex h-12 w-12 items-center justify-center rounded-lg border p-1 text-2xl transition-colors"
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
        <div className="container mx-auto px-4">
          <div className="mx-auto w-full max-w-3xl">
            <h3 className="mb-6 px-2 text-2xl font-bold text-gray-800">
              Agent's Recent Ads {t.ads.companyAdsTitle} ({companyAds.length}{" "}
              {t.ads.adsCount})
            </h3>
            <div className="flex flex-col items-center justify-start gap-4">
              {companyAds.length > 0 ? (
                companyAds.map((ad) => (
                  <div
                    key={ad.id}
                    onClick={() => handleAdClick(ad)} // ক্লিক হ্যান্ডলার
                    className="group w-full cursor-pointer"
                  >
                    <div className="active:border-primary-500 relative w-full rounded-lg border border-transparent bg-white p-3 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-4">
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
                          {/* Super Tag রেন্ডারিং অংশটি এখানে সরানো হয়েছে */}
                        </div>
                        {/* Details */}
                        <div className="flex-1 overflow-hidden">
                          <h4 className="text-dark group-hover:text-primary-600 line-clamp-2 text-base font-bold break-words transition-colors sm:text-lg">
                            {ad.title}
                          </h4>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                            <div className="text-primary-dark text-base font-bold">
                              {ad.kd} {t.ads.currency}
                            </div>
                            <div className="flex items-center gap-1 text-gray-500">
                              <FiClock className="size-4" />
                              <span>
                                {formatTimeAgo(ad.postCreateAt, language)}
                              </span>
                            </div>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                            {ad.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No ads found for this company.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ad Details Modal Component */}
      <AdDetailsModal
        show={showAdModal} // মোডাল দেখানোর স্টেট
        onClose={closeAdModal} // মোডাল বন্ধ করার ফাংশন
        ad={selectedAd} // নির্বাচিত বিজ্ঞাপন ডেটা
        t={t}
        isRTL={isRTL}
        language={language}
        formatTimeAgo={formatTimeAgo}
      />
    </>
  );
}
