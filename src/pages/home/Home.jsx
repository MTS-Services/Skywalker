import React from "react";
import { useLanguage } from '../../context/LanguageContext';
import HeroSection from "./Hero";
import Ads from "./Ads"

export const Home = () => {
  const { isRTL, t } = useLanguage();
  return (
    <div>
      <HeroSection isRTL={isRTL} t={t}></HeroSection>
      <Ads></Ads>
    </div>
  );
};