import scss from '../styles/sections.module.scss'

function Categories({ overskrift, children }) {
  return (
    <>
      <section className={scss.categories}>
        <h2 className={scss.sectionTitle}>{overskrift}</h2>
        <div className={scss.inner}>{children}</div>
      </section>
    </>
  )
}

Categories.defaultProps = {
  overskrift: 'Overskrift'
}

export default Categories
