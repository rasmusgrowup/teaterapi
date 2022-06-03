import Image from 'next/image'
import Link from 'next/link'
import scss from '../styles/hero.module.scss'
import { HERO_PLACEHOLDER } from '../lib/constants'

function Hero({title, smallTitle, src, buttonText, href}) {
  return(
    <>
      <section className={scss.wrapper}>
        <div className={scss.imageWrapper}>
          <div className={scss.imageContainer}><Image src={src} layout='fill' quality='100' objectFit='cover' objectPosition='center' priority='true'/>
          </div>
        </div>
        <div className={scss.content}>
          <h1 className={scss.title}>{title}</h1>
          <h2 className={scss.smallTitle}>{smallTitle}</h2>
          <div><Link href={href}><a className={scss.button}>{buttonText}</a></Link></div>
        </div>
      </section>
    </>
  )
}

Hero.defaultProps = {
  title: 'Marias Rum er et kropsterapeutisk univers',
  smallTitle: '',
  src: `${HERO_PLACEHOLDER}`,
  href: '/',
  buttonText: 'Læs mere',
}

export default Hero
