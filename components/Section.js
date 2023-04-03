import Image from "next/image"
import Link from "next/link"
import scss from '../styles/sections.module.scss'
import Chevron from '../public/chevron_right.svg'
import { SECTION_PLACEHOLDER } from '../lib/constants'

function Section({ section }) {
  return (
    <section className={scss.section} style={ section.baggrundsfarve && { backgroundColor: `${section.baggrundsfarve.css}` }}>
      <div className={`${scss.imageWithText} ${ section.layout === true ? `${scss.left}`: `${scss.right}` }`}>
        <div className={scss.imageBox}>
          <Image
            src={section.billede.url}
            layout='responsive'
            objectFit='cover'
            objectPosition='center center'
            height='400'
            width='320'
            quality='100'
          />
        </div>
        <div className={scss.textBox}>
          <h2>{section.titel}</h2>
          <div dangerouslySetInnerHTML={{__html: section.tekst.html}}></div>
          {
            section.linkTekst &&
            <div><Link href={section.link}><a className='link'>
              <span style={{ marginRight: '0.25rem' }}>{section.linkTekst}</span>
              <Image src={Chevron} width='9' height='9'/>
            </a></Link></div>
          }
        </div>
      </div>
    </section>
  )
}

Section.defaultProps = {
  layout: true,
  titel: 'Flot titel',
  tekst: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  src: `${SECTION_PLACEHOLDER}`
}

export default Section
