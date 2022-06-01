import Link from "next/link"
import scss from '../styles/mailchimp.module.scss'
import useSWR from 'swr'
import { request } from 'graphql-request'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl1aoja8b02gc01xm3r6e8ajy/master', query)

export default function Newsletter() {
  const { data, error } = useSWR(`
    query FooterContent {
      footer(where: {footerType: Generel}) {
        tekstTilNyhedsbrev {
          html
        }
      }
    }`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <section className={scss.newsletter}>
        <div className={scss.inner}>
          <h2>Følg med i Marias Rum</h2>
          <div dangerouslySetInnerHTML={{ __html: `${data.footer.tekstTilNyhedsbrev.html}` }}></div>
          <Link href='https://gmail.us14.list-manage.com/subscribe?u=afa7bafb8da9deb3bd242c3f0&id=8b33abd27d'><a className={scss.signUpButton} target='_blank'>Gå til formular</a></Link>
        </div>
      </section>
    </>
  )
}
