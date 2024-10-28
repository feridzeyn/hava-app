import { useState } from "react";

 export function Date({getDate}){
  const [dayName, setDayName] = useState('')
const [time, setTime] = useState('')
    const date = new Date();
    const daysOfWeek = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Cümə ertəsi"];
    const dayIndex = date.getDay();
    setDayName(daysOfWeek[dayIndex])
  
  
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    setTime(`${hours}:${minutes}`)
  } 