import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "../utils/translations"

const LanguageContext = createContext()

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {  
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en")
    const [isRTL, setIsRTL] = useState(false)

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language") || "en"
        setLanguage(savedLanguage)
        setIsRTL(savedLanguage === "ar")
        document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
        document.documentElement.lang = savedLanguage
    }, [])

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "ar" : "en"
        setLanguage(newLanguage)
        setIsRTL(newLanguage === "ar")
        localStorage.setItem("language", newLanguage)
        document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
        document.documentElement.lang = newLanguage
    }

    const t = translations[language]

    const value = {
        language,
        isRTL,
        toggleLanguage,
        t,
    }

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
