import React, { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa"; 
import { Link } from "react-router-dom";



import defaultLogo from "../assits/login/login.png";
import { useLanguage } from "../context/LanguageContext";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-") 
    .replace(/[^\w-]+/g, "") 
    .replace(/--+/g, "-") // Replace multiple hyphens with single
    .trim(); // Trim leading/trailing hyphens/spaces
};

export default function AgentList() {
  const { isRTL, t, language } = useLanguage(); 
  const [companies, setCompanies] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
      
        const response = await fetch("/companies.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data); 
        console.error("Error fetching companies:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

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
            <div className="w-full text-center md:w-[770px] lg:ml-12">
              <h3
                className={`mb-6 px-2 text-base font-[700] text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}
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
                  company,
                ) => (
                  <div
                    key={company.id} 
                    className="w-full rounded-xl border border-gray-200 md:w-[770px]"
                    style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}
                  >
             
                    <Link to={`/agent/${company.id}/ads`}>
                      <div className="shadow-card-shadow relative my-auto w-full cursor-pointer rounded-lg border border-transparent bg-white p-3 active:border-rose-500 xl:p-4">
                        <div className="my-auto flex gap-3">
                          <div className="relative my-auto">
                            <div className="relative flex-shrink-0">
                              <div className="aspect-square h-28 w-28 rounded-md md:h-14 md:w-14 xl:h-28 xl:w-28">
                                <img
                                  alt={company.name} 
                                  src={company.logo_url || defaultLogo} 
                                  loading="lazy"
                                  decoding="async"
                                  className="border-primary-200 h-full w-full border object-cover p-1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <h4 className="text-dark font-primary line-clamp-2 text-[15px] font-[700] break-words transition-colors sm:text-[15px]">
                              {company.name}
                            </h4>

                            <div>
                              <div className="flex flex-wrap items-center gap-1 space-x-2 py-1">
                                <p className="text-primary-900 py-1 text-sm font-[700]">
                                  <span>{company.ads?.length || 0} Ads</span>
                                </p>

                                <span className="text-primary-200">|</span>

                                {company.social_media?.whatsapp && (
                                  <p className="flex items-center px-1">
                                    <span className="text-primary-300 text-sm md:text-base">
                                      <FaWhatsapp />
                                    </span>
                                  </p>
                                )}

                                {company.social_media?.instagram && (
                                  <p className="flex items-center">
                                    <span className="text-primary-300 text-sm md:text-base">
                                      <FaInstagram />
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <div className="text-primary-dark rounded font-bold"></div>
                            </div>
                            <div>
                              <div className="text- line-clamp-2">
                                <p className="text-descripton text-[14px] font-normal md:text-sm">
                                  {company.description}{" "}
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
