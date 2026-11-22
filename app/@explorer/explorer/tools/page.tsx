import Image from 'next/image';
import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import styles from '../../../../styles/utils/List.module.css';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Tools',
	description:
		'The toolbox I use daily for my stuff. Mostly nerdy coding related tools, but some UI related tools too!',
	path: '/explorer/tools',
});

const TOOLS = [
	{
		name: 'Visual Studio Code',
		icon: 'visualstudiocode',
		modified: '30/12/2021 03:32',
	},
	{
		name: 'Github Desktop',
		icon: 'githubdesktop',
		modified: '30/12/2021 05:10',
	},
	{ name: 'DataGrip', icon: 'datagrip', modified: '22/11/2026 20:58' },
	{ name: 'Claude', icon: 'claude', modified: '22/11/2026 20:58' },
	{ name: 'FileZilla', icon: 'filezilla', modified: '22/11/2026 20:58' },
	{ name: 'Postman', icon: 'postman', modified: '30/12/2021 01:35' },
	{ name: 'Photoshop', icon: 'photoshop', modified: '30/12/2021 02:11' },
	{ name: 'Illustrator', icon: 'illustrator', modified: '30/12/2021 05:59' },
];

function Tools() {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					{TOOLS.map((tool) => (
						<div key={tool.name} className={styles.listItem}>
							<div className={styles.listItemName}>
								<Image
									src={`/icons/${tool.icon}/${tool.icon}.png`}
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>{tool.name}</p>
							</div>
							<p className={styles.listItemDateModified}>
								{tool.modified}
							</p>
							<p className={styles.listItemType}>Shortcut</p>
							<p className={styles.listItemSize}>2kt</p>
						</div>
					))}
				</div>
			</>
		);
	};
	return (
		<FileExplorer
			icon="folder"
			folder="Tools"
			topNav={true}
			component={content()}
		/>
	);
}

export default Tools;
