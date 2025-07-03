import { Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md";

const AgentHeaderPart = () => {
  return (
    <div className="border-1 border-t border-gray-300 bg-[#F5F7F9]">
      <div className="mx-auto w-full max-w-7xl bg-[#F5F7F9] px-5 text-center">
        <div className="flex items-center px-1 py-2 text-[12px] font-normal text-[#556885]">
        
          <Link
            to="/agents"
            className="px-1 text-[12px] font-normal text-[#556885]"
          >
            Agents
          </Link>
          <>
            <MdKeyboardArrowRight />
          </>
          <Link
            to="/buy-credits"
            className="px-1 text-[12px] font-normal text-[#556885]"
          >
            Join
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AgentHeaderPart
