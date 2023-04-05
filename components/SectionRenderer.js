import Categories from "./Categories";
import Section from "./Section";
import Tekst from "./Tekst";
import Citater from "./Citater";
import Priser from "./Priser";

export default function SectionRenderer({ sections }) {

    return (
        <>
            { sections && sections.map((section, i) => {
                switch (section.__typename) {
                    case 'KortBeholder':
                        return <Categories key={section.id} section={section} i={i} />
                    case 'Sektion':
                        return <Section key={section.id} section={section} i={i} />
                    case 'Tekst':
                        return <Tekst key={section.id} section={section} i={i} />
                    case 'CitatBeholder':
                        return <Citater key={section.id} section={section} i={i} />
                    case 'PrisBeholder':
                        return <Priser key={section.id} section={section} i={i} />
                    default:
                        return <section key={section.id}></section>
                }
            })}
        </>
    )
}