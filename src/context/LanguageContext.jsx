import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ar");
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;
  }, []);

  const toggleLanguage = (newLanguage) => {
    // If no specific language is provided, toggle between 'en' and 'ar'
    // if newLanguage is not object then newLanguage = language === "en" ? "ar" : "en";
    if (typeof newLanguage === "object") {
      newLanguage = language === "en" ? "ar" : "en";
    }
    const finalLanguage = newLanguage;
    setLanguage(finalLanguage);
    setIsRTL(finalLanguage === "ar");
    localStorage.setItem("language", finalLanguage);
    document.documentElement.dir = finalLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = finalLanguage;
  };

  const t = translations[language];

  const value = {
    language,
    isRTL,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
