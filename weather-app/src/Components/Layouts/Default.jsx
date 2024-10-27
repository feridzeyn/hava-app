import React from 'react'
import Header from '../UI/Header'
import { Outlet } from 'react-router-dom'

export default function Default() {
  return (
    <div>
<Header/>
<Outlet/>

    </div>
  )
}
