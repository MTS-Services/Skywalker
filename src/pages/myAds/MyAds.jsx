import React, { useEffect, useState } from 'react'
import MyCredits from '../../components/MyCredits'
import { useLanguage } from '../../context/LanguageContext';
import MyAdCard from '../../components/shared/MyAdCard';
import axios from 'axios';

export default function MyAds() {
    const [myAds, setMyAds] = useState([]);
    const { isRTL, t, language } = useLanguage();


    // using axios 
    const fetchMyAds = async () => {
        try {
            const response = await axios.get('/data/myAds.json');
            const data = response.data;
            // Filter the data to include only items where isOpen is true
            const openAds = data.filter(ad => ad.isOpen === true);
            setMyAds(openAds);
        } catch (error) {
            console.error('Error fetching my ads:', error);
        }
    }

    useEffect(() => {
        fetchMyAds();
    }, []);

    return (
        <main className='min-h-screen bg-gray-100 py-10'>
            <div className="max-w-2xl mx-auto mb-8">
                <MyCredits />
            </div>
            <div className="max-w-2xl mx-auto">
                <h1>
                    <span>My Ads</span>
                    <a href="/en/my-posts/archive">
                        <span className="text-xs font-bold"> (My Archived Ads)</span>
                    </a>
                </h1>
                <div className="relative min-h-48 mt-5">
                    <div className="!overflow-visible h-auto flex flex-col gap-5">
                        {myAds.length > 0 ? (
                            myAds.map((ad, index) => (
                                <MyAdCard key={index} ad={ad}/>
                            ))
                        ) : (
                            <div className="text-center mt-8 h-12 font-bold">
                                No more search results found
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    )
}
