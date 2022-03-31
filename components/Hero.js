import Image from 'next/image'
import Link from 'next/link'
import scss from '../styles/hero.module.scss'
import { HERO_PLACEHOLDER } from '../lib/constants'

function Hero({title, src, text, buttonText, href}) {
  return(
    <>
      <section className={scss.wrapper}>
        <Image src={src} layout='fill' quality='100' objectFit='cover' objectPosition='center'/>
        <div className={scss.content}>
          <h1 className={scss.title}>{title}</h1>
          <p>{text}</p>
          <div><Link href={href}><a className={scss.button}>{buttonText}</a></Link></div>
        </div>
      </section>
    </>
  )
}

Hero.defaultProps = {
  title: 'Marias Rum er et kropsterapeutisk univers',
  src: `${HERO_PLACEHOLDER}`,
  text: '',
  href: '/',
  buttonText: 'Læs mere',
}

export default Hero
