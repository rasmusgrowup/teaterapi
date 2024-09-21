import styles from '../styles/hero.module.scss'
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

export default function HeroSection({ section, i }) {
    const id = section?.id || -1;
    const asset = section?.asset || null;
    const link = section?.link || null; // No destructuring
    const title = section?.title || 'No Title'; // Assign title correctly
    const router = useRouter();

    return (
        <section className={styles.heroSection}>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                {link && (
                    <Link href={link?.__typename === 'InternalLink' ? link?.page?.slug : link?.urlLink}>
                        <a className={styles.link}>{link?.linkText || 'Learn More'}</a>
                    </Link>
                )}
            </div>
            <div className={styles.background}>
                {asset && (asset.mimeType === 'video/quicktime' || asset.mimeType === 'video/mp4') ?
                    <video key={router.asPath} className={styles.video} width="100%" height="auto" autoPlay loop muted playsInline={'true'} preload="true">
                        <source src={asset.url} type="video/quicktime"/>
                        Your browser does not support the video tag.
                    </video>
                    :
                    <Image src={asset.url} alt={asset.altText} layout="fill" objectPosition={'center'} objectFit={'cover'} />
                }
            </div>
        </section>
    );
}