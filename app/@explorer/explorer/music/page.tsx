import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Music',
	description: 'I think this folder has some meme value?',
	path: '/explorer/music',
});

function Music() {
	return <FileExplorer folder="Music" topNav={true} icon="music" />;
}

export default Music;
