'use client';
import Link from 'next/link';
import { FiTerminal } from 'react-icons/fi';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <Link href="/" className={styles.logo} onClick={() => {
                    localStorage.removeItem('last_roast');
                }}>
                    <FiTerminal className={styles.logoIcon} />
                    <span>Dev</span><span className={styles.accent}>Roast</span>
                </Link>
                <nav className={styles.nav}>
                    <Link href="#how-it-works" scroll={false} className={styles.navLink}>How it Works</Link>
                    <a href="https://github.com/mikalai-amusin/ai-red-teamer-app" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
                </nav>
            </div>
        </header>
    );
}
