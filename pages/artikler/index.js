import Head from 'next/head'
import Hero from '../../components/Hero'
import VideoHero from '../../components/VideoHero'
import Image from "next/image"
import Link from "next/link"
import scss from '../../styles/articles.module.scss'
import { GraphQLClient } from 'graphql-request';

import Tekst from '../../components/Tekst'

import Placeholder from '../../public/placeholder.svg'

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getServerSideProps() {
  const { hovedside, artikler } = await graphcms.request(
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
        hovedside(where: {sidetype: Artikler}) {
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
          blokke {
            __typename
            ... on Tekst {
              id
              overskrift
              tekst {
                html
              }
            }
          }
        }
      }
    `
  );

  return {
    props: {
      hovedside,
      artikler
    }
  }
}

export default function Artikler({ hovedside, artikler }) {
  console.log({ hovedside, artikler })
  return (
    <>
      {
        hovedside.seo &&
        <Head>
          <title>Marias Rum | {hovedside.seo.metaTitel}</title>
          <meta name="description" content={hovedside.seo.metaBeskrivelse} key='description'/>
          <meta name="keywords" content={hovedside.seo.metaTags} key='keywords' />
        </Head>
      }
      { hovedside.heroBillede.mimeType != 'video/mp4' ? <Hero
        src={hovedside.heroBillede.url}
        title={hovedside.overskrift}
        buttonText={hovedside.ctaTekst}
        href={hovedside.ctaLink}
      /> :
      <VideoHero
      url={hovedside.heroBillede.url}
      title={hovedside.overskrift}
      text={hovedside.underoverskrift}
      href={hovedside.ctaLink}
      buttonText={hovedside.ctaTekst}
      />}
      {hovedside.blokke.map(({ id, __typename, overskrift, tekst }) => (
        __typename === 'Tekst' ?
          <Tekst
            key={id}
            overskrift={overskrift}
            html={tekst.html}
          />
        :
        <></>
      ))}
      <section className={scss.wrapper}>
        <h2>Seneste artikler</h2>
        <div className={scss.artikler}>
        { artikler.map(({ id, billede, slug, titel, underoverskrift }) => (
          <Link href={`/artikler/${slug}`} key={id}><a>
            <div className={scss.artikel}>
              <div className={scss.imageWrapper}><Image src={billede.url} objectFit='cover' width='400' height='400'/></div>
              <div className={scss.artikelTekst}>
                <h2>{titel}</h2>
                <p>{underoverskrift[0]}</p>
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
