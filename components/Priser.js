// Styling
import scss from '../styles/priser.module.scss'
import Pris from "./Pris";

export default function Priser({ section }) {
  return (
    <>
      <section className={scss.wrapper}>
        <h2>{section.priserOverskrift}</h2>
        <div className={scss.container}>
            { section.priser.map((pris, i) => (
                <Pris
                    key={i}
                    ydelse={pris.ydelse}
                    beskrivelse={pris.beskrivelse.html}
                    pris={pris.pris}
                    href={pris.prisLink}
                />
            ))}
        </div>
      </section>
    </>
  )
}
