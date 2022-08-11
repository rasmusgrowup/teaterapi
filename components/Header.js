import Image from 'next/image'
import Link from 'next/link'
import scss from '../styles/header.module.scss'
import Menu from '../components/Menu'

import React, { useContext } from 'react'
import { MenuContext } from "../lib/menuContext"

import Logo from '../public/logo_sand.svg'

export default function Header() {
  const { toggle, toggleFunction } = useContext(MenuContext);

  return (
    <>
      <header className={scss.main}>
        <div className={scss.logoWrapper}>
          <Link href='/'><a><Image src={Logo} layout='responsive'/></a></Link>
        </div>
        <div className={scss.menuWrapper}>
          <div className={scss.desktopMenu}><Menu addClass={scss.menuListDesktop}/></div>
          <div><Link href='https://system.easypractice.net/book/marias-rum'><a className={scss.button}>Book her</a></Link></div>
          <div className={scss.menuOpenButton} onClick={toggleFunction}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <div className={`${scss.mobileMenu} ${ toggle == true ? `${scss.menuIsOpen}` : '' }`}>
        <div className={scss.menuCloseButton} onClick={toggleFunction}>
          <span></span>
          <span></span>
        </div>
        <div><Menu addClass={scss.menuListMobile}/></div>
      </div>
    </>
  )
}
