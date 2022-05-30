import scss from '../styles/menu.module.scss'
import footerStyling from '../styles/footer.module.scss'

// Imports
import Link from 'next/link'
import Image from "next/image"
import { useRouter } from 'next/router'
import { MenuContext } from "../lib/menuContext";
import React, { useContext, useState } from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'

// Components
import Chevron from '../public/chevron_down_white.svg'
import ChevronDown from '../components/Icons/ChevronDown'
import InstaIcon from '../components/Icons/InstaIcon'
import FaceIcon from '../components/Icons/FaceIcon'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master', query)

export default function Menu({ addClass, footer }) {
  const router = useRouter();
  const { toggle, toggleFunction } = useContext(MenuContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown)
    return
  }

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
        { footer ?
          <li><Link href='/kropsterapi'><a>Kropsterapi</a></Link></li>
          :
          <div className={scss.dropdownContainer}>
            <div className={scss.dropdownLink} onClick={toggleDropdown}>
              <span>Kropsterapi</span>
              <div style={{ display: `${ footer ? 'none' : 'inline-block' }`}}><ChevronDown /></div>
            </div>
            <div className={`${scss.dropdown} ${ openDropdown ? `${scss.dropdownOpened}` : ''}`} style={{ display: `${ footer ? 'none' : '' }`}}>
              <ul>
                <li className={scss.dropdownTop}>
                  <Link href='/kropsterapi'><a>
                    Generelt
                  </a></Link>
                </li>
                { data.kropsterapiUndersider.map((underside) => (
                  <li key={underside.adresse} onClick={toggleFunction}>
                    <Link href={`/kropsterapi/${underside.adresse}`}>
                      <a>{underside.titel}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
        <li onClick={toggleFunction}><Link href='/manuvision-traening'><a>ManuVision Træning</a></Link></li>
        <li onClick={toggleFunction}><Link href='/det-kaerlige-brusebad'><a>Det Kærlige Brusebad</a></Link></li>
        <li onClick={toggleFunction}><Link href='/om-maria'><a>Om Maria</a></Link></li>
        <li onClick={toggleFunction}><Link href='/artikler'><a>Artikler</a></Link></li>
        <div className={`${scss.socials} ${footerStyling.socials}`}>
          <Link href='https://www.instagram.com/marias_rum/'>
            <a className='link' target='_blank'>
              <InstaIcon/><span>Instagram</span>
            </a>
          </Link>
          <Link href='https://www.facebook.com/mariasrum.kropsterapi'>
            <a className='link' target='_blank'>
              <FaceIcon/><span>Facebook</span>
            </a>
          </Link>
        </div>
      </ul>
    </>
  )
}
