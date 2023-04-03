// Default imports
import { useRouter } from 'next/router'
import Head from 'next/head'

// Components
import Hero from '../components/Hero'
import VideoHero from '../components/VideoHero'
import Articles from '../components/Articles'

// GraphCMS
import ErrorPage from 'next/error'
import { GraphQLClient } from 'graphql-request';
import SectionRenderer from "../components/SectionRenderer";

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getStaticProps({ params }) {
  const { landingsside } = await graphcms.request(`
    query landingsside($adresse: String!) {
      landingsside(where: { adresse: $adresse}) {
        id
        adresse
        overskrift
        underoverskrift
        titel
        ctaLink
        ctaTekst
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
            kort {
              billede {
                height
                url
                width
              }
              link
              linkTekst
              overskrift
              tekst
            }
            overskrift
          }
          ... on Sektion {
            id
            billede {
              height
              url
              width
            }
            layout
            sektionLink
            sektionLinkTekst
            tekst {
              html
            }
            titel
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
        heroBillede {
          height
          width
          url
          mimeType
        }
        seo {
          metaBeskrivelse
          metaTags
          metaTitel
        }
        artikler(first: 3) {
          id
          titel
          slug
          underoverskrift
          billede {
            height
            url
            width
          }
        }
      }
    }
  `,
    {
      adresse: params.adresse
    }
  );

  return {
    props: {
      landingsside
    }
  }
}

export async function getStaticPaths() {
  const { landingssider } = await graphcms.request(`
    query landingssider {
      landingssider {
        adresse
      }
    }
  `);

  return {
    paths: landingssider.map(({ adresse }) => ({
      params: { adresse },
    })),
    fallback: false,
  }
}

function Side({ landingsside }) {
  const router = useRouter()

  if (!router.isFallback && !landingsside?.adresse) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      { landingsside.seo &&
        <Head>
          <title>Marias Rum | {landingsside.seo.metaTitel}</title>
          <meta name="description" content={landingsside.seo.metaBeskrivelse} key='description'/>
          <meta name="keywords" content={landingsside.seo.metaTags} key='keywords'/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
      { landingsside.heroBillede.mimeType !== 'video/mp4' ? <Hero
        src={landingsside.heroBillede.url}
        title={landingsside.overskrift}
        smallTitle={landingsside.underoverskrift}
        href={landingsside.ctaLink}
        buttonText={landingsside.ctaTekst}
      /> :
      <VideoHero
      url={landingsside.heroBillede.url}
      title={landingsside.overskrift}
      text={landingsside.underoverskrift}
      href={landingsside.ctaLink}
      buttonText={landingsside.ctaTekst}
      />}
      <SectionRenderer sections={landingsside.blokke} />
      {
        landingsside.artikler.length !== 0 &&
          <Articles overskrift='Seneste artikler' props={landingsside.artikler} />
      }
    </>
  )
}

export default Side
