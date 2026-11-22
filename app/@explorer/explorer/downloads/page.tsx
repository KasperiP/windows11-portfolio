import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Downloads',
	description: 'I have an obsession to keep this folder empty.',
	path: '/explorer/downloads',
});

function Downloads() {
	return <FileExplorer folder="Downloads" topNav={true} icon="downloads" />;
}

export default Downloads;
