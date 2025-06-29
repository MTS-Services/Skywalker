import { Link } from "react-router-dom"
import { MdKeyboardArrowRight } from "react-icons/md";

const AgentHeaderPart = () => {
  return (
    <div className="border-1 border-t border-gray-300 bg-[#F5F7F9]">
      <div className="mx-auto w-full max-w-7xl bg-[hsl(240,25%,97%)] px-5 text-center">
        <div className="flex items-center px-1 py-2 text-[12px] font-normal text-[#556885]">
          {" "}
          <Link
            to="/"
            className="px-1 text-[12px] font-normal text-[#556885]"
          >agent</Link>
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
