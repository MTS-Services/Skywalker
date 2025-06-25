import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext';
import { NavLink } from 'react-router-dom';
import MyAdCard from './shared/MyAdCard';

export default function MyCredits() {
    const { isRTL, t } = useLanguage();
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch('/data/packages.json');
                const data = await response.json();
                setPackages(data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        }

        fetchPackages();
    }, [])

    return (
        <>
            <div className="max-w-2xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
                <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap">
                    <div className="relative w-full rounded-lg bg-white shadow-card-shadow px-4 max-w-md grow-1">
                        <div className="h-full flex flex-col">
                            <h2 className="text-center mt-5">{t.creditComponent.title}</h2>
                            <div className="flex items-center justify-center gap-3 my-4">
                                {packages.map((tem, index) => (
                                    <div key={index} className="px-5 py-3 rounded-lg border border-primary-200 flex flex-col items-center justify-center gap-2">
                                        <div className="text-2xl font-bold text-primary-dark leading-none">{tem.credits}</div>
                                        <div className="leading-none">{tem.name}</div>
                                    </div>
                                ))}
                            </div>
                            <NavLink
                                to="/buy-credits"
                                className="bg-success text-on-success active:bg-active-success bg-primary-300 inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg px-6 text-base font-bold whitespace-nowrap text-white transition-colors select-none sm:w-auto cursor-pointer"
                            >
                                {t.creditComponent.buyCredit}
                            </NavLink>
                            <div className="h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
