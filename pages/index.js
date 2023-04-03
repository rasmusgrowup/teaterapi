// NEXT.JS Componentys
import Head from 'next/head'

//Components
import Hero from '../components/Hero'
import VideoHero from '../components/VideoHero'
import Articles from '../components/Articles'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';

// Assets
import SectionRenderer from "../components/SectionRenderer";

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getStaticProps() {
  const { hovedside, artikler } = await graphcms.request(
    `
      query forside {
        hovedside(where: {sidetype: Forside}) {
          id
          ctaLink
          ctaTekst
          overskrift
          underoverskrift
          heroBillede {
            mimeType
            height
            url
            width
          }
          blokke {
            __typename
            ... on CitatBeholder {
              id
              overskrift
              testimonials {
                id
                navn
                citat
              }
            }
            ... on KortBeholder {
              id
              overskrift
              kort {
                id
                billede {
                  url
                }
                link
                linkTekst
                tekst
                overskrift
              }
            }
            ... on Sektion {
              id
              layout
              sektionLink
              sektionLinkTekst
              tekst {
                html
              }
              titel
              billede {
                height
                url
                width
              }
            }
            ... on Tekst {
              id
              overskrift
              baggrundsfarve
              tekst {
                html
              }
            }
            ... on PrisBeholder {
              id
              priserOverskrift
              priser {
                id
                beskrivelse {
                  html
                }
                pris
                ydelse
                prisLink
              }
            }
          }
          seo {
            metaBeskrivelse
            metaTags
            metaTitel
          }
          artikler(first: 3) {
            id
            titel
            underoverskrift
            slug
            billede {
              height
              url
              width
            }
          }
        }
      }
    `
  );

  return {
    props: {
      hovedside
    }
  }
}

export default function Home({ hovedside }) {
  
  return (
    <>
      { hovedside.seo &&
        <Head>
          <title>Marias Rum | {hovedside.seo.metaTitel}</title>
          <meta name="description" content={hovedside.seo.metaBeskrivelse} key='description'/>
          <meta name="keywords" content={hovedside.seo.metaTags} key='keywords'/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
      { hovedside.heroBillede.mimeType !== 'video/mp4' ?
        <Hero
          src={hovedside.heroBillede.url}
          title={hovedside.overskrift}
          smallTitle={hovedside.underoverskrift}
          href={hovedside.ctaLink}
          buttonText={hovedside.ctaTekst}
        /> :
        <VideoHero
        url={hovedside.heroBillede.url}
        title={hovedside.overskrift}
        text={hovedside.underoverskrift}
        href={hovedside.ctaLink}
        buttonText={hovedside.ctaTekst}
        />
      }
      <SectionRenderer sections={hovedside.blokke} />
      <Articles overskrift='Seneste artikler' props={hovedside.artikler} />
    </>
  )
}
