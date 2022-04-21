import Head from 'next/head'
import Hero from '../../components/Hero'
import VideoHero from '../components/VideoHero'
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
            mimeType
            url
            width
            height
          }
          titel
          underoverskrift
        }
        side(where: {sidetype: Artikler}) {
          heroBillede {
            url
          }
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
  console.log({ side, artikler })
  return (
    <>
      <Head>
        <title>Marias Rum | {side.seo.metaTitel}</title>
        <meta name="description" content={side.seo.metaBeskrivelse} key='description'/>
        <meta name="keywords" content={side.seo.metaTags} key='keywords' />
      </Head>
      { side.heroBillede.mimeType != 'video/mp4' ? <Hero
        src={side.heroBillede.url}
        title={side.overskrift}
        buttonText={side.ctaTekst}
        href={side.ctaLink}
      /> :
      <VideoHero
      url={side.heroBillede.url}
      title={side.overskrift}
      text={side.underoverskrift}
      href={side.ctaLink}
      buttonText={side.ctaTekst}
      />}
      <section className={scss.wrapper}>
        <h2>Seneste artikler</h2>
        <div className={scss.artikler}>
        { artikler.map(({ id, billede, slug, titel, underoverskrift }) => (
          <Link href={`/artikler/${slug}`} key={id}><a>
            <div className={scss.artikel}>
              <div className={scss.imageWrapper}><Image src={billede.url} objectFit='cover' width='400' height='400'/></div>
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
