import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const CreditCard = ({ title, imageSrc, onImageClick, buttons, t }) => (
  <div className="flex w-full flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center shadow-lg transition-transform duration-300 hover:scale-105 sm:p-6">
    {/* কার্ড হেডার SVG ইফেক্ট সহ - মাঝখানে আনা হয়েছে */}
    <div className="relative z-10 mx-auto -mb-4 w-[162px] text-white">
      {" "}
      {/* SVG এর প্রস্থের সমান w-[162px] যোগ করা হয়েছে */}
      <svg
        // SVG কে সম্পূর্ণ প্যারেন্টের মাঝে আনার জন্য পরিবর্তন করা হয়েছে
        className="absolute top-0 left-1/2 -translate-x-1/2 scale-x-[-1] transform" // left-1/2 এবং -translate-x-1/2 যোগ করা হয়েছে
        width="162"
        height="49"
        viewBox="0 0 162 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.09529 2.97709L1.58951 7.21841L10.4993 6.97306L9.05818 4.87062L8.09529 2.97709Z"
          fill="#242424"
        ></path>
        <g filter="url(#filter0_d_1990_8920)">
          <path
            d="M149.401 31.2622C149.004 34.0974 146.659 36.2571 143.801 36.4202L33.6596 42.7031C30.4959 42.8836 27.5239 41.1797 26.0812 38.3584L8.00005 3.00001L153.5 2L149.401 31.2622Z"
            fill={
              title === t.byCredit.superCredit
                ? "#CE3635" // সুপার ক্রেডিটের জন্য লাল
                : title === t.byCredit.agentsSubscription
                  ? "#044470" // এজেন্ট সাবস্ক্রিপশনের জন্য নীল
                  : "#76A835" // রেগুলার ক্রেডিটের জন্য সবুজ
            }
          ></path>
        </g>
        <path
          d="M153.5 2L160.361 7L152.5 6.973L152.956 4.36485L153.5 2Z"
          fill="#242424"
        ></path>
        {/* ফিল্টার ডেফিনিশন (defs) আপনার আসল SVG তে দেওয়া অনুযায়ী এখানে থাকবে */}
        <defs>
          <filter
            id="filter0_d_1990_8920"
            x="4"
            y="0"
            width="153.5"
            height="48.7163"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dy="2"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
            ></feColorMatrix>
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1990_8920"
            ></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1990_8920"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
      {/* শিরোনামের জন্য h4 - এর স্টাইল ঠিক করা হয়েছে */}
      <h4 className="relative z-10 mx-auto w-full px-3 py-2 text-center text-base font-bold sm:text-[12px]">
        {" "}
        {/* px-3 py-2, w-full যোগ করা হয়েছে, mx-auto, text-center ঠিক রাখা হয়েছে */}
        {title}
      </h4>
    </div>

    {/* ইমেজ সেকশন - ইমেজের উপর টেক্সট কন্টেন্ট মাঝখানে আনা হয়েছে */}
    <div
      // ছবির উচ্চতা বাড়ানো হয়েছে: h-60 থেকে h-72 (স্মল স্ক্রিনের জন্য) এবং sm:h-56 (বড় স্ক্রিনের জন্য)
      // py-12 ঠিক রাখা হয়েছে টেক্সটের উপরে এবং নিচে পর্যাপ্ত স্পেস দেওয়ার জন্য
      className="relative mx-auto -mt-[12px] flex h-72 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg py-12 shadow-md sm:h-56"
      style={{
        backgroundImage: `url(${imageSrc})`, // `url()` এর পরিবর্তে টেমপ্লেট লিটারাল
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => onImageClick(title, imageSrc)}
    >
      <div className="absolute inset-0 rounded-lg bg-black opacity-65"></div>
      <a
        href="#"
        // w-full যোগ করা হয়েছে এবং টেক্সটের জন্য আরও প্যাডিং দেওয়া হয়েছে যাতে এটি নিচে লেগে না যায়
        className="relative z-10 w-full px-4 text-center text-[16px] text-[#fff] hover:underline" // px-4 যোগ করা হয়েছে
        onClick={(e) => {
          e.preventDefault();
          onImageClick(title, imageSrc);
        }}
      >
        {t.byCredit.cliekclink}
      </a>
    </div>

    {/* বাটন সেকশন */}
    <div className="mt-4 flex w-full flex-col items-center gap-2">
      {buttons.map((button, index) => (
        <a
          key={index}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          // এখানে ক্লাস নেমে স্ট্রিং ইন্টারপোলেশন ব্যবহার করা হয়েছে
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
    <div className="font-inter mx-auto flex min-h-screen max-w-4xl flex-col items-center p-4 text-gray-800">
      {/* হেডার */}
      <div className="my-8 w-full max-w-4xl px-4 text-left">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">
          {t.byCredit.title}
        </h2>
        {/* এই ul এবং p ট্যাগের ভেতরের টেক্সট সেন্টারিং */}
        <ul className="mb-6 list-inside list-disc text-sm text-gray-600 sm:text-base">
          <li>{t.byCredit.subtitlefast}</li>
          {/* p ট্যাগের মধ্যে flex ব্যবহার করে টেক্সট মাঝখানে আনা হয়েছে */}
          <p className="flex flex-col items-center sm:flex-row sm:items-center">
            {" "}
            {/* justify-center যোগ করা হয়েছে */}
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
              {/* এই লাইনটি ডুপ্লিকেট, ঠিক করে নিতে পারেন */}
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

      {/* ক্রেডিট কার্ড */}
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
              text: t.byCredit.superbuttontextFast,
              bgColor: "bg-[#E8F0F7]",
              hoverBgColor: "bg-[#4B5563]",
              link: paymentLink,
            },
          ]}
        />

        <CreditCard
          title={t.byCredit.agentsSubscription}
          imageSrc="/assets/byCridit/img.png"
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
          imageSrc="/assets/byCridit/img2.png"
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
                aria-label=""
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
