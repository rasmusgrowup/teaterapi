import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from '../components/Layout'
import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { MenuProvider } from "../lib/menuContext"
import { MenuContext } from "../lib/menuContext"
import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-PGRRNDC' });
  }, []);

  return (
    <MenuProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MenuProvider>
  )
}

export default MyApp
