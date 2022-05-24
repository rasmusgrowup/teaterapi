import scss from '../styles/citat.module.scss'

function Citat({ citat, navn }) {
  return (
    <>
      <div className={scss.container}>
        <div className={scss.citat}>{citat}</div>
        <p>— {navn}</p>
      </div>
    </>
  )
}

Citat.defaultProps = {
  citat: 'Efter livslang længsel efter balance i min krop, har kropsterapien vist sig at være den mest effektive og mest givende måde til at bearbejde mine livstraumer.',
  navn: 'Maria Philipsen Holm'
}

export default Citat
