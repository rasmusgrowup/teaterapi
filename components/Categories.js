import scss from '../styles/sections.module.scss'
import Card from "./Card";

function Categories({ section }) {
  return (
    <>
      <section className={scss.categories}>
        <h2 className={scss.sectionTitle}>{section.overskrift}</h2>
        <div className={scss.inner}>
            { section.kort.map((kort, i) => (
                <Card key={i} props={kort} />
            ))}
        </div>
      </section>
    </>
  )
}

Categories.defaultProps = {
  overskrift: 'Overskrift'
}

export default Categories
