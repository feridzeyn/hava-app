import { useState } from "react";
import "../../src/cities.css";
import { useNavigate } from "react-router-dom";
import { cities } from "../Data/data";

const CityComponent = () => {
 

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Şəhərləri filtrləmək üçün funksiya
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Şəhərə klikləmə funksiyası (hazırda sadəcə console-a yazacaq)

  
  const handleCityClick = ({city}) => {
    
    console.log(city)

    console.log(`Seçilmiş şəhər: ${city}`);
    navigate(`weather/${city}`);

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

              onClick={() => handleCityClick({city})} // Şəhər kliklənəndə handleCityClick çağrılır

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
