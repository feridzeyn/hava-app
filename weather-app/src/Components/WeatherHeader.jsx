import React from "react";

export default function WeatherHeader() {
  function goBack() {
    window.history.back();
  }
  return (
    <div className="p-[25px] bg-[#111827]">
      <button onClick={goBack} className="text-white font-semibold text-[20px]">
        <i className="fa-solid fa-arrow-left mr-2"></i>Geri Qayıt
      </button>
    </div>
  );
}
