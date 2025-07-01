import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const CreditCard = ({ title, imageSrc, onImageClick, buttons, t }) => (
  <div className="flex w-full flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6">
    <div className="relative z-10 mx-auto -mb-4 w-[162px] text-white">
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 scale-x-[-1] transform"
        width="162"
        height="49"
        viewBox="0 0 162 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.09529 2.97709L1.58951 7.21841L10.4993 6.97306L9.05818 4.87062L8.09529 2.97709Z"
          fill="#242424"
        />
        <g filter="url(#filter0_d_1990_8920)">
          <path
            d="M149.401 31.2622C149.004 34.0974 146.659 36.2571 143.801 36.4202L33.6596 42.7031C30.4959 42.8836 27.5239 41.1797 26.0812 38.3584L8.00005 3.00001L153.5 2L149.401 31.2622Z"
            fill={
              title === t.byCredit.superCredit
                ? "#CE3635"
                : title === t.byCredit.agentsSubscription
                  ? "#044470"
                  : "#76A835"
            }
          />
        </g>
        <path
          d="M153.5 2L160.361 7L152.5 6.973L152.956 4.36485L153.5 2Z"
          fill="#242424"
        />
        <defs>
          <filter
            id="filter0_d_1990_8920"
            x="4"
            y="0"
            width="153.5"
            height="48.7163"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1990_8920"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1990_8920"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <h4 className="relative z-10 mx-auto w-full px-3 py-2 text-center text-base font-bold sm:text-[12px]">
        {title}
      </h4>
    </div>

    <div
      className="relative mx-auto -mt-[12px] flex h-72 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg py-12 shadow-md sm:h-56"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => onImageClick(title, imageSrc)}
    >
      <div className="absolute inset-0 rounded-lg bg-black opacity-65"></div>
      <a
        href="#"
        className="relative z-10 w-full px-4 text-center text-[16px] text-[#fff] hover:underline"
        onClick={(e) => {
          e.preventDefault();
          onImageClick(title, imageSrc);
        }}
      >
        {t.byCredit.cliekclink}
      </a>
    </div>

    <div className="mt-4 flex w-full flex-col items-center gap-2">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`game-btn ${button.bgColor} hover:${button.hoverBgColor} border-color-[#FFFFFF] flex w-full items-center justify-center rounded-lg border px-[2px] py-2 text-[14px] font-normal text-[#2e6290] transition-all duration-200`}
        >
          {button.text}
        </a>
      ))}
    </div>
  </div>
);

const TopUpCard = () => {
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
    <div className="font-inter mx-auto flex min-h-screen max-w-6xl flex-col items-center p-4 text-gray-800">
      <div className="my-8 w-full max-w-6xl px-4 text-left">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          {t.byCredit.title}
        </h2>
        <ul className="mb-6 list-inside list-disc text-sm text-gray-600 sm:text-base">
          <li>{t.byCredit.subtitlefast}</li>
          <p className="flex flex-col items-center sm:flex-row sm:items-center">
            <li>{t.byCredit.subtitlastone}</li>
            <span className="text-descripton sm:ml-1">
              {t.byCredit.subtitlastwo}
              <Link
                to="tel:01319559275"
                className="px-1 text-sm font-bold whitespace-nowrap text-[#2e6290]"
              >
                {t.byCredit.bycalling}
              </Link>
              {t.byCredit.subtitlasttwo}
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

      {/* CARD GRID */}
      <div className="mb-12 grid w-full max-w-[1200px] grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        <CreditCard
          title={t.byCredit.superCredit}
          imageSrc="/assets/byCridit/supper.jpg"
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
              text: t.byCredit.superbuttontextlast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#4B5563]",
              link: paymentLink,
            },
          ]}
        />
        <CreditCard
          title={t.byCredit.agentsSubscription}
          imageSrc="/assets/byCridit/Subscription.jpg"
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
          imageSrc="/assets/byCridit/Regular.jpg"
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

        {/* FREE AD BOX */}
        <div className="m-auto flex w-full flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6">
          <div className="w-full text-left text-xs text-gray-700">
            <p className="font-primary text-center font-[500]">
              {t.byCredit.freeAddtitle}
            </p>
            <p className="font-primary text-center font-[300]">
              {t.byCredit.freeAddSubtitle}
            </p>
          </div>
          <button className="mt-4 rounded-md border border-blue-200 bg-[#E8F0F7] px-4 py-2 font-[700] text-black shadow-sm transition">
            <Link to="/ad-upload">{t.byCredit.freeAddbutton}</Link>
          </button>
        </div>
      </div>

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
          />
        </svg>
        <p>{t.byCredit.allpaymentmethods}</p>
      </div>

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
              <button
                onClick={closeModal}
                className="flex items-center justify-center rounded-2xl bg-[#F5F7F9] p-2 px-6 text-gray-700"
              >
                {t.byCredit.closebutton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpCard;
