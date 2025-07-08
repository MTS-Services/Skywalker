import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";

// Regions
import englishRegionsData from "../../public/regions.json";
import arabicRegionsData from "../../public/regionsarbic.json";

// Transactions
import englishTransactionTypesData from "../../public/transactionTypes.json";
import arabicTransactionTypesData from "../../public/transactionTypesArbic.json";

// Property Types
import englishPropertyTypesData from "../../public/propertyTypes.json";
import arabicPropertyTypesData from "../../public/propertyTypesArbic.json";

// Group Property Types (Header/Footer)
import englishGroupPropertyTypesData from "../../public/groupPropertyTypes.json";
import arabicGroupPropertyTypesData from "../../public/groupPropertyTypesArbic.json";

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
  const [FloatingActionButton, setFloatingActionButton] = useState(false);

  const [currentRegionData, setCurrentRegionData] = useState([]);
  const [currentPropertyTypesData, setCurrentPropertyTypesData] = useState([]);
  const [currentTransactionTypesData, setCurrentTransactionTypesData] =
    useState([]);
  const [currentGroupPropertyTypesData, setCurrentGroupPropertyTypesData] =
    useState([]);

  // Sync language settings from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;
  }, []);

  // Update data on language change
  useEffect(() => {
    setIsRTL(language === "ar");
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;

    localStorage.setItem("language", language);

    setCurrentRegionData(
      language === "ar" ? arabicRegionsData : englishRegionsData,
    );
    setCurrentPropertyTypesData(
      language === "ar" ? arabicPropertyTypesData : englishPropertyTypesData,
    );
    setCurrentTransactionTypesData(
      language === "ar"
        ? arabicTransactionTypesData
        : englishTransactionTypesData,
    );
    setCurrentGroupPropertyTypesData(
      language === "ar"
        ? arabicGroupPropertyTypesData
        : englishGroupPropertyTypesData,
    );
  }, [language]);

  const toggleLanguage = (newLang) => {
    const finalLang =
      typeof newLang === "string" ? newLang : language === "en" ? "ar" : "en";
    setLanguage(finalLang);
  };

  const t = translations[language];

  const value = {
    language,
    isRTL,
    toggleLanguage,
    t,
    currentRegionData,
    currentPropertyTypesData,
    currentTransactionTypesData,
    currentGroupPropertyTypesData,
    FloatingActionButton,
    setFloatingActionButton,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
