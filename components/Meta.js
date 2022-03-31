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

export default Meta

Meta.defaultProps = {
  title: 'Marias Rum | Kropsterapi',
  keywords: 'Kommerciel, foto, video, fotografering, videoproduktion, pack-shots, professionel, odense, centrum, Stöj, uddannede fotografer, uddannet fotograf',
  description: 'Vi skyder kommercielle billeder for landets største mediehuse, og arbejder med konceptudvikling for mindre virksomheder og start-ups. Vi er drevet af en passion for vores fag og sætter en ære i grundighed.'
}
