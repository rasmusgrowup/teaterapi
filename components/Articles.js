import scss from '../styles/sections.module.scss'
import Link from "next/link"
import Image from "next/image"
import Chevron from '../public/chevron_right.svg'
import Article from "./Article";

function Articles({props, overskrift}) {
    console.log(props)
    return (
        <>
            <section className={scss.articles}>
                <h2 className={scss.sectionTitle}>{overskrift}</h2>
                <div className={scss.inner}>
                    {props.map((artikel, i) => (
                        <Article key={i} props={artikel}/>
                    ))}
                </div>
                <Link href='/artikler'>
                    <a className={scss.button}>
                        <span>Se alle artikler</span>
                        <Image src={Chevron} width='9' height='9'/>
                    </a>
                </Link>
            </section>
        </>
    )
}

Articles.defaultProps = {
    overskrift: 'Overskrift'
}

export default Articles
