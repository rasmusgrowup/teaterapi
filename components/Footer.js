import Link from 'next/link';
import styles from "../styles/footer.module.scss";
import { useRouter } from 'next/router';

export default function Footer({ footer }) {
    const router = useRouter(); // To check active links
    const menu = footer?.menu[0] || null;
    const menuItems = footer?.menu[0]?.menuItem || [];

    return (
        <footer className={styles.footer}>
            <div className={styles.columns}>
                <div className={styles.column}>
                    {/* Render the text area content */}
                    <div className={styles.textArea} dangerouslySetInnerHTML={{__html: footer?.textArea?.html}}/>
                </div>

                <div className={styles.column}>
                    {/* Render the menu */}
                    <nav className={styles.footerMenu}>
                        <h5>{menu.title}</h5>
                        <ul className={styles.menuList}>
                            {menuItems.map((item, index) => {
                                // Determine the correct href for each menu item
                                const href = item.page?.homePage ? '/' : `/${item.page?.slug}`;

                                // Check if the current URL matches the menu item's slug or the homepage
                                const isActive = router.asPath === `/${item.page?.slug}` ||
                                    (router.asPath === '/' && item.page?.homePage);

                                return (
                                    <li key={index} className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
                                        <Link href={href}>
                                            {item.text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div className={styles.column}>
                    {/* Render the bottom text area */}
                    <div className={styles.bottomTextArea} dangerouslySetInnerHTML={{__html: footer?.bottomTextArea?.html}}/>
                </div>
            </div>
            <div className={styles.copyrights}>
                ©{new Date().getFullYear()} Tea-Terapi | Webdesign af <Link href={'https://growupstudio.dk'}>Growup Studio</Link>
            </div>
        </footer>
    );
}