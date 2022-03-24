import scss from '../styles/menu.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuContext } from "../lib/menuContext";
import React, { useContext } from 'react'

export default function Menu({addClass}) {
  const router = useRouter();
  const { toggle, toggleFunction } = useContext(MenuContext);

  return(
    <>
      <ul className={`${scss.list} ${addClass}`}>
        <li><Link href='/'><a>Kropsterapi</a></Link></li>
        <li><Link href='/'><a>Det Kærlige Brusebad</a></Link></li>
        <li><Link href='/'><a>ManuVision træning</a></Link></li>
        <li><Link href='/'><a>Om Marias Rum</a></Link></li>
        <li><Link href='/'><a>Artikler</a></Link></li>
      </ul>
    </>
  )
}
