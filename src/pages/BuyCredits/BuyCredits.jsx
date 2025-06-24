import React, { useState } from "react";

// Card Component for reusability
const CreditCard = ({
  title,
  features,
  profileName,
  imageSrc,
  onImageClick,
  buttons,
  package1,
  package2,
}) => (
  <div className="flex w-full max-w-xs flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-lg transition-transform duration-300 hover:scale-105">
    {/* Card Header - Matching the exact color and gradient from the image, with refined rounded corners */}
    <div
      className={`-mt-6 mb-4 w-full rounded-t-lg rounded-br-3xl rounded-bl-3xl py-3 text-white shadow-md`}
      style={{
        background: `linear-gradient(to right, ${
          title === "Super Credit"
            ? "#CD3D36"
            : title === "Agents Subscript"
              ? "#1A5693"
              : "#4CAF50"
        }, #666)`,
      }}
    >
      {" "}
      {/* Dynamic background color based on title */}
      <h4 className="text-xl font-semibold">{title}</h4>
    </div>

    {/* NEW: Ad Package clickable area with background image and text overlay */}
    {/* This div acts as the clickable background area. Now all cards use an image background with an overlay. */}
    <div
      className="relative mb-4 flex h-40 w-full cursor-pointer flex-col items-center justify-end overflow-hidden rounded-lg py-4 shadow-md" // justify-end to push link to bottom
      style={{
        backgroundImage: `url(${imageSrc})`, // All cards now explicitly use imageSrc as background
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => onImageClick(title)} // Pass title to identify which modal to open
    >
      {/* Overlay for all cards to darken background image and make text more readable */}
      <div className="absolute inset-0 rounded-lg bg-black opacity-40"></div>

      {/* Dynamic Content for two circular packages inside the main area, z-index ensures they are above overlay */}
      {/* This entire section is now removed as per your request */}
      {/*
      <div className="relative z-10 flex justify-around w-full px-4 items-center">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white bg-opacity-20 text-white rounded-full flex flex-col items-center justify-center text-md font-bold border border-white">
            <span>{package1.adCount}</span>
            <span>{package1.packageType}</span>
          </div>
          <p className="mt-2 text-white text-lg font-bold">{package1.price}</p>
        </div>

        {package2 && (
          <div className="flex flex-col items-center relative">
            <div className="w-24 h-24 bg-white bg-opacity-20 text-white rounded-full flex flex-col items-center justify-center text-md font-bold border border-white">
              <span>{package2.adCount}</span>
              <span>{package2.packageType}</span>
            </div>
            <p className="mt-2 text-white text-lg font-bold">{package2.price}</p>
            {package2.discount && (
              <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full rotate-12 transform shadow-lg">
                {package2.discount}
              </div>
            )}
          </div>
        )}
      </div>
      */}

      <a
        href="#"
        className="relative z-10 mb-2 text-sm font-medium text-blue-300 hover:underline" /* mt-auto removed as it's the only content now */
        onClick={(e) => {
          e.preventDefault();
          onImageClick(title);
        }} // Open modal on "Click for details"
      >
        Click for details
      </a>
    </div>

    {/* Features List - This section is already empty based on previous request */}
    {features.length > 0 && (
      <ul className="mb-6 w-full space-y-2 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm text-gray-700">
            <svg
              className="mr-2 h-5 w-5 flex-shrink-0 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    )}

    {/* Buttons Section INSIDE the card, above profile */}
    <div className="mb-6 flex w-full flex-col items-center gap-4">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`game-btn ${button.bgColor} hover:${button.hoverBgColor} w-full rounded-lg px-8 py-3 text-white shadow-md transition-all duration-200`}
        >
          {button.text}
        </button>
      ))}
    </div>

    {/* Profile Section - "Dr. Shamim" with placeholder image - THIS IS NOW REMOVED */}
    {/*
    <div className="flex items-center mt-auto pt-4">
      <img
        src="https://placehold.co/40x40/FF0000/FFFFFF?text=User" // Placeholder for profile image
        alt={`${profileName} profile`}
        className="w-10 h-10 rounded-full mr-2"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/CCCCCC/000000?text=U"; }}
      />
      <span className="text-gray-600 text-sm">{profileName}</span>
    </div>
    */}
  </div>
);

