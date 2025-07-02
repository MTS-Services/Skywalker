import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertTriangle, FiEye, FiPhone, FiShare2, FiX } from "react-icons/fi";
import { RxClock, RxReload } from "react-icons/rx";
import { useLanguage } from "../../context/LanguageContext";
import DiagonalRibbon from "../DiagonalRibbon";
import { BsPin, BsPinFill, BsTranslate } from "react-icons/bs";
import { FaEdit, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const MyAdCard = ({ ad, onClick, showRenew }) => {
  const { isRTL, t, language } = useLanguage();
  const navigate = useNavigate();

  const [showMakeSuperModal, setShowMakeSuperModal] = useState(false);
  const [showRemoveSuperModal, setShowRemoveSuperModal] = useState(false);
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

              <div className="text-primary-900 flex items-center gap-1 rounded text-xs">
                <RxClock />
                <span>{formatTimeAgo(ad.postCreateAt, language)}</span>
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

  const handleSave = (e) => {
    e.preventDefault();
    // Add your API call here to update the ad information
    console.log("Saving changes:", {
      id: ad.id,
      title: editedTitle,
      description: editedDescription,
      kd: editedKd,
    });
    // Close the modal and show success message if API call is successful
    toast.success(t.myAds.editSuccessMessage || "Ad updated successfully!"); // Success message added
    handleCloseEditModal();
  };

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/70" aria-hidden="true"></div>
      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-[700]">
                {t.myAds.editAdTitle || "Edit Ad"}
              </h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.myAds.titleLabel || "Title"}
                </label>
                <input
                  type="text"
                  id="title"
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.myAds.descriptionLabel || "Description"}
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="kd"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  {t.myAds.priceLabel || "Price (KD)"}
                </label>
                <input
                  type="number"
                  id="kd"
                  className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                  value={editedKd}
                  onChange={(e) => setEditedKd(e.target.value)}
                />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="focus:ring-primary-500 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  {t.myAds.cancel || "Cancel"}
                </button>
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
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
      <div className="fixed inset-0 z-30 bg-black/70" aria-hidden="true"></div>
      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <h2 className="mb-2 font-[700]">{t.myAds.confirmation}</h2>
            <div>
              <p className="text-sm text-gray-600">{t.myAds.makeSuper}</p>
              <div className="h-4"></div>
              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={handleMakeSuperModel}
                  className="text-primary-900 border-primary-200 hover:bg-primary-50/50 mx-7 inline-flex h-auto shrink-0 items-center justify-center rounded-md border px-4 py-2 text-sm whitespace-nowrap underline-offset-4 transition-colors select-none disabled:opacity-50 lg:px-8 lg:py-4"
                >
                  {t.myAds.cancel}
                </button>
                <button
                  onClick={handleMakeSuperModel}
                  className="bg-primary active:bg-active-primary bg-primary-500 hover:bg-primary-600 inline-flex h-auto shrink-0 items-center justify-center rounded-md px-4 py-2 text-sm font-[700] whitespace-nowrap text-white transition-colors select-none disabled:opacity-50 lg:px-8 lg:py-4"
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
      <div className="fixed inset-0 z-30 bg-black/70" aria-hidden="true"></div>
      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <h2 className="mb-2 font-[700]">{t.myAds.confirmation}</h2>
            <div>
              <div>{t.myAds.removeSuper}</div>
              <div className="h-4"></div>
              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={handleRemoveSuperModel}
                  className="text-primary-900 border-primary-200 hover:bg-primary-50/50 mx-7 inline-flex h-auto shrink-0 items-center justify-center rounded-md border px-4 py-2 text-sm whitespace-nowrap underline-offset-4 transition-colors select-none disabled:opacity-50 lg:px-8 lg:py-4"
                >
                  {t.myAds.cancel}
                </button>
                <button
                  onClick={handleRemoveSuperModel}
                  className="bg-primary active:bg-active-primary bg-primary-500 hover:bg-primary-600 inline-flex h-auto shrink-0 items-center justify-center rounded-md px-4 py-2 text-sm font-[700] whitespace-nowrap text-white transition-colors select-none disabled:opacity-50 lg:px-8 lg:py-4"
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
      <div className="fixed inset-0 z-30 bg-black/70" aria-hidden="true"></div>
      <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <h2 className="mb-2 font-[700]">{t.myAds.confirmation}</h2>
            <div>
              <p className="text-sm text-gray-600">{t.myAds.renew}</p>
              <div className="h-4"></div>
              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={handleOpenRenewModal}
                  className="text-primary-900 border-primary-200 hover:bg-primary-50/50 mx-7 inline-flex h-auto shrink-0 items-center justify-center rounded-md border px-4 py-2 text-sm whitespace-nowrap underline-offset-4 transition-colors select-none disabled:opacity-50 lg:px-8 lg:py-4"
                >
                  {t.myAds.cancel}
                </button>
                <button
                  onClick={handleOpenRenewModal}
                  className="bg-primary active:bg-active-primary bg-primary-500 hover:bg-primary-600 inline-flex h-auto shrink-0 items-center justify-center rounded-md px-4 py-2 text-sm font-[700] whitespace-nowrap text-white transition-colors select-none disabled:opacity-50 lg:px-8 lg:py-4"
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
      <div className="fixed inset-0 z-30 bg-black/70" aria-hidden="true"></div>
      <div
        className="fixed inset-0 z-30 w-screen overflow-y-auto"
        dir={isRTL ? "ltr" : "rtl"}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
            <div>
              <div>
                <div
                  className="flex items-center justify-between"
                  dir={isRTL ? "rtl" : "ltr"}
                >
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
                  <div className="flex w-full items-center justify-center gap-2 rounded-t-lg bg-orange-400 p-2 text-xl text-white shadow-inner">
                    <FiAlertTriangle />
                    <span>{t.myAds.translateMessage}</span>
                  </div>
                  {/* Ad Content Preview Section */}
                  <div className="bg-primary-400 relative flex flex-col items-center rounded-b-lg px-6 text-white">
                    <div className="mx-auto mt-4 max-w-2xl">
                      <h1 className="text-center text-lg font-[700]">
                        {ad.title}
                      </h1>
                    </div>
                    <div className="mt-1.5 text-lg font-[700]">
                      {ad.kd} {t.myAds.currency}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <div className="bg-primary-300 flex items-center justify-center gap-1 rounded px-1.5 py-1 text-xs">
                        <RxClock />
                        {formatTimeAgo(ad.postCreateAt, language)}
                      </div>
                      {/* Views count */}
                      <div className="bg-primary-300 flex min-w-[62px] items-center justify-center gap-1 rounded px-1.5 py-1 text-xs">
                        <FiEye />
                        <div>{ad.views}</div>
                      </div>
                      {/* Download button */}
                      <button
                        onClick={() => handleShareClick(ad)}
                        type="button"
                        className="flex items-stretch"
                      >
                        <div className="bg-primary-300 flex items-center justify-center gap-1 rounded px-1.5 py-1 text-xs">
                          <FiShare2 />
                        </div>
                      </button>
                    </div>
                    <div className="h-6"></div>
                  </div>
                </div>
              </div>
              {/* Ad Description */}
              <div className="mx-auto max-w-2xl">
                <div className="leading-lg p-6 text-center">
                  {ad.description}
                </div>
              </div>
              {/* Call and WhatsApp Buttons */}
              <div className="flex justify-center gap-3">
                <a
                  href={`tel:${ad.whatsapp}`}
                  className="bg-success active:bg-active-success inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-green-600 px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none sm:w-auto"
                >
                  <FiPhone className={isRTL ? "" : "-rotate-90"} />
                  <div className="font-normal">{ad.whatsapp}</div>
                </a>
                <div>
                  <a
                    href={`https://wa.me/${ad.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-main flex h-12 w-full items-center justify-center rounded-lg border border-green-600 p-1 text-2xl text-green-600 transition-colors hover:bg-green-100 sm:w-12"
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
