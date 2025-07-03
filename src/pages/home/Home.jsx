 import { useLanguage } from "../../context/LanguageContext"
import HeroSection from "./Hero"
import Ads from "./Ads"
//code by shakil monsi
//code by shakil monsi
export const Home = () => {
  const { isRTL, t } = useLanguage()
  return (
    <div>
      <HeroSection isRTL={isRTL} t={t} />
      <Ads />
    </div>
  )
}
