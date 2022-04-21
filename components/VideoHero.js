import Image from 'next/image'
import Link from 'next/link'
import scss from '../styles/hero.module.scss'
import React, { useRef } from 'react'
import Vimeo from '@u-wave/react-vimeo'

function VideoHero({title, url, text, buttonText, href}) {
  const ref = useRef(null);

  return(
    <>
      <section className={scss.wrapper}>
        <video
            className={scss.video}
            autoPlay
            muted
            loop
            playsInline
            style={{ objectFit: 'cover' }}
            width='100%'
            height='100%'
            alt=''
            >
          <source src='https://media.graphassets.com/yrNF9puQRyQraoZz4tcA' type='video/mp4' />
        </video>
        <div className={scss.content}>
          <h1 className={scss.title}>{title}</h1>
          <h2 className={scss.smallTitle}>{text}</h2>
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
