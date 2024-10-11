import styles from '../styles/testimonial.module.scss';

export default function TestimonialSection({ section, i }) {
    const { nameAndAge, testimonial } = section;

    return (
        <section className={styles.testimonialSection} style={i === 0 ? {marginTop: '99px'} : {}}>
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