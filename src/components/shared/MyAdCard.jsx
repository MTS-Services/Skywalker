import { useState, useRef } from "react"; // useRef import করা হয়েছে
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiClock, FiEye, FiPhone, FiShare2, FiX } from "react-icons/fi";
import { RxClock, RxReload } from "react-icons/rx";
import DiagonalRibbon from "../DiagonalRibbon";
import { BsPin, BsPinFill, BsTranslate } from "react-icons/bs";
import { FaEdit, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "../../context/LanguageContext";

const MyAdCard = ({ ad, onClick, showRenew }) => {
  const { isRTL, t, language } = useLanguage();
  const navigate = useNavigate();

  const [showMakeSuperModal, setShowMakeSuperModal] = useState(false);
  const [showRemoveSuperModal, setShowRemoveRemoveSuperModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Edit Modal state

  const formatTimeAgo = (dateString, lang) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);

    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) return lang === "ar" ? "الآن" : "just now";
      return `${minutes} ${lang === "ar" ? "دقيقة" : "minutes"} `;
    }

    return `${hours} ${lang === "ar" ? "ساعة" : "hours"} `;
  };

  const handleClick = () => {
    onClick(ad);
  };

  const handleMakeSuperModel = () => {
    setShowMakeSuperModal(!showMakeSuperModal);
  };

  const handleRemoveSuperModel = () => {
    setShowRemoveSuperModal(!showRemoveSuperModal);
  };

  const handleOpenRenewModal = () => {
    setShowRenewModal(!showRenewModal);
  };

  const handleOpenTranslateModal = () => {
    setShowTranslateModal(!showTranslateModal);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const getDaysAgo = (postDate) => {
    const now = new Date();
    const post = new Date(postDate);
    const diffTime = now - post;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <ToastContainer /> {/* Toastify container added */}
      <div className="shadow-card-shadow relative w-full cursor-pointer rounded-lg border border-transparent bg-white p-3 xl:p-4">
        <DiagonalRibbon
          text={
            ad.isOpen
              ? t.myAds.open
              : ad.isArchive
                ? t.myAds.archive
                : t.myAds.deleted
          }
          backgroundColor={
            ad.isOpen ? "#556895" : ad.isArchive ? "#556885" : "#242424"
          }
        />
        <div
          className="absolute inset-0 z-[1] rounded-lg bg-transparent"
          onClick={handleClick}
        ></div>

        {/* Main Content */}
        <div className="flex gap-3">
          {/* Image */}
          <div className="relative">
            <div className="relative size-14 flex-shrink-0 overflow-hidden rounded-md xl:size-28">
              <img
                alt={ad.title}
                src={
                  ad.images && ad.images.length > 0
                    ? ad.images[0]
                    : "https://placehold.co/112x112/EBF4FF/333333?text=Ad"
                }
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="overflow-hidden pe-6">
            <div className="line-clamp-2 font-[700] break-words">
              {ad.title}
            </div>

            <div className="h-0.5"></div>

            {/* Price & Stats */}
            <div className="flex gap-3">
              <div className="text-primary-900 rounded font-[700]">
                {ad.kd} {t.ads.currency}
              </div>

              <div className="  flex items-center gap-1.5 
              rounded-full px-3 py-1 text-xs sm:text-sm">
                <FiClock />
                <span>{getDaysAgo(ad.postCreateAt)} Days</span>
              </div>

              <div className="text-primary-900 flex items-center gap-1 text-xs">
                <FiEye />
                <div className="text-xs">{ad.views}</div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-2 line-clamp-2 hidden text-sm text-gray-600 lg:block">
              {ad.description}
            </div>
          </div>
        </div>
        <div className="mt-2 line-clamp-2 text-sm text-gray-600 lg:hidden">
          {ad.description}
        </div>

        {/* Actions */}
        <div className="h-4"></div>
        <div className="flex items-center justify-center gap-3">
          {/* Action Button 1 */}
          {showRenew && (
            <button
              onClick={handleOpenRenewModal}
              className="text-on-primary relative z-[2] m-0 inline-flex h-auto shrink-0 items-center justify-center rounded-lg bg-transparent p-0 text-base font-bold whitespace-nowrap transition-colors select-none active:bg-transparent disabled:opacity-50"
            >
              <div className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-green-200 active:border">
                <RxReload className="text-green-700" />
              </div>
            </button>
          )}
          {/* Action Button 2 */}
          <button
            onClick={ad.isSuper ? handleRemoveSuperModel : handleMakeSuperModel}
            className="text-on-primary relative z-[2] m-0 inline-flex h-auto shrink-0 items-center justify-center rounded-lg bg-transparent p-0 text-base font-bold whitespace-nowrap transition-colors select-none active:bg-transparent disabled:opacity-50"
          >
            <div className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-200 active:border">
              {ad.isSuper ? (
                <BsPinFill className="text-red-700" />
              ) : (
                <BsPin className="text-red-700" />
              )}
            </div>
          </button>
          {/* Action Button 3 */}
          <button
            onClick={handleOpenTranslateModal}
            className="text-on-primary relative z-[2] m-0 inline-flex h-auto shrink-0 items-center justify-center rounded-lg bg-transparent p-0 text-base font-bold whitespace-nowrap transition-colors select-none active:bg-transparent disabled:opacity-50"
          >
            <div className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-indigo-200 active:border">
              <BsTranslate className="text-indigo-700" />
            </div>
          </button>
          {/* Action Button 4: Edit */}
          <button
            onClick={handleOpenEditModal} // This function will open the Edit Modal
            className="text-on-primary relative z-[2] m-0 inline-flex h-auto shrink-0 items-center justify-center rounded-lg bg-transparent p-0 text-base font-bold whitespace-nowrap transition-colors select-none active:bg-transparent disabled:opacity-50"
          >
            <div className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-200 active:border">
              <FaEdit className="text-blue-700" />
            </div>
          </button>
        </div>
      </div>
      {/* Modals */}
      {showMakeSuperModal && addSuperModal({ ad, handleMakeSuperModel, t })}
      {showRemoveSuperModal &&
        removeSuperModal({ ad, handleRemoveSuperModel, t })}
      {showRenewModal && renewModal({ ad, handleOpenRenewModal, t })}
      {showTranslateModal &&
        translateModal({ ad, handleOpenTranslateModal, t, language, isRTL })}
      {showEditModal && (
        <EditModal ad={ad} handleCloseEditModal={handleOpenEditModal} t={t} />
      )}
    </>
  );
};

