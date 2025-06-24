import { useLanguage } from "../../context/LanguageContext";

const TermAndCondition = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="mt-10 mb-10 px-4">
      <section className="container mx-auto max-w-7xl space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{t.termsAndConditions.title}</h1>
        </div>

        {/* Definitions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.definitions}
          </h2>
          <p>{t.termsAndConditions.boshamlan}</p>{" "}
          {/* Updated to use the correct translation key */}
        </div>

        {/* Acceptance of Terms */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.acceptanceOfTerms}
          </h2>
          <p>{t.termsAndConditions.acceptanceOfTerms}</p>
        </div>

        {/* Platform Nature and Disclaimer */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.platformNatureAndDisclaimer}
          </h2>
          <p>{t.termsAndConditions.platformNatureAndDisclaimer}</p>
        </div>

        {/* User Conduct */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.userConduct}
          </h2>
          <p>{t.termsAndConditions.userConduct}</p>
        </div>

        {/* Registration and Advertisements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.registrationAndAdvertisements}
          </h2>
          <p>{t.termsAndConditions.registrationAndAdvertisements}</p>
        </div>

        {/* Privacy Policy */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.privacyPolicy}
          </h2>
          <p>{t.termsAndConditions.privacyPolicy}</p>
        </div>

        {/* Intellectual Property */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.intellectualProperty}
          </h2>
          <p>{t.termsAndConditions.intellectualProperty}</p>
        </div>

        {/* Dispute Resolution */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.disputeResolution}
          </h2>
          <p>{t.termsAndConditions.disputeResolution}</p>
        </div>

        {/* Service Modifications */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.serviceModifications}
          </h2>
          <p>{t.termsAndConditions.serviceModifications}</p>
        </div>

        {/* Paid Services and Refund Policy */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.paidServicesRefundPolicy}
          </h2>
          <p>{t.termsAndConditions.paidServicesRefundPolicy}</p>
        </div>

        {/* Account Security */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.accountSecurity}
          </h2>
          <p>{t.termsAndConditions.accountSecurity}</p>
        </div>

        {/* Limitation of Liability */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.limitationOfLiability}
          </h2>
          <p>{t.termsAndConditions.limitationOfLiability}</p>
        </div>

        {/* Disclaimer */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.disclaimer}
          </h2>
          <p>{t.termsAndConditions.disclaimer}</p>
        </div>

        {/* Third Party Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.thirdPartyLinks}
          </h2>
          <p>{t.termsAndConditions.thirdPartyLinks}</p>
        </div>

        {/* Force Majeure */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.forceMajeure}
          </h2>
          <p>{t.termsAndConditions.forceMajeure}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {t.termsAndConditions.contactInfo}
          </h2>
          <p>{t.termsAndConditions.contactInfo}</p>
        </div>
      </section>
    </div>
  );
};

export default TermAndCondition;
