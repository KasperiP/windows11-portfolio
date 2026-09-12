import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.css';

type Props = {
	webbidevausTime: string;
	koodikrapulaTime: string;
	koodiapinnanallaTime: string;
};

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
					<Link href="https://webbidevaus.fi/" passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/podcasts/webbidevaus.png"
										alt="icon"
										width={16}
										quality={100}
										height={16}
									></Image>
									<p>Webbidevaus.fi</p>
								</div>
								<p className={styles.listItemDateModified}>
									{getDate(data.webbidevausTime)}
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link href="https://koodiapinnanalla.fi/" passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/podcasts/koodiapinnanalla.png"
										alt="icon"
										width={16}
										quality={100}
										height={16}
									></Image>
									<p>Koodia pinnan alla</p>
								</div>
								<p className={styles.listItemDateModified}>
									{getDate(data.koodiapinnanallaTime)}
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link href="https://koodikrapula.fi/" passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/icons/podcasts/koodikrapula.png"
										alt="icon"
										width={16}
										quality={100}
										height={16}
									></Image>
									<p>Koodikrapula</p>
								</div>
								<p className={styles.listItemDateModified}>
									{getDate(data.koodikrapulaTime)}
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
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
		`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
	).toString('base64');
	const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

	// These three podcast feeds are nice-to-have metadata. None of them should
	// be able to fail the whole build, so every request degrades to a fallback
	// on a network error, a missing credential, or a rate limit.
	const EPOCH = '1970-01-01';

	const getAccessToken = async () => {
		try {
			const response = await fetch(TOKEN_ENDPOINT, {
				method: 'POST',
				headers: {
					Authorization: `Basic ${basic}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
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
			const res: { items?: { release_date: string }[] } = await fetch(
				`https://api.spotify.com/v1/shows/${showId}/episodes`,
				{
					headers: new Headers({
						Authorization: `Bearer ${access_token}`,
					}),
				}
			).then((r) => r.json());

			if (!Array.isArray(res.items)) return EPOCH;

			return (
				res.items
					.map((x) => x.release_date)
					.sort((a, b) => +new Date(b) - +new Date(a))[0] ?? EPOCH
			);
		} catch {
			return EPOCH;
		}
	};

	const webbidevausRes = await fetch('https://webbidevaus.fi/')
		.then((res) => res.text())
		.catch(() => '');

	// Webbidevaus (not on spotify so using this hacky way)
	const webbidevausTimeElement = webbidevausRes.match(
		/<span class="meta__section-title meta__section-title--light">(.*?)"/
	);
	const webbidevausTime = webbidevausTimeElement
		? webbidevausTimeElement[1]
				.replace('</span></h2><h2 class=', '')
				.split('.')
				.reverse()
				.map((x) => x.padStart(2, '0'))
				.join('-')
		: '01.01.1970 00:00';

	const koodiapinnanallaTime = await latestEpisode(
		'3wKj2ZpdPi4eO3a2nSNwxy'
	);
	const koodikrapulaTime = await latestEpisode('1st4zWhHxzXn345vqdTfk8');

	return {
		props: {
			data: {
				koodikrapulaTime,
				webbidevausTime,
				koodiapinnanallaTime,
			},
		},
		revalidate: 30, // In seconds
	};
}

export default Podcasts;
