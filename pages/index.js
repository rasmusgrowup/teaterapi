import blokke from '../styles/blokke.module.scss'
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
import { GraphQLClient, gql } from 'graphql-request';

import HeroHome from '../public/hero_home.jpg'
import One from '../public/1.jpg'
import Two from '../public/2.jpg'
import Three from '../public/3.jpg'
import Maria from '../public/4.jpg'

const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master'
)

export async function getStaticProps() {
  const { side, artikler } = await graphcms.request(
    `
      query forside {
        side(where: {sidetype: Forside}) {
          id
          ctaLink
          ctaTekst
          overskrift
          underoverskrift
          heroBillede {
            height
            url
            width
          }
          blokke {
            __typename
            ... on Citat {
              navn
              citat {
                html
              }
              id
            }
            ... on KortBeholder {
              id
              overskrift
              kort {
                id
                billede {
                  height
                  width
                  url
                }
                link
                linkTekst
                tekst
                overskrift
              }
            }
            ... on Priskasse {
              id
              overskrift
              link
              linkTekst
              tekst {
                html
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
              tekst {
                html
              }
            }
          }
          seo {
            metaBeskrivelse
            metaTags
            metaTitel
          }
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
    `
  );

  return {
    props: {
      side,
      artikler
    }
  }
}

export default function Home({ side, artikler }) {

  console.log({side})

  return (
    <>
      <Head>
        <title>Marias Rum | {side.seo.metaTitel}</title>
        <meta name="description" content={side.seo.metaBeskrivelse} key='description'/>
        <meta name="keywords" content={side.seo.metaTags} key='keywords'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        src={side.heroBillede.url}
        title={side.overskrift}
        smallTitle={side.underoverskrift}
        href={side.ctaLink}
        buttonText={side.ctaTekst}
      />
      {side.blokke.map(({ id, __typename, overskrift, kort, billede, layout, sektionLink, sektionLinkTekst, tekst, titel }) => (
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
      <Articles overskrift='Seneste artikler'>
        {artikler.map(({ id, titel, underoverskrift, slug, billede}) => (
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
    </>
  )
}
