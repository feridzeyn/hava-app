import React from "react";

// Azərbaycan dilində həftənin günləri və aylar
const days = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"];

// Tarixi Azərbaycan dilində formatlayan funksiya
 const formatAzerbaijaniDate = (date) => {
  
  const dayName = days[date.getDay()];

  return `${dayName}`;
};

// Bugünkü tarixi və qarşıdakı 5 günü göstərən komponent
export const UpcomingDays = () => {
  const today = new Date();

  // Gələcək 5 günü hesablamaq üçün massiv yaradırıq
  const daysArray = Array.from({ length: 5 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDay() +i);
    return formatAzerbaijaniDate(day);
  });
return daysArray;
 
};


