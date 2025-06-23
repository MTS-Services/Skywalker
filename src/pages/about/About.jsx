import { MdDoubleArrow, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useLanguage } from "../../context/LanguageContext";

const ListItem = ({ title, desc, isRTL }) => {
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
        <b>{title}:</b> {desc}
      </span>
    </li>
  );
};

const SimpleItem = ({ text, isRTL }) => {
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
      <span>{text}</span>
    </li>
  );
};

export default function About() {
  const { isRTL, t } = useLanguage();

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="mt-10 mb-10 px-4">
      <section className="container mx-auto max-w-7xl space-y-8">
        {/* Intro */}
        <div className="space-y-4">
          <h1 className="text-2xl leading-snug font-bold">
            <span className="text-[var(--color-primary-400)]">Mr Aqar</span> |{" "}
            {t.about.heading}
          </h1>
          <p>{t.about.intro}</p>
        </div>

        {/* Why Choose */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t.about.whyChooseTitle}</h2>
          <ul className="space-y-3">
            {t.about.whyChoose.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                desc={item.desc}
                isRTL={isRTL}
              />
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t.about.servicesTitle}</h2>
          <ul className="space-y-3">
            {t.about.services.map((item, i) => (
              <SimpleItem key={i} text={item} isRTL={isRTL} />
            ))}
          </ul>
        </div>

        {/* Our Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t.about.featuresTitle}</h2>
          <ul className="space-y-3">
            {t.about.features.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                desc={item.desc}
                isRTL={isRTL}
              />
            ))}
          </ul>
        </div>

        {/* Vision, Mission, Goal */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">{t.about.ourVision}</h2>
          <p>{t.about.ourVisionDesc}</p>

          <h2 className="text-2xl font-bold">{t.about.ourMission}</h2>
          <p>{t.about.ourMissionDesc}</p>

          <h2 className="text-2xl font-bold">{t.about.ourGoal}</h2>
          <p>{t.about.ourGoalDesc}</p>

          <h2 className="text-2xl font-bold">{t.about.callToAction}</h2>
          <p>{t.about.callToActionDesc}</p>

          <p className="mt-2 font-bold">{t.about.hashtags}</p>

          <p className="mt-2">
            {t.about.finalNote}{" "}
            <span className="font-bold text-[var(--color-primary-400)]">
              Mr Aqar.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
