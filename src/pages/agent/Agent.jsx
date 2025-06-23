import React, { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single
    .trim(); // Trim leading/trailing hyphens/spaces
};

export default function Agent() {
  const { isRTL, t, language } = useLanguage();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAndProcessagents = async () => {
      try {
        const response = await fetch("/agent.json");
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };
    fetchAndProcessagents();
  }, []);

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

  return (
    <>
      <section className="bg-gray-100 px-4 py-8 md:px-5 md:py-10">
        <div className="container mx-auto w-full max-w-7xl">
          <div className={`mx-auto mb-4 w-full max-w-xl md:max-w-full`}>
            <div className="w-full md:w-[770px] text-center lg:ml-20">
              <h3
                className={`text-lg font-bold text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}
              >
                {t.agent.titlefast}({" "}
                <span className="px-2">{agents.length}</span>
                {t.agent.titlelast})
              </h3>
            </div>

            <div
              className={`mt-4 flex flex-col items-center justify-start gap-4`}
            >
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="w-full rounded-xl border border-gray-200 md:w-[770px]"
                  style={{ boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="shadow-card-shadow relative my-auto w-full cursor-pointer rounded-lg border border-transparent bg-white p-3 active:border-rose-500 xl:p-4">
                    <div className="my-auto flex gap-3">
                      <div className="relative my-auto">
                        <div className="relative flex-shrink-0">
                          <div className="aspect-square h-12 w-12 rounded-md md:h-14 md:w-14 xl:h-28 xl:w-28">
                            <img
                              alt={agent.title}
                              src={agent.image[0]}
                              loading="lazy"
                              decoding="async"
                              className="border-primary-200 h-full w-full border object-cover p-1"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="text-dark line-clamp-2 text-base font-bold break-words">
                          {agent.name}
                        </div>

                        <div>
                          <div className={`space-x-2} flex items-center gap-1`}>
                            <span className={`text-primary-300 font-bold`}>
                              {agent.ads} Ads
                            </span>
                            <span className="text-primary-200">|</span>
                            <button className="px-1">
                              <FaWhatsapp className="text-primary-300 text-sm md:text-base" />
                            </button>
                            <button className="">
                              <FaInstagram className="text-primary-300 text-sm md:text-base" />
                            </button>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="text-primary-dark rounded font-bold">
                            {/* {agent.price} {t.home.currency} */}
                          </div>
                        </div>
                        <div>
                          <div className="text- line-clamp-2">
                            <p className="text-descripton text-xs font-normal md:text-sm">
                              {agent.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
