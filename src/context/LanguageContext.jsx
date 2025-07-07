import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations"; 

import englishRegionsData from "../../public/regions.json";
import arabicRegionsData from "../../public/regionsarbic.json";

import englishtransactionTypesData from "../../public/transactionTypes.json";
import arabictransactionTypesData from "../../public/transactionTypesArbic.json";

import englishpropertyTypesData from "../../public/propertyTypes.json";
import arabicpropertyTypesArbicData from "../../public/propertyTypesArbic.json";


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
  const [currentRegionData, setCurrentRegionData] = useState([]);
  const [crrentpropertyTypesData, setCurrentpropertyTypesData] = useState([]);

  const [currentTransactionTypesData, setCurrenttransactionTypesData] =useState([])

  const [showFloatingActionButton, setShowFloatingActionButton] =
    useState(false);

  // pertyTypesData setup this code 
    useEffect(()=> {
      if(language==="ar"){
        setCurrentpropertyTypesData(arabicpropertyTypesArbicData);
      }else{
        setCurrentpropertyTypesData(englishpropertyTypesData);
      }
    },[language])

  // Initial load and language setup
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ar";
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === "ar");
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = savedLanguage;

    if (savedLanguage === "ar") {
      setCurrentRegionData(arabicRegionsData);
    } else {
      setCurrentRegionData(englishRegionsData);
    }
  }, []);

  useEffect(() => {
    if (language === "ar") {
      setCurrentRegionData(arabicRegionsData);
    } else {
      setCurrentRegionData(englishRegionsData);
    }
  }, [language]); 


useEffect(() => {
  if (language === "ar") {
    setCurrenttransactionTypesData(arabictransactionTypesData);
  } else {
    setCurrenttransactionTypesData(englishtransactionTypesData);
  }
}, [language]);

  const toggleLanguage = (newLanguage) => {
    if (typeof newLanguage === "object" || newLanguage === undefined) {
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
    currentRegionData, 
    showFloatingActionButton, 
    setShowFloatingActionButton, 
    currentTransactionTypesData,
    crrentpropertyTypesData,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
