'use client';
import { useState, useEffect } from 'react';
import styles from './TerminalLoader.module.css';

const loadingPhrases = [
    "> INITIALIZING RUTHLESS_CRITIQUE_PROTOCOL...",
    "> BYPASSING FOUNDER_EGO_FIREWALL...",
    "> ANALYZING MARKET_DELUSIONS...",
    "> COMPARING AGAINST Y-COMBINATOR_STANDARDS...",
    "> PREPARING REALITY_CHECK_PAYLOAD...",
    "> GENERATING ROAST..."
];

export default function TerminalLoader() {
    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.terminalContainer}>
            <div className={styles.terminalHeader}>
                <div className={styles.buttonRed}></div>
                <div className={styles.buttonYellow}></div>
                <div className={styles.buttonGreen}></div>
            </div>
            <div className={styles.terminalBody}>
                {loadingPhrases.slice(0, currentLine + 1).map((phrase, idx) => (
                    <p key={idx} className={styles.line}>
                        {phrase}
                        {idx === currentLine && <span className={styles.cursor}></span>}
                    </p>
                ))}
            </div>
        </div>
    );
}
