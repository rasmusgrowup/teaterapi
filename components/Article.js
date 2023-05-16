import scss from '../styles/article.module.scss'
import Image from "next/image"
import Link from "next/link"
import { PLACEHOLDER } from '../lib/constants'

import Chevron from '../public/chevron_right.svg'

function Article({ props }) {

  return (
    <>
      <Link href={`/artikler/${props.slug}`}>
        <a className={scss.wrapper}>
          <div className={scss.imageWrapper}>
            <Image
              src={props.billede.url}
              objectFit='cover'
              objectPosition='center'
              layout="responsive"
              height='300'
              width='400'
            />
          </div>
          <div className={scss.textWrapper}>
            <h3>{props.titel}</h3>
            <p>{props.underoverskrift[0]}</p>
          </div>
          <div className={scss.button}>
            <span style={{ marginRight: '0.25rem' }}>Læs artikel</span>
            <Image src={Chevron} width='9' height='9' />
          </div>
        </a>
      </Link>
    </>
  )
}

Article.defaultProps = {
  link: '/',
  src: `${PLACEHOLDER}`,
  height: '400',
  width: '400',
  overskrift: 'Overskrift',
  tekst: 'Lorum ipsum ble uhuldi, supi fera orum ibbe',
  linkTekst: 'Læs mere'
}

export default Article
