'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCrosshair, FiTrendingDown, FiLock, FiRefreshCw, FiUnlock } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import styles from './Hero.module.css';
import TerminalLoader from './TerminalLoader';

export default function Hero() {
    const [pitch, setPitch] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    const handleRoast = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pitch.trim()) return;
        setLoading(true);
        setReport(null);

        try {
            const res = await fetch('/api/roast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pitch }),
            });

            const data = await res.json();

            if (res.ok && data.report) {
                setReport(data.report);
            } else {
                console.error('Failed to parse roast:', data.error);
                setReport('## System Failure\nAn error occurred while generating the Roast. Founder evasion tactics detected.');
            }
        } catch (err) {
            console.error(err);
            setReport('## Network Failure\nUnable to reach critique server.');
        } finally {
            setLoading(false);
        }
    };

    // Split logic
    const getSplitMarkdown = () => {
        if (!report) return { freeHtml: '', premiumHtml: '' };

        // We look for the competitor threat header to split the content
        const splitIndex = report.indexOf('## The Competitor Threat');

        if (splitIndex !== -1) {
            const freePart = report.substring(0, splitIndex);
            const premiumPart = report.substring(splitIndex);

            return {
                freeHtml: DOMPurify.sanitize(marked.parse(freePart) as string),
                premiumHtml: DOMPurify.sanitize(marked.parse(premiumPart) as string)
            };
        }

        // Fallback if formatting varied slightly
        return {
            freeHtml: DOMPurify.sanitize(marked.parse(report) as string),
            premiumHtml: ''
        };
    };

    if (loading) {
        return (
            <div className={styles.heroSection}>
                <h2 className={styles.headline}>Agent is Analyzing...</h2>
                <TerminalLoader />
            </div>
        );
    }

    if (report) {
        const { freeHtml, premiumHtml } = getSplitMarkdown();

        return (
            <div className={styles.heroSection}>
                <div className={styles.reportContainer}>
                    {/* Public Section */}
                    <div
                        className={styles.markdownContent}
                        dangerouslySetInnerHTML={{ __html: freeHtml }}
                    />

                    {/* Premium/Blurred Section */}
                    {premiumHtml && (
                        <div className={styles.premiumOverlayContainer}>
                            <div
                                className={`${styles.markdownContent} ${styles.blurredContent}`}
                                dangerouslySetInnerHTML={{ __html: premiumHtml }}
                            />
                            <div className={styles.unlockOverlay}>
                                <FiUnlock className={styles.unlockIcon} />
                                <h3>Unlock the Competitor Threat & Pivot Strategy</h3>
                                <p>Don't build blind. See exactly why incumbents will crush you, and the data-backed pivot our AI recommends.</p>
                                <button className={styles.unlockButton}>
                                    Reveal Full Report - $9
                                </button>
                                <span className={styles.trustedBadge}>One-time payment. Secure via Stripe.</span>
                            </div>
                        </div>
                    )}

                    <button
                        className={styles.resetButton}
                        onClick={() => setReport(null)}
                    >
                        <FiRefreshCw style={{ marginRight: '0.5rem', display: 'inline' }} /> ROAST ANOTHER PITCH
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.heroSection}>
            <motion.div
                className={styles.heroContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className={styles.badge}>
                    <span className={styles.pulseDot}></span>
                    AI Red-Teamer v1.0 Live
                </div>

                <h1 className={styles.headline}>
                    We will <span className={styles.accent}>ruthlessly tear apart</span><br />
                    your startup idea.
                </h1>

                <p className={styles.subheadline}>
                    Solo founders live in echo chambers. Paste your pitch below and our AI agent will act as a brutal Y-Combinator partner, exposing your market flaws before you waste 6 months building.
                </p>

                <form onSubmit={handleRoast} className={`${styles.inputForm} glass-panel`}>
                    <div className={styles.inputWrapper}>
                        <FiCode className={styles.inputIcon} />
                        <textarea
                            className={styles.textarea}
                            placeholder="Paste your startup pitch, landing page copy, or core mechanic here..."
                            value={pitch}
                            onChange={(e) => setPitch(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className={styles.formFooter}>
                        <span className={styles.secureText}><FiLock /> Private & Secure. We don't steal ideas.</span>
                        <button type="submit" className={styles.roastButton} disabled={!pitch.trim()}>
                            ROAST ME
                        </button>
                    </div>
                </form>

                <div className={styles.features} id="how-it-works">
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FiCrosshair /></div>
                        <h3>Market Flaws</h3>
                        <p>We find the exact reason your target audience won't care.</p>
                    </div>
                    <div className={styles.featureItem}>
                        <div className={styles.featureIcon}><FiTrendingDown /></div>
                        <h3>Competitor Threats</h3>
                        <p>Why incumbent companies will crush your current strategy.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
