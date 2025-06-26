import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

const CreditCard = ({ title, imageSrc, onImageClick, buttons, t }) => (
  <div className="flex w-full flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6">
    {/* Card Header */}
    <div
      className={`mb-4 w-full rounded-t-lg rounded-br-3xl rounded-bl-3xl py-3 text-white shadow-md`}
      style={{
        background: `linear-gradient(to right, ${
          title === t.byCredit.superCredit
            ? "#CE3635"
            : title === t.byCredit.agentsSubscription
              ? "#044470"
              : "#76A835"
        }, #666)`,
      }}
    >
      <h4 className="text-base font-bold sm:text-lg">{title}</h4>
    </div>

    {/* Image Section */}
    <div
      className="relative mb-4 flex h-32 w-full cursor-pointer flex-col items-center justify-end overflow-hidden rounded-lg py-4 shadow-md sm:h-40"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => onImageClick(title, imageSrc)}
    >
      <div className="absolute inset-0 rounded-lg bg-black bg-cover opacity-65"></div>
      <a
        href="#"
        className="text-[#fff]  text-sm relative z-10 mb-10 text-center   hover:underline sm:mb-12 sm:text-lg"
        onClick={(e) => {
          e.preventDefault();
          onImageClick(title, imageSrc);
        }}
      >
        {t.byCredit.cliekclink}
      </a>
    </div>

    {/* Buttons Section */}
    <div className="flex w-full flex-col items-center gap-2">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`game-btn ${button.bgColor} hover:${button.hoverBgColor} flex w-full items-center justify-center rounded-lg py-2 text-[#2e6290] shadow-md transition-all duration-200`}
        >
          {button.text}
        </a>
      ))}
    </div>
  </div>
);

const BuyCredits = () => {
  const { isRTL, t, language } = useLanguage();

  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const openModal = (_cardTitle, cardImageSrc) => {
    setModalImageSrc(cardImageSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageSrc("");
  };

  const paymentLink =
    "https://www.kpay.com.kw/kpg/paymentpage.htm?PaymentID=107517673000223474#d";

  return (
    <div className="font-inter mx-auto flex min-h-screen max-w-4xl flex-col items-center p-4 text-gray-800">
      {/* Header */}
      <div className="my-8 w-full max-w-4xl px-4 text-left">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          {t.byCredit.title}
        </h2>
        <ul className="mb-6 list-inside list-disc text-sm text-gray-600 sm:text-base">
          <li>{t.byCredit.subtitlefast}</li>
          <p className="flex flex-col items-start sm:flex-row sm:items-center">
            <li>{t.byCredit.subtitlastone}</li>
            <span className="text-descripton not-[]: inline sm:ml-1">
              {t.byCredit.subtitlastwo}
              <Link
                className="px-1 text-sm font-bold whitespace-nowrap text-[#2e6290]"
                to="tel:01319559275"
              >
                {t.byCredit.bycalling}
              </Link>
              {t.byCredit.subtitlasttwo}
              {/* Note: The original code had `t.byCredit.subtitlastwo` twice here. Assuming it's a typo and the second one should be removed or changed. */}
            </span>
            <a
              className="mt-1 px-1 text-sm font-bold whitespace-nowrap text-[#2e6290] sm:mt-0"
              href="https://api.whatsapp.com/send/?phone=96560444900&text=Hello%0AI+need+help+with+Boshamlan&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.byCredit.byWhatsapp}
            </a>
          </p>
        </ul>
      </div>

      {/* Credit Cards */}
      <div className="mb-12 grid w-full max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        <CreditCard
          title={t.byCredit.superCredit}
          imageSrc="/assets/byCridit/img3.png"
          onImageClick={openModal}
          t={t}
          buttons={[
            {
              text: t.byCredit.superbuttontextFast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#1A4FBF]",
              link: paymentLink,
            },
            {
              text: t.byCredit.superbuttontextFast, // Check this text, seems duplicated in original
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#4B5563]",
              link: paymentLink,
            },
          ]}
        />

        <CreditCard
          title={t.byCredit.agentsSubscription}
          imageSrc="/assets/byCridit/img2.png"
          onImageClick={openModal}
          t={t}
          buttons={[
            {
              text: t.byCredit.agentsbuttontextFast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#3D33B8]",
              link: paymentLink,
            },
            {
              text: t.byCredit.agentsbuttontextlast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#1A4FBF]",
              link: paymentLink,
            },
          ]}
        />

        <CreditCard
          title={t.byCredit.regularCredit}
          imageSrc="/assets/byCridit/img.png"
          onImageClick={openModal}
          t={t}
          buttons={[
            {
              text: t.byCredit.regularbuttontextFast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#4B5563]",
              link: paymentLink,
            },
            {
              text: t.byCredit.regularbuttontextlast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#3D33B8]",
              link: paymentLink,
            },
          ]}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center px-4 py-6 text-center text-sm text-gray-700">
        <svg
          className="mr-2 h-6 w-6 flex-shrink-0 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p>{t.byCredit.allpaymentmethods}</p>
      </div>

      {/* Image Modal with Lighter Overlay */}
      {showModal && modalImageSrc && (
        <div className="animate-fade-in fixed inset-0 z-10 flex items-center justify-center bg-black/10 p-4 backdrop-blur-[1px]">
          <div className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-xl bg-white pb-4 shadow-2xl">
            <img
              src={modalImageSrc}
              alt="Preview"
              className="h-full w-full max-w-sm rounded-2xl object-contain p-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/900x600/CCCCCC/000000?text=Image+Unavailable";
              }}
            />

            <div className="flex items-center justify-center">
              {" "}
              <button
                onClick={closeModal}
                className="flex items-center justify-center rounded-2xl bg-[#F5F7F9] p-2 px-4 text-gray-700"
                aria-label="Close"
              >
                {t.byCredit.closebutton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }

        .game-btn {
          font-weight: 600;
          font-size: 12px;
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .game-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .game-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default BuyCredits;