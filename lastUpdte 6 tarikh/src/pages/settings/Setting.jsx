import ButtonSubmit from "../../common/button/ButtonSubmit";
import { useLanguage } from "../../context/LanguageContext";

export default function Setting() {
  const { t, isRTL } = useLanguage();

  return (
    <div
      className="container mx-auto flex min-h-screen items-start justify-center pt-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-3xl p-10">
        <h1 className="text-xl text-black">{t.settings.title}</h1>

        <p className="mt-2 mb-2 text-gray-700">{t.settings.confirmationText}</p>

        <ButtonSubmit
          text={
            <span>
              <span className="flex items-center gap-2">
                {/* +++ Replace hardcoded text with t.settings.deleteButton +++ */}
                {t.settings.deleteButton}
              </span>
            </span>
          }
          className="!w-full rounded-xl"
        />
      </div>
    </div>
  );
}
