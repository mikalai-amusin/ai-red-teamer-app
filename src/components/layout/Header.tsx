import Link from 'next/link';
import { FiTerminal } from 'react-icons/fi';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <Link href="/" className={styles.logo}>
                    <FiTerminal className={styles.logoIcon} />
                    <span>Dev</span><span className={styles.accent}>Roast</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="#how-it-works" className={styles.navLink}>How it Works</Link>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.navLink}>Twitter</a>
                </nav>
            </div>
        </header>
    );
}
