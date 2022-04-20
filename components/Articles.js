import scss from '../styles/sections.module.scss'
import Link from "next/link"
import Image from "next/image"
import Chevron from '../public/chevron_right.svg'

function Articles({ overskrift, children }) {
  return (
    <>
    <section className={scss.articles}>
      <h2 className={scss.sectionTitle}>{overskrift}</h2>
      <div className={scss.inner}>{children}</div>
      <Link href='/artikler'><a className={scss.button}>
        <span>Se alle artikler</span>
        <Image src={Chevron} width='9' height='9'/>
      </a></Link>
    </section>
    </>
  )
}

Articles.defaultProps = {
  overskrift: 'Overskrift'
}

export default Articles
