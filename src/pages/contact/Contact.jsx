import { MdDoubleArrow, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";

const ContactItem = ({ label, value, isRTL }) => {
  const Icon = isRTL ? MdKeyboardDoubleArrowLeft : MdDoubleArrow;

  return (
    <li
      className={`flex items-start gap-2 ${
        isRTL ? "flex-row text-right" : "text-left"
      }`}
    >
      <span className="mt-1">
        <Icon className="text-[var(--color-primary-400)]" />
      </span>
      <span>
        <b>{label}:</b> {value}
      </span>
    </li>
  );
};

export default function Contact() {
  const { isRTL, t } = useLanguage();

  const contactDetails = [
    { label: t.contact.mobile, value: "+96560444900" },
    { label: t.contact.whatsapp, value: "+96560444900" },
    { label: t.contact.email, value: "kwmraqar@gmail.com" },
    { label: t.contact.instagram, value: "https://www.instagram.com/mraqar" },
    { label: t.contact.twitter, value: "https://x.com/mr_aqar_" },
  ];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="mt-10 mb-10 px-4">
      <section className="container mx-auto h-screen max-w-4xl space-y-6">
        <h1 className="text-2xl font-bold">{t.contact.heading}</h1>

        <p>{t.contact.description}</p>

        <ul className="space-y-3">
          {contactDetails.map((item, i) => (
            <ContactItem
              key={i}
              label={item.label}
              value={item.value}
              isRTL={isRTL}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
