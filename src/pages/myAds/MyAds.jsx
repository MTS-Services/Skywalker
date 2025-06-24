import React, { useEffect, useState } from 'react'
import MyCredits from '../../components/MyCredits'
import { useLanguage } from '../../context/LanguageContext';

export default function MyAds() {
    const [myAds, setMyAds] = useState([]);

    // const fetchMyAds = async () => {
    //     try {
    //         const response = await fetch('/data/myAds.json');
    //         const data = await response.json();
    //         setMyAds(data);
    //     } catch (error) {
    //         console.error('Error fetching my ads:', error);
    //     }
    // }

    // useEffect(() => {
    //     fetchMyAds();
    // }, []);

    const { isRTL, t } = useLanguage();
    return (
        <main className='min-h-screen bg-primary-50/50 py-10'>
            <MyCredits />
            <div>
                {/* <div className='container mx-auto max-w-3xl px-4'>
                    <div className="flex flex-col gap-5">
                        {packages.map((tem, index) => (
                            <MyAdCard key={index} ad={tem} />
                        ))}
                    </div>
                </div> */}
            </div>
        </main>
    )
}
