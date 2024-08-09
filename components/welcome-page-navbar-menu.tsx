'use client'

import React, { useState } from 'react'
import '@/styles/modules/welcome-page.scss'

export default function NavbarMenu() {
  const [menuToggle, setMenuToggle] = useState(false)

  const toggleMenu = () => {
    setMenuToggle(prev => !prev)
  }
  return (
    <>
      <button onClick={toggleMenu} className="bg-transparent rounded text-base leading-none hover:no-underline focus:no-underline lg:hidden" type="button">
        <span className='navbar-toggler-icon inline-block w-8 h-8 align-middle'></span>
      </button>

      <div className={`basis-full lg:basis-auto ${(menuToggle) ? 'ham-menu-btn open' : 'ham-menu-btn'} lg:flex lg:flex-grow lg:items-center`}>
        <ul className="pl-0 mt-3 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row">
          <li>
            <a className='link-welcome-page-navbar-menu active' href="#header">Home <span className="sr-only">(current)</span></a>
          </li>
          <li>
            <a className='link-welcome-page-navbar-menu' href="#features">Features</a>
          </li>
          <li>
            <a className='link-welcome-page-navbar-menu' href="#details">Details</a>
          </li>
          <li>
            <a className='link-welcome-page-navbar-menu' href="#pricing">Pricing</a>
          </li>
          <li>
            <a className='link-welcome-page-navbar-menu' href="#download">Download</a>
          </li>
        </ul>
       
      </div>
    </>
  )
}
