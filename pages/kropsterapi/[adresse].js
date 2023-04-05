// Default imports
import { useRouter } from 'next/router'
import Head from 'next/head'

// Components
import Hero from '../../components/Hero'
import VideoHero from '../../components/VideoHero'
import Articles from '../../components/Articles'

// GraphCMS
import ErrorPage from 'next/error'
import { GraphQLClient } from 'graphql-request';
import SectionRenderer from "../../components/SectionRenderer";
import {useEffect, useState} from "react";

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getStaticProps({ params }) {
  const { kropsterapiUnderside } = await graphcms.request(`
    query underside($adresse: String!) {
      kropsterapiUnderside(where: { adresse: $adresse}) {
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
            baggrundsfarve {
              css
            }
            tekst {
              html
            }
            titel
          }
          ... on Tekst {
            id
            baggrundsfarve
            overskrift
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
          mimeType
          height
          width
          url
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
      kropsterapiUnderside
    }
  }
}

export async function getStaticPaths() {
  const { kropsterapiUndersider } = await graphcms.request(`
    {
      kropsterapiUndersider {
        adresse
      }
    }
  `);

  return {
    paths: kropsterapiUndersider.map(({ adresse }) => ({
      params: { adresse },
    })),
    fallback: false,
  }
}

function Side({ kropsterapiUnderside }) {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!router.isFallback && !kropsterapiUnderside?.adresse) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      {
        kropsterapiUnderside.seo &&
        <Head>
          <title>Marias Rum | {kropsterapiUnderside.seo.metaTitel}</title>
          <meta name="description" content={kropsterapiUnderside.seo.metaBeskrivelse} key='description'/>
          <meta name="keywords" content={kropsterapiUnderside.seo.metaTags} key='keywords'/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      }
      { kropsterapiUnderside.heroBillede.mimeType !== 'video/mp4' ? <Hero
        src={kropsterapiUnderside.heroBillede.url}
        title={kropsterapiUnderside.overskrift}
        smallTitle={kropsterapiUnderside.underoverskrift}
        href={kropsterapiUnderside.ctaLink}
        buttonText={kropsterapiUnderside.ctaTekst}
      /> :
      <VideoHero
      url={kropsterapiUnderside.heroBillede.url}
      title={kropsterapiUnderside.overskrift}
      text={kropsterapiUnderside.underoverskrift}
      href={kropsterapiUnderside.ctaLink}
      buttonText={kropsterapiUnderside.ctaTekst}
      />}
      <SectionRenderer sections={kropsterapiUnderside.blokke} />
      {
        kropsterapiUnderside.artikler.length !== 0 &&
          <Articles overskrift='Seneste artikler' props={kropsterapiUnderside.artikler} />
      }
    </>
  )
}

export default Side
