import Image from "next/image"
import Header from '../components/Header'

// Components
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import scss from '../styles/layout.module.scss'
import { useEffect } from 'react'
import Script from 'next/script'

// Assets
import CloseIcon from '../public/CloseIcon.png'

export default function Layout({children}) {
  useEffect (() => {
    if (window.sessionStorage.getItem("visited") === null) {
      window.sessionStorage.setItem("visited", 1)
      return
    } else {}
  }, [])

  return (
    <>
      <Script
      id="mailchimp_script",
      dangerouslySetInnerHTML={{
          __html: `
          !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/afa7bafb8da9deb3bd242c3f0/fcfc769ee2bf84697a81293cb.js");
          `
        }}
      />
      <Meta />
      <Header />
      <main className={scss.main}>{children}</main>
      <Footer />
    </>
  )
}
