// NEXT.JS Components
import Head from 'next/head'
import {getHomePageContent} from "../lib/hygraph";
import SectionRenderer from "../components/SectionRenderer";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export async function getStaticProps() {
    const { page } = await getHomePageContent();

    if (!page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page
        }
    }
}

export default function Home({page}) {
    // Fallback values in case page is not defined
    const title = page?.title || 'No Title Available';
    const description = page?.description || 'No Description Available';
    const sections = page?.sections || null;
    const menu = page?.menu || null;
    const footer = page?.footer || null;

    return (
        <>
            <Head>
                <title>Tea Terapi | {title}</title>
                <meta name="description" content={description} key='description'/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Menu menu={menu}/>
            <SectionRenderer sections={sections}/>
            <Footer footer={footer}/>
        </>
    );
}
