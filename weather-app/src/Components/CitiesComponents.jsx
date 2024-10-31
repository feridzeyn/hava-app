import { useState } from "react";
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
    
    navigate(`weather/${city}`);

    

  
  };

  return (
    <div className="container">
      {/* Axtarış inputu */}
      <input
        className="block w-[700px] p-4 ps-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#111827] focus:ring-blue-500 focus:border-blue-500 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10 mt-10 mx-auto"
        type="text"
        placeholder="Bölgə axtarın"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter olunmuş şəhərlərin siyahısı */}
      <div className="flex flex-wrap justify-center items-center text-center text-white font-medium ">
        {filteredCities.map((city, index) => (
          <button onClick={()=>handleCityClick({city})} key={index} className="flex border-[1px] rounded-full w-[230px] p-2 text-center items-center mx-6 my-4">
            <div key={index} className="bg-[#4036df] rounded-[50%] py-1.5 px-3.5 text-center ml-2 mr-5">
              {index + 1}
            </div>
        
              {city}
           
          </button>
        ))}
      </div>
    </div>
  );
};

export default CityComponent;
