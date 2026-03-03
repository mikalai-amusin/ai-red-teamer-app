'use client';
import Link from 'next/link';
import { FiTerminal } from 'react-icons/fi';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <a href="/" className={styles.logo}>
                    <FiTerminal className={styles.logoIcon} />
                    <span>Dev</span><span className={styles.accent}>Roast</span>
                </a>
                <nav className={styles.nav}>
                    <a href="#how-it-works" className={styles.navLink}>How it Works</a>
                    <a href="https://github.com/mikalai-amusin/ai-red-teamer-app" target="_blank" rel="noopener noreferrer" className={styles.navLink}>GitHub</a>
                </nav>
            </div>
        </header>
    );
}
