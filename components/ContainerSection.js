import Image from 'next/image';
import styles from '../styles/container.module.scss';
import Link from "next/link";

export default function ContainerSection({ section, i }) {
    const { title, cards } = section;

    return (
        <section className={styles.containerSection} style={i === 0 ? {marginTop: '99px'} : {}}>
            {/* Section title */}
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}

            {/* Map over the cards and display each one */}
            <div className={styles.cards}>
                {cards.map((card, index) => {
                    const slug = card.link?.slug;

                    return (
                        <Link key={index} href={`/${slug}`} passHref>
                            <a className={styles.card}>
                                {/* Card Asset (Image or Video) */}
                                <div className={styles.cardMedia}>
                                    {card.asset.mimeType === 'video/mp4' || card.asset.mimeType === 'video/quicktime' ? (
                                        <video className={styles.video} width="100%" height="auto" controls>
                                            <source src={card.asset.url} type={card.asset.mimeType}/>
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <Image
                                            src={card.asset.url}
                                            alt={card.asset.altText}
                                            objectFit="cover"
                                            layout="fill"
                                        />
                                    )}
                                </div>

                                {/* Card Title */}
                                <h3 className={styles.cardTitle}>{card.title}</h3>

                                {/* Card Description */}
                                <p className={styles.cardDescription}>{card.description}</p>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}