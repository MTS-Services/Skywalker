import BuyCreditsMobailPart from "./BuyCreditsMobailPart";
import TopUpCard from "./TopUpCard/TopUpCard";

const BuyCredits = () => {
  return (
    <div>
      {/* PC only */}
      <div className="hidden lg:block">
        <TopUpCard />
      </div>

      {/* Mobile & Tablet only */}
      <div className="block lg:hidden">
        <BuyCreditsMobailPart />
      </div>
    </div>
  );
}

export default BuyCredits
