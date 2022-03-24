import scss from '../styles/card.module.scss'
import Image from "next/image"
import Link from "next/link"

export default function Card({
  src,
  smallTitle,
  bigTitle,
  text,
  buttonText,
  href
  }) {
  return (
    <>
      <Link href={href}>
        <a className={scss.wrapper}>
          <div className={scss.imageWrapper}>
            <Image
              src={src}
              objectFit='cover'
              objectPosition='center'
            />
          </div>
          <div className={scss.textWrapper}>
            <h3>{smallTitle}</h3>
            <h4>{bigTitle}</h4>
            <p>{text}</p>
            <div className={scss.button}>{buttonText}</div>
          </div>
        </a>
      </Link>
    </>
  )
}
