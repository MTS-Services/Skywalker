import { useTranslation } from "react-i18next"

const Agents = () => {
    const { t, i18n } = useTranslation()
    const isRTL = i18n.language === "ar"

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ar" : "en"
        i18n.changeLanguage(newLang)
    }

    const agents = [
        {
            id: 1,
            name: t("agents.companies.aman.name"),
            ads: "3",
            description: t("agents.companies.aman.description"),
            logo: "🏢",
            phone: "90079738",
        },
        {
            id: 2,
            name: t("agents.companies.office.name"),
            ads: "19",
            description: t("agents.companies.office.description"),
            logo: "🏠",
            phone: "90079738",
        },
        {
            id: 3,
            name: t("agents.companies.distance.name"),
            ads: "26",
            description: t("agents.companies.distance.description"),
            logo: "🏘️",
            phone: "90079738",
        },
        {
            id: 4,
            name: t("agents.companies.agency.name"),
            ads: "41",
            description: t("agents.companies.agency.description"),
            logo: "🏗️",
            phone: "90079738",
        },
    ]

    return (
        <div className="space-y-8">

            <div className={`flex items-center space-x-4 rtl:space-x-reverse ${isRTL ? "order-1" : "order-3"}`}>
                <button
                    onClick={toggleLanguage}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    {i18n.language === "en" ? "العربية" : "English"}
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    {t("header.addFreeAd")}
                </button>
            </div>

            <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("agents.title")}</h1>
                <p className="text-gray-600">{t("agents.count", { count: agents.length })}</p>
            </div>

            <div className="space-y-6">
                {agents.map((agent) => (
                    <div key={agent.id} className="bg-white rounded-lg shadow-md p-6">
                        <div
                            className={`flex items-start space-x-4 rtl:space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                            {/* Logo */}
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                {agent.logo}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                                <div className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                                    <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                                    <div
                                        className={`flex items-center space-x-2 rtl:space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                                    >
                                        <span className="text-blue-600 font-medium">
                                            {agent.ads} {t("agents.ads")}
                                        </span>
                                        <span className="text-gray-400">|</span>
                                        <button className="text-green-600 hover:text-green-700">📱</button>
                                        <button className="text-blue-600 hover:text-blue-700">📧</button>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-3">{agent.description}</p>

                                <div
                                    className={`flex items-center space-x-4 rtl:space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    <span className="text-sm text-gray-500">
                                        {t("agents.phone")}: {agent.phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Agents
