import React from 'react';
import CityList from './CityList'; // Bu sizin faylın adı olacaq

const RegionsAndMapPage = () => {
    return (
        <div>
            <h1>Azərbaycan - Bölgələrə Görə Hava Məlumatı</h1>

            {/* Şəhərlərin siyahısı və axtarış */}
            <CityList />

            {/* Mövcud region və xəritə kodunuz */}
        </div>
    );
};

export default RegionsAndMapPage;
