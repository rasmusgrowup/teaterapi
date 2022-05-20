// Styling
import blokke from '../styles/blokke.module.scss'

// NEXT.JS Componentys
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"

//Components
import Hero from '../components/Hero'
import VideoHero from '../components/VideoHero'
import Categories from '../components/Categories'
import Articles from '../components/Articles'
import Article from '../components/Article'
import Card from '../components/Card'
import Citater from '../components/Citater'
import Citat from '../components/Citat'
import Tekst from '../components/Tekst'
import Section from '../components/Section'
import Mailchimp from '../components/Mailchimp'
import Priser from '../components/Priser'
import Pris from '../components/Pris'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';

// Assets
import HeroHome from '../public/hero_home.jpg'
import One from '../public/1.jpg'
import Two from '../public/2.jpg'
import Three from '../public/3.jpg'
import Maria from '../public/4.jpg'

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
              citater {
                id
                navn
                tekst {
                  html
                }
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
            ... on Mailchimp {
              id
              mailchimpOverskrift
              mailchimpTekst {
                html
              }
              mailchimpUrl
            }
            ... on PrisBeholder {
              id
              priserOverskrift
              priser {
                id
                beskrivelse
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
      hovedside,
      artikler
    }
  }
}

export default function Home({ hovedside, artikler }) {
  console.log({ hovedside })

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
      { hovedside.heroBillede.mimeType != 'video/mp4' ?
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
      {hovedside.blokke.map(({ id, __typename, overskrift, kort, billede, layout, sektionLink, sektionLinkTekst, tekst, baggrundsfarve, titel, citater, mailchimpOverskrift, mailchimpTekst, mailchimpUrl, priserOverskrift, priser }) => (
          __typename === 'KortBeholder' ?
          <Categories overskrift={overskrift} key={id}>
            {kort.map(({ id, billede, link, linkTekst, overskrift, tekst}) => (
              <Card
                key={id}
                src={billede.url}
                link={link}
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
              bg={baggrundsfarve}
              key={id}
              overskrift={overskrift}
              html={tekst.html}
            />
          :
          __typename === 'CitatBeholder' ?
            <Citater overskrift={overskrift} key={id}>
              {citater.map(({navn, tekst}) => (
                <Citat tekst={tekst.html} navn={navn} key={id}/>
              ))}
            </Citater>
          :
          __typename === 'Mailchimp' ?
            <Mailchimp overskrift={mailchimpOverskrift} html={mailchimpTekst.html} url={mailchimpUrl} key={id}/>
          :
          __typename === 'PrisBeholder' ?
            <Priser overskrift={priserOverskrift} key={id}>
              {priser.map(({ id, ydelse, beskrivelse, pris, prisLink}) => (
                <Pris key={id} ydelse={ydelse} beskrivelse={beskrivelse} pris={pris} href={prisLink}/>
              ))}
            </Priser>
          :
          <></>
      ))}
      <Articles overskrift='Seneste artikler'>
        {artikler.map(({ id, titel, underoverskrift, slug, billede}) => (
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
    </>
  )
}
