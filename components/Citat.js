import scss from '../styles/citat.module.scss'

function Citat({ tekst, navn }) {
  return (
    <>
      <section className={scss.wrapper}>
        <div className={scss.inner}>
          <div className={scss.citat} dangerouslySetInnerHTML={{__html: tekst}}></div>
          <p>— {navn}</p>
        </div>
      </section>
    </>
  )
}

Citat.defaultProps = {
  tekst: 'Efter livslang længsel efter balance i min krop, har kropsterapien vist sig at være den mest effektive og mest givende måde til at bearbejde mine livstraumer.',
  navn: 'Maria Philipsen Holm'
}

export default Citat
