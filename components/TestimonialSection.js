import styles from '../styles/testimonial.module.scss';

export default function TestimonialSection({ section }) {
    const { nameAndAge, testimonial } = section;

    return (
        <section className={styles.testimonialSection}>
            <div className={styles.inner}>
                <blockquote className={styles.testimonial}>
                    {'"'}{testimonial}{'"'}
                </blockquote>
                <cite className={styles.nameAndAge}>
                    {'— '}{nameAndAge}
                </cite>
            </div>
        </section>
    );
}