import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Articles from '../components/Articles'
import Article from '../components/Article'
import Card from '../components/Card'
import Tekst from '../components/Tekst'
import Section from '../components/Section'
import Citat from '../components/Citat'
import ErrorPage from 'next/error'
import { GraphQLClient } from 'graphql-request';

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
          ... on Citat {
            id
            citat {
              html
            }
            navn
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
          ... on Priskasse {
            id
            link
            linkTekst
            overskrift
            tekst {
              html
            }
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
            tekst {
              html
            }
          }
        }
        heroBillede {
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

  console.log({ landingsside })

  if (!router.isFallback && !landingsside?.adresse) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Marias Rum | {landingsside.seo.metaTitel}</title>
        <meta name="description" content={landingsside.seo.metaBeskrivelse} key='description'/>
        <meta name="keywords" content={landingsside.seo.metaTags} key='keywords'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        src={landingsside.heroBillede.url}
        title={landingsside.overskrift}
        smallTitle={landingsside.underoverskrift}
        href={landingsside.ctaLink}
        buttonText={landingsside.ctaTekst}
      />
      {landingsside.blokke.map(({ id, __typename, overskrift, kort, billede, layout, sektionLink, sektionLinkTekst, tekst, titel, citat, navn }) => (
          __typename === 'KortBeholder' ?
          <Categories overskrift={overskrift} key={id}>
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
              key={id}
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
              key={id}
              overskrift={overskrift}
              html={tekst.html}
            />
          :
          __typename === 'Citat' ?
            <Citat
              key={id}
              navn={navn}
              tekst={citat.html}
            />
          :
          <></>
      ))}
      {
        landingsside.artikler.length !== 0 &&
        <Articles overskrift='Relaterede artikler'>
          {landingsside.artikler.map(({ id, titel, underoverskrift, slug, billede}) => (
            <Article
              key={id}
              overskrift={titel}
              tekst={underoverskrift}
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
