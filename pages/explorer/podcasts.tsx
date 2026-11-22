import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.css';

// Every podcast is on Spotify: the link opens the show page and the
// "Date modified" column is its latest episode's release date.
const PODCASTS = [
	{
		id: '4DJc5geASZG0LyKir2Jo6g',
		name: 'Startup-ministeriö',
		icon: 'startup-ministerio',
	},
	{ id: '4kYCRYJ3yK5DQbP5tbfZby', name: 'Syntax', icon: 'syntax' },
	{
		id: '4qcJFTTXfQ2FTmydYdHROA',
		name: 'Ikkunastudio',
		icon: 'ikkunastudio',
	},
	{
		id: '0HLYsOelXm4wfdNc2GxduR',
		name: 'HS Visio -podcast',
		icon: 'hs-visio',
	},
	{
		id: '0aIOiWdD5TCTHurBjCq08Q',
		name: 'Herrasmieshakkerit',
		icon: 'herrasmieshakkerit',
	},
	{
		id: '6QTJPLEPW3EhWQImrcYQpy',
		name: 'Sijoituskästi',
		icon: 'sijoituskasti',
	},
] as const;

type Props = Record<string, string>;

const getDate = (date: string) => {
	const dateString = new Date(date).toLocaleDateString('en-GB', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});
	return dateString.replace(',', '');
};

function Podcasts({ data }: { data: Props }) {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					{PODCASTS.map((podcast) => (
						<Link
							key={podcast.id}
							href={`https://open.spotify.com/show/${podcast.id}`}
							className={styles.listItem}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className={styles.listItemName}>
								<Image
									src={`/icons/podcasts/${podcast.icon}.png`}
									alt="icon"
									width={16}
									quality={100}
									height={16}
								></Image>
								<p>{podcast.name}</p>
							</div>
							<p className={styles.listItemDateModified}>
								{getDate(data[podcast.id])}
							</p>
							<p className={styles.listItemType}>Shortcut</p>
							<p className={styles.listItemSize}>2kt</p>
						</Link>
					))}
				</div>
			</>
		);
	};
	return (
		<>
			<Head>
				<title>kassq - Podcasts</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/explorer/favorites"
				/>

				{/* Description */}
				<meta
					name="description"
					content="I like to listen podcasts. Here you can find some of my favorites."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq - Podcasts" />
				<meta
					property="og:url"
					content="https://www.kassq.dev/explorer/podcasts"
				/>
				<meta
					property="og:description"
					content="I like to listen podcasts. Here you can find some of my favorites."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Podcasts I listen to"
					topNav={true}
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const basic = Buffer.from(
		`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
	).toString('base64');
	const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

	// These podcast feeds are nice-to-have metadata. None of them should
	// be able to fail the whole build, so every request degrades to a fallback
	// on a network error, a missing credential, or a rate limit.
	const EPOCH = '1970-01-01';

	const getAccessToken = async () => {
		try {
			// Only public catalog data is read, so the client-credentials
			// grant is enough -- no user token to obtain or refresh.
			const response = await fetch(TOKEN_ENDPOINT, {
				method: 'POST',
				headers: {
					Authorization: `Basic ${basic}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'grant_type=client_credentials',
			});

			const json: { access_token?: string } = await response.json();
			return json.access_token;
		} catch {
			return undefined;
		}
	};

	const access_token = await getAccessToken();

	const latestEpisode = async (showId: string) => {
		if (!access_token) return EPOCH;

		try {
			const res: { items?: ({ release_date: string } | null)[] } =
				await fetch(
					`https://api.spotify.com/v1/shows/${showId}/episodes`,
					{
						headers: new Headers({
							Authorization: `Bearer ${access_token}`,
						}),
					},
				).then((r) => r.json());

			if (!Array.isArray(res.items)) return EPOCH;

			// Spotify returns null in place of episodes that are unavailable
			// to this client, so skip those.
			return (
				res.items
					.flatMap((x) => (x ? [x.release_date] : []))
					.sort((a, b) => +new Date(b) - +new Date(a))[0] ?? EPOCH
			);
		} catch {
			return EPOCH;
		}
	};

	const latest = await Promise.all(
		PODCASTS.map(async (podcast) => [
			podcast.id,
			await latestEpisode(podcast.id),
		]),
	);

	return {
		props: {
			data: Object.fromEntries(latest),
		},
		revalidate: 30, // In seconds
	};
}

export default Podcasts;
