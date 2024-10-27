import React from "react";
import { Link, NavLink } from "react-router-dom";


export default function Navbar() {
  return (
    <div>
      <div>
        <h1 className="text-3xl text-white font-bold t-h">
          Azərbaycan - Bölgələrə Görə Hava Məlumatı
        </h1>
      </div>
      <div className="mt-10">
        <ul className="l-h flex items-center justify-center bg-[#050917] w-[240px] h-[60px] rounded-full font-medium m-auto">
          <li className="">
            <NavLink className={'r-l'} to={"/"}>Bölgə Siyahısı</NavLink>
          </li>
          <li className=" text-[14px] text-white">
            <NavLink className={'c-l'} to={"/azerbaijanMap"}>Xəritə</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
