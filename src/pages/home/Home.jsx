import { useLanguage } from "../../context/LanguageContext";
import HeroSection from "./Hero";
import Ads from "./Ads";
import FabController from "../fab/FabController";

//code by shakil monsi
//code by shakil monsi
export const Home = () => {
  const { isRTL, t, FloatingActionButton } = useLanguage();
  const isMobile = window.innerWidth <= 768; // or use a better mobile detection if available
  return (
    <div>
      <HeroSection isRTL={isRTL} t={t} />
      {isMobile && !FloatingActionButton && <FabController />}
      <Ads />
    </div>
  );
};
