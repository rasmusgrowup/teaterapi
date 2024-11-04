import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/menu.module.scss';
import {useState} from "react";

export default function Menu({ menu }) {
    const router = useRouter();
    const menuItems = menu?.menuItem || [];
    const downChevron = '\u25BC';
    // State for tracking if the menu is open
    const [menuOpen, setMenuOpen] = useState(false);

    // State to track which dropdown is open (by item id)
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Function to toggle the active dropdown
    const toggleDropdown = (id) => {
        setActiveDropdown(prevId => (prevId === id ? null : id)); // Toggle between null and the selected id
        console.log(id)
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menuInner}>
                <div className={styles.logo}>
                    <Link href="/">
                        Tea Terapi
                    </Link>
                </div>
                <nav className={styles.navigation}>
                    <div className={`${styles.mobileMenuToggle} ${menuOpen ? styles.closeIcon : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={`${styles.menuList} ${menuOpen ? styles.menuIsOpen : ''}`}>
                        {menuItems.map((item, index) => {
                            const pages = item.pages || [];
                            const isDropdownActive = activeDropdown === item.id;

                            // Check if the current URL matches the slug or the homepage
                            return pages.length > 1 ? (
                                // Dropdown case
                                <li key={index} className={styles.menuItem}>
                                    <span
                                        className={styles.dropdownToggle}
                                        onClick={() => toggleDropdown(item.id)} // Toggle the corresponding dropdown
                                    >
                                        {item.text} <span style={{fontSize: '75%'}}>{downChevron}</span>
                                    </span>
                                    <ul className={`${styles.dropdownMenu} ${activeDropdown === item.id ? styles.display : ''}`}>
                                        {pages.map((page, idx) => {
                                            const href = page.homePage ? '/' : `/${page.slug}`;

                                            const isActive = router.asPath === `/${page.slug}` ||
                                                (router.asPath === '/' && page.homePage);

                                            return (
                                                <li key={idx}
                                                    className={`${styles.dropdownItem} ${isActive ? styles.active : ''}`}
                                                    onClick={() => [setActiveDropdown(null), setMenuOpen(false)]}
                                                >
                                                    <Link href={href}>
                                                        {page.title}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ) : (
                                // Single page case
                                pages[0] && (
                                    <li key={index}
                                        className={`${styles.menuItem} ${router.asPath === `/${pages[0].slug}` || (router.asPath === '/' && pages[0].homePage) ? styles.active : ''}`}>
                                        <Link href={pages[0].homePage ? '/' : `/${pages[0].slug}`}>
                                            {item.text}
                                        </Link>
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}