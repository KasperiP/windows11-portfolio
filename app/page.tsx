import type { Metadata } from 'next';
import { siteOpenGraph } from '../lib/metadata';

const description =
	"Kassq's personal website. A place to share my projects and learn about me. I do some coding sometimes.";

export const metadata: Metadata = {
	title: 'kassq',
	description,
	alternates: { canonical: '/' },
	openGraph: {
		...siteOpenGraph,
		title: 'Kassq',
		description,
		url: '/',
	},
};

// The desktop itself (icons, taskbar) lives in the root Layout so it stays
// mounted under every window; this route only carries the metadata for /.
export default function Home() {
	return null;
}