// Main BuyCredits Component
const BuyCredits = () => {
  // State to manage the visibility of the image modal
  const [showModal, setShowModal] = useState(false);
  // State to hold the type of modal to display (e.g., 'super-credit-popup', 'default-image')
  const [modalType, setModalType] = useState("");
  // State to hold the URL of the image to display in the default modal
  const [modalImageSrc, setModalImageSrc] = useState("");

  // Function to open the modal based on card type
  const openModal = (cardTitle) => {
    // Note: The Super Credit modal is still custom. For other cards, the modal will reflect the main card design.
    if (cardTitle === "Super Credit") {
      setModalType("super-credit-popup");
    } else {
      // For other cards, open a default image modal. The placehold.co URL is constructed
      // to visually represent the two circular packages and the "Click for details" link.
      let imageUrl;
      if (cardTitle === "Agents Subscript") {
        // Updated placeholder text to only include "Click for details"
        imageUrl =
          "https://placehold.co/900x600/1A5693/FFFFFF?text=Click+for+details";
      } else if (cardTitle === "Regular Credit") {
        // Updated placeholder text to only include "Click for details"
        imageUrl =
          "https://placehold.co/900x600/4CAF50/000000?text=Click+for+details";
      } else {
        imageUrl =
          "https://placehold.co/900x600/CCCCCC/000000?text=Larger+Preview+for+" +
          cardTitle.replace(/\s/g, "+");
      }
      setModalType("default-image");
      setModalImageSrc(imageUrl);
    }
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setModalImageSrc(""); // Clear the image source when closing
  };

  // Common features list is now empty as per request
  const commonFeatures = [];

  return (
    // Main container with responsive padding and centering, matching the background color from the image
    <div className="font-inter flex min-h-screen flex-col items-center bg-[#F0F2F5] p-4 text-gray-800">
      {/* Header Section */}
      <div className="my-8 w-full max-w-4xl px-4 text-left">
        <h2 className="mb-4 text-3xl font-bold text-gray-800">Buy Credits</h2>
        <ul className="mb-6 list-inside list-disc text-gray-600">
          <li>Select the Package and click the button to buy</li>
          <li>Contact us via call or Whatsapp</li>
        </ul>
      </div>

      {/* Credit Package Cards - Grid layout */}
      <div className="mb-12 grid w-full max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Super Credit Card Data */}
        <CreditCard
          title="Super Credit"
          imageSrc="https://placehold.co/400x200/B22222/FFFFFF?text=RED+BG" // Demo background for Super Credit
          features={commonFeatures}
          profileName="Dr. Shamim" // Still passed, but not rendered in CreditCard
          onImageClick={openModal}
          buttons={[
            {
              text: "1 Ad - 12 KD",
              bgColor: "bg-[#2563EB]",
              hoverBgColor: "bg-[#1A4FBF]",
            },
            {
              text: "5 Ads - 55 KD",
              bgColor: "bg-[#6B7280]",
              hoverBgColor: "bg-[#4B5563]",
            },
          ]}
          // package1 and package2 props are now not used for rendering circular divs
          package1={{ adCount: "", packageType: "", price: "" }}
          package2={null} // Set to null as it's no longer rendered
        />

        {/* Agents Subscript Card Data - Replicated design */}
        <CreditCard
          title="Agents Subscript"
          imageSrc="https://placehold.co/400x200/1A5693/FFFFFF?text=BLUE+BG" // Demo background for Agents
          features={commonFeatures}
          profileName="Dr. Shamim" // Still passed, but not rendered in CreditCard
          onImageClick={openModal}
          buttons={[
            {
              text: "2 Months - 30 Ads - 100 KD",
              bgColor: "bg-[#4F46E5]",
              hoverBgColor: "bg-[#3D33B8]",
            },
            {
              text: "6 Months - 90 Ads - 270 KD",
              bgColor: "bg-[#2563EB]",
              hoverBgColor: "bg-[#1A4FBF]",
            },
          ]}
          // package1 and package2 props are now not used for rendering circular divs
          package1={{ adCount: "", packageType: "", price: "" }}
          package2={null}
        />

        {/* Regular Credit Card Data - Replicated design */}
        <CreditCard
          title="Regular Credit"
          imageSrc="https://placehold.co/400x200/4CAF50/000000?text=GREEN+BG" // Demo background for Regular
          features={commonFeatures}
          profileName="Dr. Shamim" // Still passed, but not rendered in CreditCard
          onImageClick={openModal}
          buttons={[
            {
              text: "3 Ads - 12 KD",
              bgColor: "bg-[#6B7280]",
              hoverBgColor: "bg-[#4B5563]",
            },
            {
              text: "6 Ads - 23 KD",
              bgColor: "bg-[#4F46E5]",
              hoverBgColor: "bg-[#3D33B8]",
            },
          ]}
          // package1 and package2 props are now not used for rendering circular divs
          package1={{ adCount: "", packageType: "", price: "" }}
          package2={null}
        />
      </div>

      {/* Footer Section - "All payment methods..." with green checkmark */}
      <div className="flex w-full max-w-4xl items-center justify-center px-4 py-6 text-center text-sm text-gray-700">
        {/* Green Checkmark SVG Icon */}
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
        <p>
          All payment methods in Boshamian are secured and trusted 100% by all
          local banks
        </p>
      </div>

      {/* Image Modal Component (Conditionally Rendered) */}
      {showModal && (
        <div className="bg-opacity-75 animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          {/* Conditional rendering for different modal types */}
          {modalType === "super-credit-popup" ? (
            // Super Credit specific modal content (from image_77d73a.png)
            <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-xl border-4 border-gray-300 bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="relative bg-[#CD3D36] py-4 text-center text-2xl font-bold text-white">
                Premium Ads
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="focus:ring-opacity-50 absolute top-2 right-2 z-10 flex h-8 w-8 transform items-center justify-center rounded-full bg-red-600 p-2 text-xl font-bold text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:outline-none"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 text-center text-gray-800">
                <div className="mb-6 flex items-center justify-around">
                  {/* 1 Ad Package */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-gray-300 bg-[#CD3D36] text-lg font-bold text-white shadow-md">
                      <span>1 Ad</span>
                      <span>Package</span>
                    </div>
                    <p className="mt-2 text-xl font-bold">12 K.D</p>
                  </div>
                  {/* 5 Ads Package with Discount */}
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-gray-300 bg-[#CD3D36] text-lg font-bold text-white shadow-md">
                      <span>5 Ads</span>
                      <span>Package</span>
                    </div>
                    <p className="mt-2 text-xl font-bold">55 K.D</p>
                    {/* Discount Tag */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 rotate-12 transform rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                      8% Disc.
                    </div>
                  </div>
                </div>

                {/* Bo Shamlan Logo/Name in Modal */}
                <div className="mt-6 flex items-center justify-center">
                  <img
                    src="https://placehold.co/50x50/000000/FFFFFF?text=Logo" // Placeholder for Bo Shamlan logo
                    alt="Bo Shamlan Logo"
                    className="mr-3 h-12 w-12 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/50x50/CCCCCC/000000?text=B";
                    }}
                  />
                  <span className="text-lg font-semibold text-gray-700">
                    Bo Shamlan <br /> Properties Finder
                  </span>
                </div>
              </div>

              {/* Modal Footer (Close Button) */}
              <div className="border-t border-gray-200 bg-gray-100 p-4 text-center">
                <button
                  onClick={closeModal}
                  className="rounded-lg bg-gray-300 px-8 py-2 font-bold text-gray-800 shadow-md transition-all duration-200 hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            // Default image modal for other cards (original functionality)
            <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border-4 border-purple-500 bg-gray-900 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="focus:ring-opacity-50 absolute top-4 right-4 z-10 flex h-10 w-10 transform items-center justify-center rounded-full bg-red-600 p-2 text-xl font-bold text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:outline-none"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Modal Image */}
              <img
                src={modalImageSrc}
                alt="Larger Preview"
                className="h-full w-full rounded-xl object-contain p-4" // object-contain to ensure image fits within the modal without cropping
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/900x600/CCCCCC/000000?text=Image+Unavailable";
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Custom Styles for Animations & Fonts */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        /* Inter Font Import */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }

        /* Specific Game Button Styles */
        .game-btn {
          font-weight: 600; /* Semi-bold */
          font-size: 12px; /* Set font size to 12px as requested */
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          border: 1px solid rgba(0,0,0,0.1); /* Subtle border */
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
