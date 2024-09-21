import React from 'react';
import styles from '../styles/price.module.scss'; // Assume the styles are stored here

const PriceSection = ({ section }) => {
    const { title, text, sessions } = section;

    return (
        <section className={styles.priceSection}>
            <div className={styles.inner}>
                <div className={styles.column}>
                    {/* Title */}
                    {title && <h2 className={styles.title}>{title}</h2>}

                    {/* Text */}
                    {text?.html && (
                        <div
                            className={styles.text}
                            dangerouslySetInnerHTML={{__html: text.html}}
                        />
                    )}
                </div>
                <div className={styles.column}>
                    {/* Sessions */}
                    <div className={styles.sessions}>
                        {sessions.map((session, index) => (
                            <div key={index} className={styles.session}>
                                <h3 className={styles.sessionTitle}>{session.sessionTitle}</h3>
                                <p className={styles.description}>{session.description}</p>
                                <p className={styles.price}>Pris: {session.price}{',- DKK'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceSection;