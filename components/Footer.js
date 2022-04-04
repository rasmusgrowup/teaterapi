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
          <p>Marias Rum er et kropsterapeutisk univers, som skaber unikke oplevelser for krop, sind og sjæl. Her er rum til at være, som du er – med alt det, der fylder i dig. Marias rum tilbyder kropsterapi, ManuVision træning og Det Kærlige Brusebad, og deler et hav af perspektiver på det at være menneske.</p>
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
