import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import Layout from '../components/layouts/Layout/Layout';
import { SITE_URL, siteOpenGraph } from '../lib/metadata';
import '../styles/globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const openSans = Open_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	display: 'swap',
	variable: '--font-open-sans',
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: 'kassq',
	authors: [{ name: 'kassq' }],
	creator: 'kassq',
	publisher: 'kassq',
	keywords: ['kassq', 'kasperi', 'coding', 'development'],
	robots: { index: true, follow: true },
	other: {
		language: 'english',
		designer: 'kassq',
		subject: 'Personal',
	},
	openGraph: { ...siteOpenGraph, url: '/' },
};

export const viewport: Viewport = {
	themeColor: '#55FFFF',
};

// Each app is a parallel-route slot so its window stays mounted while another
// app's route is active (see components/layouts/Layout).
export default function RootLayout({
	children,
	explorer,
	notepad,
	terminal,
}: {
	children: React.ReactNode;
	explorer: React.ReactNode;
	notepad: React.ReactNode;
	terminal: React.ReactNode;
}) {
	return (
		<html lang="en" className={openSans.variable}>
			<body>
				<Layout
					explorer={explorer}
					notepad={notepad}
					terminal={terminal}
				>
					{children}
				</Layout>
				{GA_ID && <GoogleAnalytics gaId={GA_ID} />}
			</body>
		</html>
	);
}
