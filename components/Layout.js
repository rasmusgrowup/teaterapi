import Header from '../components/Header'
import Footer from '../components/Footer'
import scss from '../styles/layout.module.scss'

export default function Layout({children}) {
  return (
    <>
      <Header />
      <main className={scss.main}>{children}</main>
      <Footer />
    </>
  )
}
