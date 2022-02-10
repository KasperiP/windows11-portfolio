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

	const getAccessToken = async () => {
		const response = await fetch(TOKEN_ENDPOINT, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${basic}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
		});

		return response.json();
	};

	const { access_token }: { access_token: string } = await getAccessToken();

	const koodikrapulaRes: { items: [{ release_date: string }] } = await fetch(
		'https://api.spotify.com/v1/shows/1st4zWhHxzXn345vqdTfk8/episodes',
		{
			headers: new Headers({
				Authorization: `Bearer ${access_token}`,
			}),
		}
	).then((res) => res.json());
	const webbidevausRes = await (
		await fetch('https://webbidevaus.fi/')
	).text();

	const koodiapinnanallaRes: { items: [{ release_date: string }] } =
		await fetch(
			'https://api.spotify.com/v1/shows/3wKj2ZpdPi4eO3a2nSNwxy/episodes',
			{
				headers: new Headers({
					Authorization: `Bearer ${access_token}`,
				}),
			}
		).then((res) => res.json());

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

	// koodiapinnanallaRes has key release_date so we can use that to get the latest episode
	const koodiapinnanallaTime = koodiapinnanallaRes.items
		.map((x: { release_date: string }) => x.release_date)
		.sort((a: string, b: string) => +new Date(b) - +new Date(a))[0];

	const koodikrapulaTime = koodikrapulaRes.items
		.map((x: { release_date: string }) => x.release_date)
		.sort((a: string, b: string) => +new Date(b) - +new Date(a))[0];

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
