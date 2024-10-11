import Link from 'next/link';
import styles from '../styles/mainSection.module.scss';
import common from '../styles/common.module.scss';
import Image from "next/image";

export default function MainSection({ section, i }) {
    const { title, useTitleOnWebsite, sectionAsset, sectionLink, alignment, sectionText } = section;

    // Determine the alignment class
    const alignmentClass = styles[alignment] || ''; // Apply alignment based on the value (e.g., 'left', 'center', 'right')

    // Handle section link, whether it's internal or external
    const linkComponent = sectionLink && (
        sectionLink.__typename === 'ExternalLink' ? (
            <a href={sectionLink.urlLink} target="_blank" rel="noopener noreferrer">
                {sectionLink.linkText}
            </a>
        ) : sectionLink.__typename === 'InternalLink' ? (
            <Link href={`/${sectionLink.page.slug}`}>
                {sectionLink.linkText}
            </Link>
        ) : null
    );

    return (
        <section className={`${styles.mainSection} ${alignmentClass}`} style={i === 0 ? {marginTop: '99px'} : {}}>
            <div className={styles.textColumn}>
                {/* Conditionally render the title if useTitleOnWebsite is true */}
                {useTitleOnWebsite && <h2 className={styles.title}>{title}</h2>}

                {/* Render the section text */}
                {sectionText && (
                    <div
                        className={styles.sectionText}
                        dangerouslySetInnerHTML={{ __html: sectionText.html }}
                    />
                )}

                {/* Render the link, if provided */}
                {sectionLink && (
                    <div className={styles.sectionLink}>
                        {linkComponent}
                    </div>
                )}
            </div>
            <div className={styles.assetColumn}>
                <div className={styles.asset}>
                    {/* Render the section asset (video or image) */}
                    {sectionAsset && (
                        sectionAsset.mimeType === 'video/quicktime' || sectionAsset.mimeType === 'video/mp4' ? (
                            <video className={styles.video} width="100%" height="auto" autoPlay loop preload="auto">
                                <source src={sectionAsset.url} type={sectionAsset.mimeType} />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <Image
                                src={sectionAsset.url}
                                alt={sectionAsset.altText}
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                        )
                    )}
                </div>
            </div>
        </section>
    );
}