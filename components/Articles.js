import scss from '../styles/sections.module.scss'

function Articles({ overskrift, children }) {
  return (
    <>
    <section className={scss.articles}>
      <h2 className={scss.sectionTitle}>{overskrift}</h2>
      <div className={scss.inner}>{children}</div>
    </section>
    </>
  )
}

Articles.defaultProps = {
  overskrift: 'Overskrift'
}

export default Articles
