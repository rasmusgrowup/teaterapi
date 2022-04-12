// Styling
import scss from '../styles/priser.module.scss'

export default function Priser({ overskrift, children }) {
  return (
    <>
      <section className={scss.wrapper}>
        <h2>{overskrift}</h2>
        <div className={scss.container}>
          {children}
        </div>
      </section>
    </>
  )
}
