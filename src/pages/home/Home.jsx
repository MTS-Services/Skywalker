import { useLanguage } from "../../context/LanguageContext";
import HeroSection from "./Hero";
import Ads from "./Ads";
// error fixed and 
// error fixed and 
// error fixed and 
// error fixed and 
export const Home = () => {
  const { isRTL, t } = useLanguage();
  return (
    <div>
      <HeroSection isRTL={isRTL} t={t} />
      <Ads />
    </div>
  );
};
