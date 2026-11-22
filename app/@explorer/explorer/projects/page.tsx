import Image from 'next/image';
import Link from 'next/link';
import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import styles from '../../../../styles/utils/List.module.css';
import type { ProjectType } from '../../../../types';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Projects',
	description:
		"Too lazy to go to my GitHub page? Here's a list of my open source projects. No forks, no private repos, only my public repos.",
	path: '/explorer/projects',
});

export const revalidate = 10;

async function Projects() {
	const data = await getProjects();

	const content = () => {
		const getDate = (date: string) => {
			const dateString = new Date(date).toLocaleDateString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				// Rendered on the server only; pin the zone so it isn't UTC.
				timeZone: 'Europe/Helsinki',
			});
			return dateString.replace(',', '');
		};

		const formatSize = (size: number) => {
			if (size > 1024) {
				return `${(size / 1024).toFixed(2)} MB`;
			}
			return `${size} KB`;
		};

		return (
			<>
				<div className={styles.listItemContainer}>
					{data.map((project) => (
						<Link
							href={project.html_url}
							className={styles.listItem}
							key={project.id}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className={styles.listItemName}>
								<Image
									src="/svg/github.svg"
									unoptimized
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>{project.name}</p>
							</div>
							<p className={styles.listItemDateModified}>
								{getDate(project.updated_at)}
							</p>
							<p className={styles.listItemType}>Shortcut</p>
							<p className={styles.listItemSize}>
								{formatSize(project.size)}
							</p>
						</Link>
					))}
				</div>
			</>
		);
	};
	return (
		<FileExplorer
			icon="folder"
			folder="Projects"
			// Falsy lets FileExplorer render its own
			// "This folder is empty." message.
			component={data.length ? content() : undefined}
			topNav={true}
			itemCount={data.length}
		/>
	);
}

async function getProjects(): Promise<ProjectType[]> {
	// The default page size is 30, which would silently drop repos.
	const res = await fetch(
		`https://api.github.com/users/KasperiP/repos?per_page=100`,
	);
	const json = await res.json();

	// GitHub answers with an object (not an array) when rate-limited.
	const repos: ProjectType[] = Array.isArray(json) ? json : [];

	// Newest first, by the same date shown in the "Date modified" column.
	const data = repos
		.filter(
			(project: ProjectType) =>
				project.fork === false &&
				project.full_name !== 'KasperiP/KasperiP',
		)
		.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
		// GitHub returns ~100 fields per repo; keep only what the page uses.
		.map(({ fork, full_name, id, html_url, name, updated_at, size }) => ({
			fork,
			full_name,
			id,
			html_url,
			name,
			updated_at,
			size,
		}));

	return data;
}

export default Projects;
