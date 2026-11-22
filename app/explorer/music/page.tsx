import Icons from '../../../components/modules/Icons/Icons';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Music',
	description: 'I think this folder has some meme value?',
	path: '/explorer/music',
});

function Music() {
	return (
		<div style={{ height: '100%' }}>
			<FileExplorer folder="Music" topNav={true} icon="music" />
			<Icons />
		</div>
	);
}

export default Music;
