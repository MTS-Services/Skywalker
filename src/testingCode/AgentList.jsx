// Path: src/pages/agent/Agent.jsx
import React, { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa"; // যদি FaFacebook ব্যবহার করেন, তাহলে যোগ করুন
import { Link } from "react-router-dom";

// আপনার Assets থেকে লোগো এবং আইকন ইম্পোর্ট করুন
// নিশ্চিত করুন এই পাথগুলো আপনার প্রজেক্ট স্ট্রাকচারের সাথে মেলে

import defaultLogo from "../assits/login/login.png";
// ডিফল্ট লোগো যদি কোম্পানির লোগো না থাকে
import { useLanguage } from "../context/LanguageContext";

// generateSlug ফাংশনটি AgentList এর জন্য প্রয়োজন নেই, কিন্তু আপনি চাইলে রাখতে পারেন
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single
    .trim(); // Trim leading/trailing hyphens/spaces
};

export default function AgentList() {
  const { isRTL, t, language } = useLanguage(); // আপনার LanguageContext থেকে t, isRTL, language
  const [companies, setCompanies] = useState([]); // 'agents' এর পরিবর্তে 'companies' ব্যবহার করছি
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // public/companies.json থেকে ডেটা ফেচ করুন
        // আপনার পুরনো কোডে `/agent.json` ছিল, সেটি `/companies.json` হবে
        const response = await fetch("/companies.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data); // 'setAgents' এর পরিবর্তে 'setCompanies'
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // formatTimeAgo ফাংশনটি এই কম্পোনেন্টে ব্যবহৃত হচ্ছে না, কিন্তু আপনি চাইলে রাখতে পারেন
  const formatTimeAgo = (dateString, language) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);

    if (hours === 0) {
      return language === "ar" ? "0 ساعة" : "0 hours";
    }

    return hours + (language === "ar" ? "ساعة" : " hours");
  };

  if (loading) {
    return (
      <section className="bg-gray-100 px-4 py-8 text-center md:px-5 md:py-10">
        <h2 className="text-xl font-semibold text-gray-700">
          {t?.agent?.loadingText || "Loading agents..."}
        </h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 px-4 py-8 text-center text-red-600 md:px-5 md:py-10">
        <h2 className="text-xl font-semibold">Error: {error.message}</h2>
        <p>Please check your 'companies.json' file or network connection.</p>
      </section>
    );
  }

  return (
    <>
      <section className="h-screen bg-gray-100 px-4 py-8 md:px-5 md:py-10">
        <div className="container mx-auto w-full max-w-7xl">
          <div className={`mx-auto mb-4 w-full max-w-xl md:max-w-full`}>
            <div className="w-full text-center md:w-[770px] lg:ml-20">
              <h3
                className={`text-lg font-bold text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}
              >
                {t?.agent?.titlefast || "Real Estate Agents List in Kuwait"} ({" "}
                <span className="px-2">{companies.length}</span>
                {t?.agent?.titlelast || " Agents"})
              </h3>
            </div>

            <div
              className={`mt-4 flex flex-col items-center justify-start gap-4`}
            >
              {companies.map(
                (
                  company, // 'agents.map' এর পরিবর্তে 'companies.map'
                ) => (
                  <div
                    key={company.id} // 'agent.id' এর পরিবর্তে 'company.id'
                    className="w-full rounded-xl border border-gray-200 md:w-[770px]"
                    style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}
                  >
                    {/* agents-details লিঙ্কের পরিবর্তে companyId দিয়ে ads দেখানোর লিঙ্ক */}
                    {/* Link to specific company's ads page */}
                    <Link to={`/agent/${company.id}/ads`}>
                      <div className="shadow-card-shadow relative my-auto w-full cursor-pointer rounded-lg border border-transparent bg-white p-3 active:border-rose-500 xl:p-4">
                        <div className="my-auto flex gap-3">
                          <div className="relative my-auto">
                            <div className="relative flex-shrink-0">
                              <div className="aspect-square h-12 w-12 rounded-md md:h-14 md:w-14 xl:h-28 xl:w-28">
                                <img
                                  alt={company.name} // 'agent.title' এর পরিবর্তে 'company.name'
                                  src={company.logo_url || defaultLogo} // 'agent.image' এর পরিবর্তে 'company.logo_url'
                                  loading="lazy"
                                  decoding="async"
                                  className="border-primary-200 h-full w-full border object-cover p-1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="text-dark line-clamp-2 text-base font-bold break-words">
                              {company.name} {/* 'agent.name' */}
                            </div>

                            <div>
                              <div
                                className={`flex items-center gap-1 space-x-2`}
                              >
                                {/* বিজ্ঞাপনের সংখ্যা - ক্লিকযোগ্য লিঙ্ক */}
                                <Link
                                  to={`/agent/${company.id}/ads`}
                                  className={`text-primary-300 font-bold`}
                                >
                                  {company.ads?.length || 0} Ads{" "}
                                  {/* 'agent.ads' এর পরিবর্তে 'company.ads?.length' */}
                                </Link>

                                <span className="text-primary-200">|</span>

                                {/* WhatsApp আইকন ও লিঙ্ক */}
                                {company.social_media?.whatsapp && (
                                  <a
                                    href={`https://wa.me/${company.social_media.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-1"
                                  >
                                    <FaWhatsapp className="text-primary-300 text-sm md:text-base" />
                                  </a>
                                )}

                                {/* Instagram আইকন ও লিঙ্ক */}
                                {company.social_media?.instagram && (
                                  <a
                                    href={company.social_media.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                  >
                                    <FaInstagram className="text-primary-300 text-sm md:text-base" />
                                  </a>
                                )}

                                {/* যদি Facebook আইকন ব্যবহার করেন */}
                                {/* {company.social_media?.facebook && (
                                <a 
                                  href={company.social_media.facebook} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className=""
                                >
                                  <FaFacebook className="text-primary-300 text-sm md:text-base" />
                                </a>
                              )} */}
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="text-primary-dark rounded font-bold">
                                {/* {agent.price} {t.home.currency} - এটি এজেন্টের জন্য প্রযোজ্য নয় */}
                              </div>
                            </div>
                            <div>
                              <div className="text- line-clamp-2">
                                <p className="text-descripton text-xs font-normal md:text-sm">
                                  {company.description}{" "}
                                  {/* 'agent.description' */}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
