import React from 'react';
import {Link, NavLink} from 'react-router-dom';


export default function Navbar() {
  return (
    <div >
        <div>
        <h1 className='text-3xl text-white font-bold'>Azərbaycan - Bölgələrə Görə Hava Məlumatı</h1>
        </div>
        <div className='mt-10 '>
        <ul className=' flex items-center justify-center bg-[#050917] w-[240px] h-[60px] rounded-full font-medium m-auto sticky' >
            <li className='mr-10 text-[14px] text-white'>
          <NavLink to={'/'} >Bölgə Sİyahısı</NavLink>
          </li>
          <li className=' text-[14px] text-white' >
          <NavLink to={'/azerbaijanMap'}>Xəritə</NavLink>
          </li>
        </ul>
        </div>
    </div>
  )

}
