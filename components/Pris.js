//Styling
import scss from '../styles/priser.module.scss'

//Components
import Link from 'next/link'

export default function Pris({ ydelse, beskrivelse, pris, href }) {
  return (
    <>
      <div className={scss.pris}>
        <div>
          <h3 className={scss.ydelse}>{ydelse}</h3>
          <p className={scss.beskrivelse}>{beskrivelse}</p>
        </div>
        <div className={scss.prisen}>{pris}</div>
        <Link href={href}><a className={scss.button}>Book nu</a></Link>
      </div>
    </>
  )
}
