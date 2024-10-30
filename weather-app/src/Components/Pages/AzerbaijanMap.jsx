import React, { useState } from 'react';
import mapArray from '../../Data/map.json'
import { useNavigate } from 'react-router-dom';
const AzerbaijanMap = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (region) => {
        setSelectedRegion(region);

    };
    const handleMouseLeave = () => {
        setSelectedRegion(null);
    }
    const handleCityClick = (cityName) => {
        setSelectedRegion(cityName);
        navigate(`/weather/${cityName}`)
    }

    return (
        <div className='ml-[200px] mt-[60px]'>

            <div>
                <svg viewBox="0 0 1400 800" style={{ width: '100%', height: 'auto' }}
                    baseProfile="tiny"
                    stroke="#111827"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                >
                    {mapArray.map(city => (
                        <path
                            key={city.id}
                            d={city.icon}
                            id={city.id}
                            name={city.name}
                            fill={selectedRegion === city.name ? 'white' : 'gray'}
                            onMouseEnter={() => handleMouseEnter(city.name)}
                            onMouseLeave={() => handleMouseLeave()}
                            onClick={() => {
                                handleCityClick(city.name)
                            }}
                            onMouseMove={handleMouseMove}
                        ></path>
                    ))}



</svg>
            </div>
            {selectedRegion && <div
                className='tooltip'
                style={{ top: mousePosition.y + 15, left: mousePosition.x + 15 }}> {selectedRegion}</div>
            }

        </div>
    );
};

export default AzerbaijanMap;