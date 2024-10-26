import { useState } from 'react';

const CityComponent = () => {
    const cities = [
        'Abşeron', 'Ağcabədi', 'Ağdam', 'Ağdaş', 'Ağstafa', 'Ağsu', 'Astara', 'Babək',
        'Bakı', 'Balakən', 'Beyləqan', 'Bərdə', 'İsmayıllı', 'Gəncə', 'Lənkəran', 'Mingəçevir', 
        'Şəki', 'Sumqayıt', 'Zaqatala'
        // Daha çox şəhəri buraya əlavə edin
    ];

    const [searchTerm, setSearchTerm] = useState('');

    // Şəhərləri filtrləmək üçün funksiya
    const filteredCities = cities.filter((city) => 
        city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Şəhərə klikləmə funksiyası (hazırda sadəcə console-a yazacaq)
    const handleCityClick = (city) => {
        console.log(`Seçilmiş şəhər: ${city}`);
        // Burada seçilmiş şəhərin hava məlumatlarını göstərə bilərsiniz
    };

    return (
        <div>
            <h2>Bütün Azərbaycan Şəhərləri</h2>
            
            {/* Axtarış inputu */}
            <input 
                type="text" 
                placeholder="Şəhər axtarın..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />

            {/* Filter olunmuş şəhərlərin siyahısı */}
            <div className="city-list">
                {filteredCities.map((city, index) => (
                    <div key={index} className="city-item">
                        <button 
                            className="city-button"
                            onClick={() => handleCityClick(city)} // Şəhər kliklənəndə handleCityClick çağrılır
                        >
                            {city}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityComponent;

