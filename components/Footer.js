import scss from '../styles/footer.module.scss'
import Link from "next/link"
import Image from "next/image"
import Menu from '../components/Menu'
import React from 'react'

import useSWR from 'swr'
import { request } from 'graphql-request'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master', query)

import Logo from '../public/logo_tagline.png'

export default function Footer({footerTekst}) {

  const { data, error } = useSWR(`
    query FooterContent {
      footer(where: {footerType: Generel}) {
        footerTekst {
          html
        }
      }
    }`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return(
    <>
      <footer className={scss.main}>
        <div className={scss.top}>
          <div className={scss.image}><Image src={Logo}/></div>
          <div dangerouslySetInnerHTML={{ __html: `${data.footer.footerTekst.html}` }}></div>
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
