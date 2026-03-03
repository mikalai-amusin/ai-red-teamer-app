'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCode, FiCrosshair, FiTrendingDown, FiLock, FiRefreshCw } from 'react-icons/fi';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import styles from './Hero.module.css';
import TerminalLoader from './TerminalLoader';

function HeroContent() {
    const searchParams = useSearchParams();
    const [pitch, setPitch] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    // Page refresh should return to home (no auto-restore)
    // Removed the useEffect that was restoring from localStorage

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
                // We still save to localStorage in case we want to re-enable restore later, 
                // but we don't auto-load it on mount.
                localStorage.setItem('last_roast', data.report);
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

    const handleDownload = () => {
        if (!report) return;
        const blob = new Blob([report], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `devroast-report-${Date.now()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
        const htmlContent = DOMPurify.sanitize(marked.parse(report) as string);

        return (
            <div className={styles.heroSection}>
                <div className={styles.reportContainer}>
                    <div
                        className={styles.markdownContent}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />

                    <div className={styles.actionButtons}>
                        <button
                            className={styles.resetButton}
                            onClick={() => {
                                setReport(null);
                                localStorage.removeItem('last_roast');
                            }}
                        >
                            <FiRefreshCw style={{ marginRight: '0.5rem', display: 'inline' }} /> ROAST ANOTHER PITCH
                        </button>

                        <button
                            className={styles.downloadButton}
                            onClick={handleDownload}
                        >
                            <FiCode style={{ marginRight: '0.5rem', display: 'inline' }} /> DOWNLOAD MARKDOWN
                        </button>
                    </div>
                </div>

                <div className={styles.features} id="how-it-works" style={{ marginTop: '4rem' }}>
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

export default function Hero() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HeroContent />
        </Suspense>
    );
}
