import React from "react";
import { useLanguage } from '../../context/LanguageContext';
import HeroSection from "./Hero";
import Ads from "./Ads"

export const Home = () => {
   const { isRTL, t, language } = useLanguage();
  return (
    <div>
      <HeroSection isRTL={isRTL} t={t}></HeroSection>
      <Ads t={t} isRTL={isRTL} language={language}></Ads>
    </div>
  );
};
