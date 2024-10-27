
import { useState } from "react";
import '../assets/cities.css';


const CityComponent = () => {
  const cities = [
    "Ağdam",
    "Ağdaş",
    "Ağcabədi",
    "Ağstafa",
    "Ağsu",
    "Astara",    
    "Ağdərə",
    "Babək",                       
    "Bakı",
    "Balakən",
    "Bərdə",
    "Beyləqan",
    "Bilasuvar",
    "Daşkəsən",
    "Şabran",
    "Füzuli",
    "Gədəbəy",
    "Gəncə",
    "Goranboy",
    "Göyçay",
    "Göygöl",
   "Hacıqabul",
    "İmişli",
    "İsmayilli",
    "Cabrayil",
    "Culfa"   ,
    "Kəlbəcər",
    "Xaçmaz",
    "Xankəndi",
    "Xocavend",
    "Xırdalan",
    "Kürdəmir",
    "Lənkəran",
    "Lerik"  ,
    "Masallı",
    "Mingəçevir",
    "Naxçıvan",
    "Naftalan",
    "Neftçala",
    "Oğhuz",
    "Ordubad",
    "Qəbələ",
    "Qax",
    "Qazax",
    "Quba",
    "Qubadlı",
    "Qusar",
    "Saatlı ",
    "Sabirabad",
    "Şahbuz",
    "Şəki",
    "Şamakhi",
    "Şamkir",
    "Şərur",
    "Şirvan",
    "Siyəzən",
    "Şuşa",
    "Sumqayıt",
    "Tərtər",
    "Tovuz",
    "Ucar",
    "Yardımlı",
    "Yevlax",
    "Zaqatala",
    "Zərdab" ,               
    "Zəngilan",
    // Daha çox şəhəri buraya əlavə edin
  ];

  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="homeabout">
     

      {/* Axtarış inputu */}
      <input
        className="homeinp"
        type="text"
        placeholder="Bölgə axtarın"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter olunmuş şəhərlərin siyahısı */}
      <div className="city-list">
        {filteredCities.map((city, index) => (
          <div key={index} className="city-item">
            
              <div key={index} className="index">
               {index + 1}
             </div>
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
