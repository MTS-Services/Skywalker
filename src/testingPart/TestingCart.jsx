import React from "react";

const CardComponent = () => {
  return (
    <div className="bg-main relative w-full rounded-lg p-4 shadow-lg">
      <div className="relative shrink-0">
        <div className="absolute -top-1.5 left-1/2 z-10 -translate-x-1/2">
          <div className="scale-x-[-1] transform">
            <svg
              width="162"
              height="49"
              viewBox="0 0 162 49"
              fill="none"
              xmlns="./assets/byCridit/img.png"
            >dfdasfsdafasdfasdfdasfasdf
              <path
                d="M8.09529 2.97709L1.58951 7.21841L10.4993 6.97306L9.05818 4.87062L8.09529 2.97709Z"
                fill="#242424"
              >fadsfasdfasdfasdfasdfa</path>
              <g filter="url(#filter0_d_1990_8920)">fdsfasdfasdfds
                <path
                  d="M149.401 31.2622C149.004 34.0974 146.659 36.2571 143.801 36.4202L33.6596 42.7031C30.4959 42.8836 27.5239 41.1797 26.0812 38.3584L8.00005 3.00001L153.5 2L149.401 31.2622Z"
                  fill="#CE3635"
                ></path>
              </g>
              <path
                d="M153.5 2L160.361 7L152.5 6.973L152.956 4.36485L153.5 2Z"
                fill="#242424"
              >adsfdasfasdfasdfasdfa</path>
              <path fill="white">afdfadfdasfadsfasdfasdf</path>
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
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
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
          </div>

          
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div className="absolute top-1.5 left-1/2 max-w-full -translate-x-1/2 overflow-hidden font-bold whitespace-nowrap text-white">
              Super Credit
            </div>
          </div>
        </div>
        <button className="block cursor-zoom-in" type="button">
          <div
            className="h-[214px] w-[214px] rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url('./assets/byCridit/img.png')` }}
          >
            <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center rounded-lg bg-black">
              <div className="max-w-16 text-center leading-5 font-bold text-white">
                Click for details
              </div>
            </div>
          </div>
        </button>
      </div>
      <div className="h-4"></div>
      <div className="flex flex-col">
        <div className="relative">
          <button className="bg-primary-light border-accent-primary-light text-primary-dark active:bg-accent-primary-light inline-flex h-10 w-full shrink-0 items-center justify-center rounded-lg border px-1 text-base font-bold whitespace-nowrap transition-colors select-none disabled:opacity-50">
            1 Ad - 12 KD
          </button>
        </div>
        <div className="h-2"></div>
        <div className="relative">
          <button className="bg-primary-light border-accent-primary-light text-primary-dark active:bg-accent-primary-light inline-flex h-10 w-full shrink-0 items-center justify-center rounded-lg border px-1 text-base font-bold whitespace-nowrap transition-colors select-none disabled:opacity-50">
            5 Ads - 55 KD
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
