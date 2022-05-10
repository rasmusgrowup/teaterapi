import Head from 'next/head'

function Meta({ title, keywords, description }) {
  return (
    <Head>
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content={description} key='description'/>
      <meta name="keywords" content={keywords} key='keywords' />
      <meta name="og:title" content={title} key='title'/>
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Marias Rum | Et Kropsterapeutisk Univers',
  keywords: 'Kropsterapi, angst, traume, stress, sorg, behandling',
  description: 'Traumer er en del af livet. Vi kommer alle ud for situationer, som vi ikke er forberedte på. Situationer, hvor kroppen bliver bange og trækker sig sammen. Noget indeni går i stå, og åndedrættet bliver tilbageholdt.'
}

export default Meta
