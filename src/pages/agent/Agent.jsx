import { useLanguage } from "../../context/LanguageContext";
import AgentHeaderPart from "../../testingCode/AgentHeaderPart/AgentHeaderPart";
import AgentList from "../../testingCode/AgentList";
import FabController from "../fab/FabController";

const Agent = () => {
  const { FloatingActionButton } = useLanguage();
  const isMobile = window.innerWidth <= 768; // or use a better mobile detection if available
  return (
    <div>
      <div className="bg-[#FFFFFF]">
        <AgentHeaderPart />
      </div>
      <div>
        <AgentList />
        {isMobile && !FloatingActionButton && <FabController />}
      </div>
    </div>
  );
};

export default Agent;
