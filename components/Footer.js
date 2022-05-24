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
          <div className={scss.socials}><Link href='https://www.instagram.com/marias_rum/'><a className='link' target='_blank'>Instagram</a></Link>
          <Link href='https://www.facebook.com/mariasrum.kropsterapi'><a className='link' target='_blank'>Facebook</a></Link></div>
          <p>Marias Rum er et kropsterapeutisk univers, som skaber unikke oplevelser for krop, sind og sjæl. Her er rum til at være, som du er – med alt det, der fylder i dig. Marias rum tilbyder kropsterapi, ManuVision træning og Det Kærlige Brusebad, og deler et hav af perspektiver på det at være menneske.</p>
          <p>Adamsminde 9, 5462 Morud<br />
            <Link href='mailto:info@mariasrum.dk'><a className='link'>info@mariasrum.dk</a></Link><br/>
            <Link href='tel:51841880'><a>+45 51 84 18 80</a></Link>
          </p>
        </div>
        <div className={scss.middle}>
          <Menu addClass={scss.menuFooter} footer />
        </div>
        <div className={scss.policy}>
          <span>©{new Date().getFullYear()} Marias Rum / </span><Link href='/handelsbetingelser'><a>Handelsbetingelser</a></Link>
        </div>
      </footer>
    </>
  )
}
