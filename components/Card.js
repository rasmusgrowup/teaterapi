import scss from '../styles/card.module.scss'
import Image from "next/image"
import Link from "next/link"
import { PLACEHOLDER } from '../lib/constants'

import Chevron from '../public/chevron_right_white.svg'

function Card({
  link,
  src,
  overskrift,
  tekst,
  linkTekst,
  height,
  width
  }) {
  return (
    <>
      <Link href={link}>
        <a className={scss.wrapper}>
          <div className={scss.imageWrapper}>
            <Image
              src={src}
              objectFit='cover'
              objectPosition='center'
              height={height}
              width={width}
            />
          </div>
          <div className={scss.textWrapper}>
            <h3>{overskrift}</h3>
            <p>{tekst}</p>
            <div className={scss.button}>
              <span style={{ marginRight: '0.25rem' }}>{linkTekst}</span>
              <Image src={Chevron} width='9' height='9' />
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}

Card.defaultProps = {
  link: '/',
  src: `${PLACEHOLDER}`,
  height: '400',
  width: '400',
  overskrift: 'Overskrift',
  tekst: 'Lorum ipsum ble uhuldi, supi fera orum ibbe',
  linkTekst: 'Læs mere'
}

export default Card
