import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const CreditCard = ({
  title,
  imageSrc,
  onImageClick,
  buttons,
  t,
  bannerColor,
}) => (
  <div className="card-shadow relative flex w-full gap-3 rounded-lg border-1 border-[#e5e7eb] bg-white p-3 shadow-xl">
    {/* Image with overlay */}
    <div className="relative shrink-0">
      <button
        className="block cursor-pointer"
        type="button"
        onClick={() => onImageClick(title, imageSrc)}
      >
        <img
          alt={title}
          loading="lazy"
          width="1080"
          height="1080"
          decoding="async"
          className="h-[130px] w-[116px] rounded-md object-cover"
          src={imageSrc}
        />
        <div className="bg-opacity-10 absolute inset-0 flex items-center justify-center rounded-md bg-black/40 bg-cover">
          <div className="px-2 text-center text-xs leading-5 font-bold text-white">
            {t.byCredit.cliekclink}
          </div>
        </div>
      </button>
    </div>

    {/* Content */}
    <div className="flex flex-grow flex-col justify-center">
      {/* Banner Title */}
      <div className="relative mb-3 flex h-[40px] items-center justify-center">
        <div className="absolute -top-[18px] left-1/2 -translate-x-1/2">
          <svg
            width="143"
            height="45"
            viewBox="0 0 143 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.38 2.86L0.61 6.63L8.51 6.41L7.24 4.54L6.38 2.86Z"
              fill="#242424"
            />
            <g filter="url(#filter0_d)">
              <path
                d="M131.9 27.42C131.5 30.26 129.16 32.42 126.3 32.58L29.66 38.1C26.5 38.28 23.52 36.57 22.08 33.75L6.29 2.88L135.46 2L131.9 27.42Z"
                fill={bannerColor || "#CE3635"}
              />
            </g>
            <path
              d="M135.46 2L141.56 6.43L134.58 6.41L134.98 4.09L135.46 2Z"
              fill="#242424"
            />
            <defs>
              <filter
                id="filter0_d"
                x="2.29"
                y="0"
                width="137.16"
                height="44.11"
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
                  result="effect1_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <div className="absolute start-6 end-5 top-0 text-white">
            <div className="absolute top-1.5 left-1/2 max-w-full -translate-x-1/2 overflow-hidden text-xs font-bold whitespace-nowrap">
              {title}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-lg bg-[#E8F0F7] hover:${button.hoverBgColor} border px-3 py-2 text-xs font-bold text-[#2e6290]`}
          >
            {button.text}
          </a>
        ))}
      </div>
    </div>
  </div>
);

const BuyCreditsMobailPart = () => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const openModal = (_title, cardImageSrc) => {
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
      <div className="my-8 w-full max-w-4xl px-4 text-left">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          {t.byCredit.title}
        </h2>
        <ul className="mb-6 list-inside list-disc text-sm text-gray-600 sm:text-base">
          <li>{t.byCredit.subtitlefast}</li>
          <p className="flex items-center sm:flex-row sm:items-center">
            <li>{t.byCredit.subtitlastone}</li>
            <span className="text-descripton sm:ml-1">
              {t.byCredit.subtitlastwo}
              <Link
                className="px-1 text-sm font-bold whitespace-nowrap text-[#2e6290]"
                to="tel:01319559275"
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

      <div className="mb-12 grid w-full max-w-5xl grid-cols-1 gap-4 px-4">
        <CreditCard
          title={t.byCredit.superCredit}
          imageSrc="/assets/byCridit/supper.jpg"
          onImageClick={openModal}
          t={t}
          bannerColor="#CE3635"
          buttons={[
            {
              text: t.byCredit.superbuttontextFast,
              hoverBgColor: "bg-[#1A4FBF]",
              link: paymentLink,
            },
            {
              text: t.byCredit.superbuttontextlast,
              hoverBgColor: "bg-[#4B5563]",
              link: paymentLink,
            },
          ]}
        />

        <CreditCard
          title={t.byCredit.agentsSubscription}
          imageSrc="/assets/byCridit/Subscription.jpg"
          t={t}
          bannerColor="#044470"
          buttons={[
            {
              text: t.byCredit.agentsbuttontextFast,
              hoverBgColor: "bg-[#3D33B8]",
              link: paymentLink,
            },
            {
              text: t.byCredit.agentsbuttontextlast,
              hoverBgColor: "bg-[#1A4FBF]",
              link: paymentLink,
            },
          ]}
        />

        <CreditCard
          title={t.byCredit.regularCredit}
          imageSrc="/assets/byCridit/img2.png"
          onImageClick={openModal}
          t={t}
          bannerColor="#76A835"
          buttons={[
            {
              text: t.byCredit.regularbuttontextFast,
              hoverBgColor: "bg-[#4B5563]",
              link: paymentLink,
            },
            {
              text: t.byCredit.regularbuttontextlast,
              hoverBgColor: "bg-[#3D33B8]",
              link: paymentLink,
            },
          ]}
        />

        {/* ✅ FREE AD BOX */}
        <div className="card-shadow relative flex w-full flex-col items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4 text-center shadow-xl">
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

export default BuyCreditsMobailPart;
