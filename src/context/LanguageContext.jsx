

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations"; 


import englishRegionsData from "../../public/regions.json";
import arabicRegionsData from "../../public/regionsarbic.json";


import englishtransactionTypesData from "../../public/transactionTypes.json";
import arabictransactionTypesData from "../../public/transactionTypesArbic.json";



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
  // নতুন স্টেট: বর্তমান ভাষার জন্য রিজিওন ডেটা
  const [currentRegionData, setCurrentRegionData] = useState([]);

  const [currentTransactionTypesData, setCurrenttransactionTypesData] =useState([])

  // FloatingActionButton স্টেট (যদি এটি আপনার কম্পোনেন্ট না হয়ে boolean হয়, তাহলে এই নামটি ঠিক আছে)
  const [showFloatingActionButton, setShowFloatingActionButton] =
    useState(false);

  // Initial load and language setup
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;

    // প্রাথমিক লোডের সময় সঠিক ডেটা সেট করুন
    if (savedLanguage === "ar") {
      setCurrentRegionData(arabicRegionsData);
    } else {
      setCurrentRegionData(englishRegionsData);
    }
  }, []); // Only runs once on mount

  // Effect to update region data when language changes
  useEffect(() => {
    if (language === "ar") {
      setCurrentRegionData(arabicRegionsData);
    } else {
      setCurrentRegionData(englishRegionsData);
    }
  }, [language]); // Runs whenever the 'language' state changes


// hero sels expand red setup and this code 

useEffect(() => {
  if (language === "ar") {
    setCurrenttransactionTypesData(arabictransactionTypesData);
  } else {
    setCurrenttransactionTypesData(englishtransactionTypesData);
  }
}, [language]);


  const toggleLanguage = (newLanguage) => {
    // If no specific language is provided, toggle between 'en' and 'ar'
    if (typeof newLanguage === "object" || newLanguage === undefined) {
      newLanguage = language === "en" ? "ar" : "en";
    }
    const finalLanguage = newLanguage;
    setLanguage(finalLanguage); // This will trigger the useEffect above
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
    currentRegionData, // currentRegionData কে context value-তে যোগ করুন
    showFloatingActionButton, // FloatingActionButton এর জন্য সঠিক স্টেট
    setShowFloatingActionButton, // FloatingActionButton এর জন্য সঠিক সেটার
    currentTransactionTypesData,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
