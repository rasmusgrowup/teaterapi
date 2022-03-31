import scss from '../styles/footer.module.scss'
import Link from "next/link"
import Image from "next/image"
import Menu from '../components/Menu'
import React from 'react'

import Logo from '../public/logo_dark.svg'

export default function Footer({footerTekst}) {

  return(
    <>
      <footer className={scss.main}>
        <div className={scss.top}>
          <Image src={Logo} />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        <div className={scss.middle}>
          <Menu addClass={scss.menuFooter}/>
        </div>
        <div className={scss.bottom}>
          <span>©{new Date().getFullYear()} Marias Rum — Webdesign af <Link href='https://growupstudio.dk'><a>Growup Studio</a></Link></span>
          <span></span>
        </div>
      </footer>
    </>
  )
}
