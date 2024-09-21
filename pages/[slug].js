// NEXT.JS Components
import Head from 'next/head';
import { getAllPages, getPageBySlug } from '../lib/hygraph';  // Import your data fetching functions
import SectionRenderer from '../components/SectionRenderer';
import Menu from '../components/Menu';
import Footer from '../components/Footer';

// Define static paths for pages
export async function getStaticPaths() {
    // Fetch all available pages with slugs from Hygraph
    const pages = await getAllPages();

    // Map through the pages to create dynamic paths
    const paths = pages.map((page) => ({
        params: { slug: page.slug },
    }));

    return {
        paths,
        fallback: 'blocking',  // Enable SSR for pages not generated at build time
    };
}

// Fetch page content based on slug
export async function getStaticProps({ params }) {
    const { slug } = params;

    // Fetch the page by slug from Hygraph
    const page = await getPageBySlug(slug);

    // If the page has `homePage: true`, redirect to the index page
    if (page.homePage) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        };
    }

    // If page is not found, return 404
    if (!page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page
        }
    };
}

// Dynamic Page Component
export default function Page({ page }) {
    // Fallback values in case page data is missing
    const title = page?.title || 'No Title Available';
    const description = page?.description || 'No Description Available';
    const sections = page?.sections || null;
    const menu = page?.menu || null;
    const footer = page?.footer || null;

    return (
        <>
            <Head>
                <title>Tea Terapi | {title}</title>
                <meta name="description" content={description} key="description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Menu menu={menu} />
            <SectionRenderer sections={sections} />
            <Footer footer={footer} />
        </>
    );
}