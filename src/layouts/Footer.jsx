import { FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// Individual footer column
const FooterColumn = ({ title, links, isRTL }) => (
  <div>
    <h4 className="mb-2 text-base font-bold">{title}</h4>
    <ul className="space-y-1">
      {links.map(({ to, label }) => (
        <FooterLink key={to} to={to} label={label} isRTL={isRTL} />
      ))}
    </ul>
  </div>
);

// Link with bilingual support
const FooterLink = ({ to, label, isRTL }) => {
  const text = typeof label === "string" ? label : isRTL ? label.ar : label.en;
  return (
    <li>
      <Link
        to={to}
        className="transition-colors hover:text-[var(--color-primary-100)]"
      >
        {text}
      </Link>
    </li>
  );
};

// Social icon button
const FooterIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="rounded bg-white/20 p-2 hover:bg-white/30"
  >
    {icon}
  </a>
);

// App store badge
const StoreBadge = ({ src, alt, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <img src={src} alt={alt} className="h-10" />
  </a>
);

const rentLinks = [
  {
    to: "/rent/apartments",
    label: { en: "Apartments for rent", ar: "شقق للايجار" },
  },
  { to: "/rent/houses", label: { en: "Houses for rent", ar: "بيوت للايجار" } },
  {
    to: "/rent/commercials",
    label: { en: "Commercials for rent", ar: "تجاري للايجار" },
  },
  {
    to: "/rent/buildings",
    label: { en: "Buildings for rent", ar: "عمارات للايجار" },
  },
  {
    to: "/rent/chalets",
    label: { en: "Chalets for rent", ar: "شاليهات للايجار" },
  },
  { to: "/rent/farms", label: { en: "Farms for rent", ar: "مزارع للايجار" } },
  { to: "/rent/lands", label: { en: "Lands for rent", ar: "اراضي للايجار" } },
];

const saleLinks = [
  { to: "/sale/houses", label: { en: "Houses for sale", ar: "بيوت للبيع" } },
  { to: "/sale/lands", label: { en: "Lands for sale", ar: "اراضي للبيع" } },
  {
    to: "/sale/buildings",
    label: { en: "Buildings for sale", ar: "عمارات للبيع" },
  },
  {
    to: "/sale/apartments",
    label: { en: "Apartments for sale", ar: "شقق للبيع" },
  },
  {
    to: "/sale/chalets",
    label: { en: "Chalets for sale", ar: "شاليهات للبيع" },
  },
  {
    to: "/sale/commercials",
    label: { en: "Commercials for sale", ar: "تجاري للبيع" },
  },
  { to: "/sale/farms", label: { en: "Farms for sale", ar: "مزارع للبيع" } },
];

const exchangeLinks = [
  {
    to: "/exchange/lands",
    label: { en: "Lands for exchange", ar: "اراضي للبدل" },
  },
  {
    to: "/exchange/houses",
    label: { en: "Houses for exchange", ar: "بيوت للبدل" },
  },
];

const pagesLinks = [
  { to: "/agents", label: { en: "Agents", ar: "المكاتب" } },
  { to: "/about", label: { en: "About Us", ar: "نبذة عنا" } },
  { to: "/contact", label: { en: "Contact Us", ar: "إتصل بنا" } },
  {
    to: "/terms",
    label: { en: "Terms and Conditions", ar: "الشروط والأحكام" },
  },
  { to: "/sitemap", label: { en: "Sitemap", ar: "خريطة الموقع" } },
];

// Footer Component
const Footer = () => {
  const { isRTL } = useLanguage();

  return (
    <footer className="bg-[var(--color-primary-600)] px-6 py-10 text-sm text-white">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        <FooterColumn
          title={isRTL ? "عقارات للايجار" : "Properties for rent"}
          links={rentLinks}
          isRTL={isRTL}
        />
        <FooterColumn
          title={isRTL ? "عقارات للبيع" : "Properties for sale"}
          links={saleLinks}
          isRTL={isRTL}
        />
        <FooterColumn
          title={isRTL ? "عقارات للبدل" : "Properties for exchange"}
          links={exchangeLinks}
          isRTL={isRTL}
        />
        <div>
          <h4 className="mb-2 text-base font-semibold">
            {isRTL ? "صفحات " : "Pages"}
          </h4>
          <ul className="space-y-1">
            {pagesLinks.map(({ to, label }) => (
              <FooterLink key={to} to={to} label={label} isRTL={isRTL} />
            ))}
          </ul>

          <div className="mt-4 flex space-x-3">
            <FooterIcon
              href="https://www.youtube.com/@mr_aqar"
              icon={<FaYoutube />}
            />
            <FooterIcon
              href="https://www.instagram.com/mraqar"
              icon={<FaInstagram />}
            />
            <FooterIcon href="https://x.com/mr_aqar_" icon={<FaTwitter />} />
          </div>

          <div className="mt-4 flex space-x-2">
            <StoreBadge
              src="/GooglePlay.png"
              alt="Google Play"
              href="https://play.google.com/"
            />
            <StoreBadge
              src="/AppleStore.png"
              alt="App Store"
              href="https://www.apple.com/app-store/"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
