import scss from '../styles/menu.module.scss'
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/router'
import { MenuContext } from "../lib/menuContext";
import React, { useContext } from 'react'

import Chevron from '../public/chevron_down_white.svg'

export default function Menu({addClass}) {
  const router = useRouter();
  const { toggle, toggleFunction } = useContext(MenuContext);

  return(
    <>
      <ul className={`${scss.list} ${addClass}`}>
        <li><Link href='/kropsterapi'><a>Kropsterapi</a></Link></li>
        <li><Link href='/manuvision-traening'><a>ManuVision Træning</a></Link></li>
        <li><Link href='/det-kaerlige-brusebad'><a>Det Kærlige Brusebad</a></Link></li>
        <li><Link href='/om-maria'><a>Om Maria</a></Link></li>
        <li><Link href='/artikler'><a>Artikler</a></Link></li>
      </ul>
    </>
  )
}
