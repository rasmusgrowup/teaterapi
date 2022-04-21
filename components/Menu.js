import scss from '../styles/menu.module.scss'
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/router'
import { MenuContext } from "../lib/menuContext";
import React, { useContext, useState } from 'react'

import Chevron from '../public/chevron_down_white.svg'
import useSWR from 'swr'
import { request } from 'graphql-request'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master', query)

export default function Menu({ addClass, footer }) {
  const router = useRouter();
  const { toggle, toggleFunction } = useContext(MenuContext);

  const { data, error } = useSWR(`
      query kropsterapiUndersider {
        kropsterapiUndersider {
          adresse
          titel
        }
      }`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return(
    <>
      <ul className={`${scss.list} ${addClass}`}>
        <div className={scss.dropdownContainer}>
          <Link href='/kropsterapi'><a className={scss.dropdownLink}>
            <span>Kropsterapi</span>
            <div style={{ display: `${ footer ? 'none' : 'inline-block' }`}}><Image src={Chevron} width='9' height='9' /></div>
          </a></Link>
          <div className={scss.dropdown} style={{ display: `${ footer ? 'none' : '' }`}}>
            <ul>
              { data.kropsterapiUndersider.map((underside) => (
                <li key={underside.adresse}>
                  <Link href={`/kropsterapi/${underside.adresse}`}>
                    <a>{underside.titel}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <li><Link href='/manuvision-traening'><a>ManuVision Træning</a></Link></li>
        <li><Link href='/det-kaerlige-brusebad'><a>Det Kærlige Brusebad</a></Link></li>
        <li><Link href='/om-maria'><a>Om Maria</a></Link></li>
        <li><Link href='/artikler'><a>Artikler</a></Link></li>
      </ul>
    </>
  )
}