// Edit Modal Component
function EditModal({ ad, handleCloseEditModal, t }) {
  const [editedTitle, setEditedTitle] = useState(ad.title);
  const [editedDescription, setEditedDescription] = useState(ad.description);
  const [editedKd, setEditedKd] = useState(ad.kd);
  const [selectedImage, setSelectedImage] = useState(null); // State for the new image file
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    ad.images && ad.images.length > 0 ? ad.images[0] : "" // Initial preview URL from existing ad image
  );
  const fileInputRef = useRef(null); // Reference for the file input

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for image preview
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(ad.images && ad.images.length > 0 ? ad.images[0] : ""); // Revert to original if no file selected
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add your API call here to update the ad information
    console.log("Saving changes:", {
      id: ad.id,
      title: editedTitle,
      description: editedDescription,
      kd: editedKd,
      image: selectedImage, // Log the selected image file (for actual upload, you'd send this to a file storage service)
    });
    // Close the modal and show success message if API call is successful
    toast.success(t.myAds.editSuccessMessage || "Ad updated successfully!");
    handleCloseEditModal();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
      <div className="fixed inset-0 w-screen overflow-y-auto z-30">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[700] text-lg">
                {t.myAds.editAdTitle || "Edit Ad"}
              </h2>
              <button onClick={handleCloseEditModal} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.myAds.imageLabel || "Ad Image"}
                </label>
                <div className="mt-1 flex flex-col items-center">
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Ad Preview"
                      className="w-32 h-32 object-cover rounded-md mb-2 border border-gray-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/128x128/CCCCCC/000000?text=Image+Error";
                      }}
                    />
                  )}
                  <input
                    type="file"
                    id="imageUpload"
                    ref={fileInputRef}
                    className="hidden" // Hide the default file input
                    onChange={handleImageChange}
                    accept="image/*" // Only accept image files
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()} // Trigger click on hidden input
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
                  >
                    {t.myAds.changeImageButton || "Change Image"}
                  </button>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.myAds.titleLabel || "Title"}
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.myAds.descriptionLabel || "Description"}
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
              </div>
              {/* Price (KD) Input */}
              <div>
                <label htmlFor="kd" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.myAds.priceLabel || "Price (KD)"}
                </label>
                <input
                  type="number"
                  id="kd"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
                  value={editedKd}
                  onChange={(e) => setEditedKd(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {t.myAds.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {t.myAds.save || "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


// Existing Modals (no changes here, just for context)
function addSuperModal({ ad, handleMakeSuperModel, t }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
      <div className="fixed inset-0 w-screen overflow-y-auto z-30">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <h2 className="font-[700] mb-2">{t.myAds.confirmation}</h2>
            <div>
              <p className="text-sm text-gray-600">{t.myAds.makeSuper}</p>
              <div className="h-4"></div>
              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={handleMakeSuperModel}
                  className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md text-primary-900 underline-offset-4 mx-7 border border-primary-200 hover:bg-primary-50/50 px-4 lg:px-8 py-2 lg:py-4 text-sm"
                >
                  {t.myAds.cancel}
                </button>
                <button
                  onClick={handleMakeSuperModel}
                  className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md font-[700] bg-primary text-white active:bg-active-primary px-4 lg:px-8 py-2 lg:py-4 text-sm bg-primary-500 hover:bg-primary-600"
                >
                  {t.myAds.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function removeSuperModal({ ad, handleRemoveSuperModel, t }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
      <div className="fixed inset-0 w-screen overflow-y-auto z-30">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <h2 className="font-[700] mb-2">{t.myAds.confirmation}</h2>
            <div>
              <div>{t.myAds.removeSuper}</div>
              <div className="h-4"></div>
              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={handleRemoveSuperModel}
                  className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md text-primary-900 underline-offset-4 mx-7 border border-primary-200 hover:bg-primary-50/50 px-4 lg:px-8 py-2 lg:py-4 text-sm"
                >
                  {t.myAds.cancel}
                </button>
                <button
                  onClick={handleRemoveSuperModel}
                  className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md font-[700] bg-primary text-white active:bg-active-primary px-4 lg:px-8 py-2 lg:py-4 text-sm bg-primary-500 hover:bg-primary-600"
                >
                  {t.myAds.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function renewModal({ ad, handleOpenRenewModal, t }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
      <div className="fixed inset-0 w-screen overflow-y-auto z-30">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <h2 className="font-[700] mb-2">{t.myAds.confirmation}</h2>
            <div>
              <p className="text-sm text-gray-600">{t.myAds.renew}</p>
              <div className="h-4"></div>
              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={handleOpenRenewModal}
                  className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md text-primary-900 underline-offset-4 mx-7 border border-primary-200 hover:bg-primary-50/50 px-4 lg:px-8 py-2 lg:py-4 text-sm"
                >
                  {t.myAds.cancel}
                </button>
                <button
                  onClick={handleOpenRenewModal}
                  className="shrink-0 inline-flex items-center justify-center select-none whitespace-nowrap transition-colors disabled:opacity-50 h-auto rounded-md font-[700] text-sm bg-primary text-white active:bg-active-primary px-4 lg:px-8 py-2 lg:py-4 bg-primary-500 hover:bg-primary-600"
                >
                  {t.myAds.confirm}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function translateModal({ ad, handleOpenTranslateModal, t, language, isRTL }) {
  const formatTimeAgo = (dateString, lang) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - postDate) / 1000);
    const hours = Math.floor(seconds / 3600);

    if (hours < 1) {
      const minutes = Math.floor(seconds / 60);
      if (minutes < 1) return lang === "ar" ? "just now" : "الآن";
      return `${minutes} ${lang === "ar" ? "minutes" : "دقيقة"}`;
    }

    return `${hours} ${lang === "ar" ? "hours" : "ساعة"}`;
  };

  const handleShareClick = async (ad) => {
    const adUrl = `${window.location.origin}/ads/${ad.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: ad.title,
          text: ad.description,
          url: adUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(adUrl);
        console.log(t.ads.linkCopied); // Changed alert to console.log
      } catch (err) {
        console.error("Failed to copy text: ", err);
        console.log(t.ads.failedToCopy); // Changed alert to console.log
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-30" aria-hidden="true"></div>
      <div className="fixed inset-0 w-screen overflow-y-auto z-30" dir={isRTL ? "ltr" : "rtl"}>
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <div>
              <div>
                <div className="flex items-center justify-between" dir={isRTL ? "rtl" : "ltr"}>
                  <h2 className="text-sm font-[700] text-gray-600">
                    {t.myAds.translateTitle}
                  </h2>

                  <button onClick={handleOpenTranslateModal}>
                    <FiX />
                  </button>
                </div>
                <div className="h-4"></div>
                {/* Warning/Error Message Section */}
                <div className="overflow-x-hidden">
                  <div className="flex items-center justify-center gap-2 text-xl p-2 w-full shadow-inner text-white bg-orange-400 rounded-t-lg">
                    <FiAlertTriangle />
                    <span>{t.myAds.translateMessage}</span>
                  </div>
                  {/* Ad Content Preview Section */}
                  <div className="flex flex-col items-center bg-primary-400 rounded-b-lg text-white px-6 relative">
                    <div className="max-w-2xl mx-auto mt-4">
                      <h1 className="text-lg font-[700] text-center">
                        {ad.title}
                      </h1>
                    </div>
                    <div className="text-lg font-[700] mt-1.5">
                      {ad.kd} {t.myAds.currency}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <div className="flex items-center justify-center gap-1 rounded bg-primary-300 py-1 px-1.5 text-xs">
                        <RxClock />
                        {formatTimeAgo(ad.postCreateAt, language)}
                      </div>
                      {/* Views count */}
                      <div className="flex items-center justify-center gap-1 rounded bg-primary-300 py-1 px-1.5 text-xs min-w-[62px]">
                        <FiEye />
                        <div>{ad.views}</div>
                      </div>
                      {/* Download button */}
                      <button onClick={() => handleShareClick(ad)} type="button" className="flex items-stretch">
                        <div className="flex items-center justify-center gap-1 rounded bg-primary-300 py-1 px-1.5 text-xs">
                          <FiShare2 />
                        </div>
                      </button>
                    </div>
                    <div className="h-6"></div>
                  </div>
                </div>
              </div>
              {/* Ad Description */}
              <div className="max-w-2xl mx-auto">
                <div className="p-6 text-center leading-lg">
                  {ad.description}
                </div>
              </div>
              {/* Call and WhatsApp Buttons */}
              <div className="flex gap-3 justify-center">
                <a
                  href={`tel:${ad.whatsapp}`}
                  className="bg-success active:bg-active-success bg-green-600 inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none sm:w-auto"
                >
                  <FiPhone className={isRTL ? "" : "-rotate-90"} />
                  <div className="font-normal">{ad.whatsapp}</div>
                </a>
                <div>
                  <a
                    href={`https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="border-green-600 text-green-600 bg-main hover:bg-green-100 flex h-12 w-full items-center justify-center rounded-lg border p-1 text-2xl transition-colors sm:w-12"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
              <div className="h-6"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAdCard;
