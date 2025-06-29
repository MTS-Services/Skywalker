import AgentHeaderPart from "../../testingCode/AgentHeaderPart/AgentHeaderPart";
import AgentList from "../../testingCode/AgentList";

const Agent = () => {
  return (
    <div>
      <div className="bg-[#FFFFFF]">
        <AgentHeaderPart />
      </div>
      <div>
        <AgentList />
      </div>
    </div>
  );
};

export default Agent;
