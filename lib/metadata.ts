import type { Metadata } from 'next';

export const SITE_URL = 'https://www.kassq.dev';

// Next merges `openGraph` shallowly: a page's openGraph replaces the root
// layout's entirely, so every page has to spread these back in.
export const siteOpenGraph = {
	siteName: 'Average Windows enjoyer',
	type: 'website',
	images: ['/logo.webp'],
} satisfies Metadata['openGraph'];

type PageMetadata = {
	title: string;
	description: string;
	// Relative to SITE_URL, e.g. "/explorer/links".
	path: string;
};

export const pageMetadata = ({
	title,
	description,
	path,
}: PageMetadata): Metadata => ({
	title: `kassq - ${title}`,
	description,
	alternates: { canonical: path },
	openGraph: {
		...siteOpenGraph,
		title: `Kassq - ${title}`,
		description,
		url: path,
	},
});
