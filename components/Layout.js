import Header from '../components/Header'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import scss from '../styles/layout.module.scss'

export default function Layout({children}) {

  return (
    <>
      <Meta />
      <Header />
      <main className={scss.main}>{children}</main>
      <Footer />
    </>
  )
}
