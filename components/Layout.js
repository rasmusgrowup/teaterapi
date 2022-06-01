import Image from "next/image"
import Header from '../components/Header'

// Components
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import Meta from '../components/Meta'
import scss from '../styles/layout.module.scss'
import { useEffect } from 'react'

export default function Layout({children}) {
  useEffect (() => {
    if (window.sessionStorage.getItem("visited") === null) {
      window.sessionStorage.setItem("visited", 1)
      return
    } else {}
  }, [])

  return (
    <>
      <Meta />
      <Header />
      <main className={scss.main}>{children}</main>
      <Newsletter />
      <Footer />
    </>
  )
}
