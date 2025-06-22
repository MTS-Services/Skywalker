import React, { useState, useEffect } from 'react'

export default function Ads({ t, isRTL }) {

    const [ads, setAds] = useState([]);

    useEffect(() => {
        async function fetchAds() {
            try {
                const response = await fetch('/ads.json');
                const data = await response.json();
                setAds(data);
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
        }

        fetchAds();
    }, []);

    return (
        <>
            <section className='bg-gray-100 py-10'>
                <div className="container w-full max-w-7xl mx-auto">
                    <div className={`w-full max-w-xl mx-auto mb-4`}>
                        <h3 className={`text-xl font-bold text-gray-800 ${isRTL ? "mr-2" : "ml-2"}`}>{t.home.recentAdsTitle}</h3>

                        <div className={`flex flex-col items-center justify-start gap-4 mt-4`}>
                            {ads.map((ad) => (
                                <div key={ad.id} className={`flex items-center justify-start gap-2 p-4 rounded-lg shadow-md w-full ${isRTL ? "flex-row-reverse space-x-reverse" : "flex-row"}`} >

                                    <img src={ad.images && ad.images[0] ? ad.images[0] : ''} alt={ad.title} className="w-24 h-24 object-cover rounded-md flex-shrink-0" />

                                    <div className={`${isRTL ? "items-end text-right" : "items-start text-left"}`}>
                                        <h4 className={`text-lg font-semibold text-gray-800`}>{ad.title}</h4>
                                        <div className={`flex items-center  gap-2 mt-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}>
                                            <p className={`text-gray-600 ${isRTL ? "mr-2" : "ml-2"}`}>{t.home.kd}: {ad.kd}</p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
