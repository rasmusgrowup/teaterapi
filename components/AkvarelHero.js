import Image from 'next/image'
import Link from 'next/link'
import scss from '../styles/hero.module.scss'
import Akvarel from '../public/Akvarel.png'

function AkvarelHero({title, smallTitle, buttonText, href}) {
  return(
    <>
      <section className={scss.wrapper}>
        <div className={scss.akvarel}><Image src={Akvarel} layout='responsive' quality='100' objectFit='cover' objectPosition='center'/></div>
        <div className={scss.content}>
          <h1 className={scss.title}>{title}</h1>
          <h2 className={scss.smallTitle}>{smallTitle}</h2>
          <div><Link href={href}><a className={scss.button}>{buttonText}</a></Link></div>
        </div>
      </section>
    </>
  )
}

AkvarelHero.defaultProps = {
  title: 'Marias Rum er et kropsterapeutisk univers',
  smallTitle: '',
  href: '/',
  buttonText: 'Læs mere',
}

export default AkvarelHero
