import Image from "next/image"
import Link from "next/link"
import scss from '../styles/sections.module.scss'

function ImageText({layout, title, text, href, buttonText, src}) {
  return (
    <>
      <section className={`${scss.imageWithText} ${ layout == 'left' ? `${scss.left}`: `${scss.right}` }`}>
        <div className={scss.imageBox}>
          <Image
            src={src}
            layout='responsive'
            objectFit='cover'
            height='400'
            width='320'
            quality='100'
            placeholder='blur'
          />
        </div>
        <div className={scss.textBox}>
          <h2>{title}</h2>
          <p>{text}</p>
          <div><Link href={href}><a>{buttonText}</a></Link></div>
        </div>
      </section>
    </>
  )
}

ImageText.defaultProps = {
  layout: 'left',
  title: 'Flot titel',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
  href: '/',
  buttonText: 'Læs mere',
  src: '/4.jpg'
}

export default ImageText
