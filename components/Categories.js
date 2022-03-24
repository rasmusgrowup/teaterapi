import scss from '../styles/sections.module.scss'

export default function Categories({ title, children }) {
  return (
    <>
      <section className={scss.categories}>
        <h2 className={scss.sectionTitle}>{title}</h2>
        <div className={scss.inner}>{children}</div>
      </section>
    </>
  )
}
