// Default imports
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"

// Components
import Hero from '../../components/Hero'
import VideoHero from '../../components/VideoHero'
import Categories from '../../components/Categories'
import Articles from '../../components/Articles'
import Article from '../../components/Article'
import Card from '../../components/Card'
import Tekst from '../../components/Tekst'
import Section from '../../components/Section'
import Citater from '../../components/Citater'
import Citat from '../../components/Citat'
import Priser from '../../components/Priser'
import Pris from '../../components/Pris'

// GraphCMS
import ErrorPage from 'next/error'
import { GraphQLClient } from 'graphql-request';

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

  console.log({ kropsterapiUnderside })

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
      { kropsterapiUnderside.heroBillede.mimeType != 'video/mp4' ? <Hero
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
      {kropsterapiUnderside.blokke.map(({
        id,
        __typename,
        overskrift,
        kort,
        billede,
        layout,
        sektionLink,
        sektionLinkTekst,
        tekst,
        baggrundsfarve,
        titel,
        testimonials,
        priserOverskrift,
        priser
      }) => (
          __typename === 'KortBeholder' ?
          <Categories overskrift={overskrift} key={overskrift}>
            {kort.map(({ id, billede, link, linkTekst, overskrift, tekst}) => (
              <Card
                key={id}
                src={billede.url}
                width={billede.width}
                height={billede.height}
                link={`/${link}`}
                linkTekst={linkTekst}
                overskrift={overskrift}
                tekst={tekst}
              />
            ))}
          </Categories>
          :
          __typename === 'Sektion' ?
            <Section
              key={titel}
              src={billede.url}
              layout={layout}
              titel={titel}
              tekst={tekst.html}
              link={sektionLink}
              linkTekst={sektionLinkTekst}
            />
          :
          __typename === 'Tekst' ?
            <Tekst
              bg={baggrundsfarve}
              key={overskrift}
              overskrift={overskrift}
              html={tekst.html}
            />
          :
          __typename === 'CitatBeholder' ?
            <Citater overskrift={overskrift} key={overskrift}>
              {testimonials.map(({navn, citat, id}) => (
                <Citat citat={citat} navn={navn} key={id}/>
              ))}
            </Citater>
          :
          __typename === 'PrisBeholder' ?
            <Priser overskrift={priserOverskrift} key={priserOverskrift}>
              {priser.map(({ id, ydelse, beskrivelse, pris, prisLink}) => (
                <Pris
                  key={id}
                  ydelse={ydelse}
                  beskrivelse={beskrivelse.html}
                  pris={pris}
                  href={prisLink}/>
              ))}
            </Priser>
          :
          <></>
      ))}
      {
        kropsterapiUnderside.artikler.length !== 0 &&
        <Articles overskrift='Relaterede artikler'>
          {kropsterapiUnderside.artikler.map(({ id, titel, underoverskrift, slug, billede}) => (
            <Article
              key={id}
              overskrift={titel}
              tekst={underoverskrift[0]}
              src={billede.url}
              height='300'
              width='400'
              layout='responsive'
              link={`/artikler/${slug}`}
              linkTekst='Læs artikel'
            />
          ))}
        </Articles>
      }
    </>
  )
}

export default Side
