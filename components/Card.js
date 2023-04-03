import scss from '../styles/card.module.scss'
import Image from "next/image"
import Link from "next/link"
import {PLACEHOLDER} from '../lib/constants'

import Chevron from '../public/chevron_right_white.svg'

function Card({ props }) {
    return (
        <>
            <Link href={props.link}>
                <a className={scss.wrapper}>
                    <div className={scss.imageWrapper}>
                        <Image
                            src={props.billede.url}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='center'
                            width={props.billede.width}
                            height={props.billede.height}
                        />
                    </div>
                    <div className={scss.textWrapper}>
                        <h3>{props.overskrift}</h3>
                        <p>{props.tekst}</p>
                        <div className={scss.button}>
                            <span style={{marginRight: '0.25rem'}}>{props.linkTekst}</span>
                            <Image src={Chevron} width='9' height='9'/>
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
    overskrift: 'Overskrift',
    tekst: 'Lorum ipsum ble uhuldi, supi fera orum ibbe',
    linkTekst: 'Læs mere'
}

export default Card
