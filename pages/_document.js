import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="da">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,500;1,500?family=Nunito+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Oooh+Baby&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
