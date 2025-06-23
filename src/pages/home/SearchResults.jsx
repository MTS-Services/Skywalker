import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import MainLayout from '../../MainLayout';

const SearchResults = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      transactionType: params.get('transactionType'),
      regions: params.getAll('regions'),
      propertyTypes: params.getAll('propertyTypes')
    });
  }, [location.search]);

  if (!filters) return <MainLayout><div>Loading...</div></MainLayout>;

  return (
    <MainLayout>
      <div className={`container mx-auto p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{t.home.searchResults}</h1>
          
          <div className="space-y-4">
            <FilterBadge 
              label={t.home.transactionType} 
              value={filters.transactionType || t.home.none} 
              color="blue" 
            />
            
            <FilterList 
              label={t.home.regions} 
              values={filters.regions} 
              emptyText={t.home.none} 
              color="green" 
            />
            
            <FilterList 
              label={t.home.propertyTypes} 
              values={filters.propertyTypes} 
              emptyText={t.home.none} 
              color="purple" 
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t.home.propertiesFound}</h2>
          {/* Property listings would be rendered here */}
          <p className="text-gray-500">{t.home.searchResultsPlaceholder}</p>
        </div>
      </div>
    </MainLayout>
  );
};

const FilterBadge = ({ label, value, color }) => (
  <div>
    <span className="font-medium">{label}: </span>
    <span className={`bg-${color}-100 text-${color}-800 px-3 py-1 rounded-full`}>
      {value}
    </span>
  </div>
);

const FilterList = ({ label, values, emptyText, color }) => (
  <div>
    <span className="font-medium">{label}: </span>
    {values.length > 0 ? (
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((value) => (
          <span 
            key={value} 
            className={`bg-${color}-100 text-${color}-800 px-3 py-1 rounded-full`}
          >
            {value}
          </span>
        ))}
      </div>
    ) : (
      <span className="text-gray-500 ml-2">{emptyText}</span>
    )}
  </div>
);

export default SearchResults;