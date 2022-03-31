import Head from 'next/head'
import Hero from '../../components/Hero'
import Image from "next/image"
import Link from "next/link"
import scss from '../../styles/articles.module.scss'
import { GraphQLClient } from 'graphql-request';

import Placeholder from '../../public/placeholder.svg'

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getServerSideProps() {
  const { side, artikler } = await graphcms.request(
    `
      query ArtiklerQuery {
        artikler {
          id
          slug
          billede {
            url
          }
          titel
          underoverskrift
        }
        side(where: {sidetype: Artikler}) {
          ctaLink
          ctaTekst
          overskrift
          seo {
            metaBeskrivelse
            metaTags
            metaTitel
          }
        }
      }
    `
  );

  return {
    props: {
      side,
      artikler
    }
  }
}

export default function Artikler({ side, artikler }) {

  return (
    <>
      <Head>
        <title>Marias Rum | {side.seo.metaTitel}</title>
        <meta name="description" content={side.seo.metaBeskrivelse} key='description'/>
        <meta name="keywords" content={side.seo.metaTags} key='keywords' />
      </Head>
      <Hero
        title={side.overskrift}
        buttonText={side.ctaTekst}
        href={side.ctaLink}
      />
      <section className={scss.wrapper}>
        <div className={scss.artikler}>
        { artikler.map(({ id, billede, slug, titel, underoverskrift }) => (
          <Link href={`/artikler/${slug}`} key={id}><a>
            <div className={scss.artikel}>
              <div className={scss.imageWrapper}><Image src={billede.url} objectFit='cover' height='200' width='200' sizes='20vw'/></div>
              <div className={scss.artikelTekst}>
                <h2>{titel}</h2>
                <p>{underoverskrift}</p>
                <span>Læs mere</span>
              </div>
            </div>
          </a></Link>
        ))}
        </div>
      </section>
    </>
  )
}
