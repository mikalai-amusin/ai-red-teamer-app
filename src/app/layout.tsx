import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
    title: 'DevRoast | AI Red-Teamer for Indie Hackers',
    description: 'Stop building in an echo chamber. Get ruthlessly roasted by our AI agent and discover your market flaws before you waste 6 months.',
    openGraph: {
        title: 'DevRoast | AI Red-Teamer for Indie Hackers',
        description: 'Ruthless feedback on your startup pitch from an AI trained on Y-Combinator patterns.',
        type: 'website',
        url: 'https://devroast.io', // Placeholder for user's final domain
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DevRoast | AI Red-Teamer',
        description: 'I just got my startup pitch destroyed. Try it yourself.',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="main-layout">
                    <Header />
                    <main className="container" style={{ flex: 1, paddingTop: '4rem', paddingBottom: '4rem' }}>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
