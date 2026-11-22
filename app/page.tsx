import type { Metadata } from 'next';
import Icons from '../components/modules/Icons/Icons';
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

export default function Home() {
	return (
		<div style={{ height: '100%' }}>
			<Icons />
		</div>
	);
}
