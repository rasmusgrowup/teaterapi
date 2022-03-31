import Image from "next/image"
import Link from "next/link"
import scss from '../styles/sections.module.scss'
import Chevron from '../public/chevron_right.svg'

function Section({layout, titel, tekst, link, linkTekst, src}) {
  return (
    <>
      <section className={`${scss.imageWithText} ${ layout == true ? `${scss.left}`: `${scss.right}` }`}>
        <div className={scss.imageBox}>
          <Image
            src={src}
            layout='responsive'
            objectFit='cover'
            height='400'
            width='320'
            quality='100'
          />
        </div>
        <div className={scss.textBox}>
          <h2>{titel}</h2>
          <p>{tekst}</p>
          <div><Link href={link}><a className='underline'>
            <span style={{ marginRight: '0.25rem' }}>{linkTekst}</span>
            <Image src={Chevron} width='9' height='9'/>
          </a></Link></div>
        </div>
      </section>
    </>
  )
}

Section.defaultProps = {
  layout: true,
  titel: 'Flot titel',
  tekst: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  link: '/',
  linkTekst: 'Læs mere',
  src: '/4.jpg'
}

export default Section
