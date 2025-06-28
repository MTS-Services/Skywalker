import AgentHeaderPart from "../../testingCode/AgentHeaderPart/AgentHeaderPart"
import AgentList from "../../testingCode/AgentList"

const Agent = () => {
  return (
    <div>
      <div className="">
        <AgentHeaderPart></AgentHeaderPart>
      </div>
      <div>
        <AgentList></AgentList>
      </div>
    </div>
  );
}

export default Agent
