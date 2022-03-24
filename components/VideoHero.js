import Image from 'next/image'
import Link from 'next/link'
import scss from '../styles/hero.module.scss'
import React, { useRef } from 'react'
import Vimeo from '@u-wave/react-vimeo'

function VideoHero({title, id, text, buttonText, href}) {
  const ref = useRef(null);

  return(
    <>
      <section className={scss.wrapper}>
        <Vimeo
          background
          muted
          loop
          responsive
          video={id}
          className={scss.vimeoPlayer}
          start='0'
        />
        <div className={scss.content}>
          <h1 className={scss.title}>{title}</h1>
          <p>{text}</p>
          <div><Link href={href}><a className={scss.button}>{buttonText}</a></Link></div>
        </div>
      </section>
    </>
  )
}

VideoHero.defaultProps = {
  title: 'Flot titel',
  id: '662891958',
  text: '',
  href: '/',
  buttonText: 'Læs mere',
}

export default VideoHero
