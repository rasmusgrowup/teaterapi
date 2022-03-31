import Image from "next/image"
import scss from '../../styles/articles.module.scss'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { GraphQLClient } from 'graphql-request';

import Chevron from '../../public/chevron_left.svg'

const graphcms = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_URL
)

export async function getStaticProps({ params }) {
  const { artikel } = await graphcms.request(`
    query ArtikelQuery($slug: String!) {
      artikel(where: { slug: $slug}) {
        slug
        tags
        seo {
          metaTitel
          metaBeskrivelse
          metaTags
        }
        indhold {
          html
          text
        }
        titel
        underoverskrift
        billede {
          url
        }
      }
    }
  `,
    {
      slug: params.slug
    }
  );

  return {
    props: {
      artikel
    }
  }
}

export async function getStaticPaths() {
  const { artikler } = await graphcms.request(`
    {
      artikler {
        slug
      }
    }
  `);

  return {
    paths: artikler.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default function Artikel({ artikel }) {
  const router = useRouter()

  if (!router.isFallback && !artikel?.slug) {
    return <ErrorPage statusCode={404} />
  }

  console.log({ artikel })
  return (
    <>
      <Head>
        <title>Marias Rum | {artikel.seo.metaTitel}</title>
        <meta name="description" content={artikel.seo.metaBeskrivelse} key='description'/>
        <meta name="keywords" content={artikel.seo.metaTags} key='keywords' />
      </Head>
      <section className={scss.hero}>
        <Image src={artikel.billede.url} layout='fill' quality='100' objectFit='cover' objectPosition='center'/>
        <div className={scss.content}>
          <h1 className={scss.title}>{artikel.titel}</h1>
        </div>
      </section>
      <section className={scss.indhold}>
        <div className={scss.backLink} onClick={router.back}>
        <Image src={Chevron} height='9' width='9' />
        <span style={{ marginLeft: '0.25rem'}}>tilbage</span>
        </div>
        <h2>{artikel.underoverskrift[0]}</h2>
        <h3>{artikel.underoverskrift[1]}</h3>
        <div dangerouslySetInnerHTML={{ __html: artikel.indhold.html }}></div>
      </section>
    </>
  )
}
