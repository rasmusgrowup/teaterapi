// NEXT.JS Componentys
import Image from 'next/image'
import { useRouter } from 'next/router'

//Components
import Hero from '../components/Hero'

// Assets
import scss from '../styles/sections.module.scss'
import HeroHome from '../public/hero_home.jpg'
import Chevron from '../public/chevron_left.svg'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getStaticProps() {
  const { politikker } = await graphcms.request(`
    query Politik {
      politikker(where: {titel: "Handelsbetingelser"}) {
        id
        titel
        tekst {
          html
        }
      }
    }
  `
  );

  return {
    props: {
      politikker
    }
  }
}

export default function Handelsbetingelser({ politikker }) {
  const router = useRouter()

  return (
    <>
      <Hero
        src={HeroHome}
        title={politikker[0].titel}
        smallTitle=''
        href='mailto:kontakt@mariasrum.dk'
        buttonText='Kontakt mig'
      />
      <section className={scss.handelsbetingelser}>
        <div className={scss.backLink} onClick={router.back}>
        <Image src={Chevron} height='9' width='9' />
        <span style={{ marginLeft: '0.25rem'}}>tilbage</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: `${politikker[0].tekst.html}` }}></div>
      </section>
    </>
  )
}
