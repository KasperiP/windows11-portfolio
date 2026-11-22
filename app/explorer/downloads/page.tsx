import Icons from '../../../components/modules/Icons/Icons';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Downloads',
	description: 'I have an obsession to keep this folder empty.',
	path: '/explorer/downloads',
});

function Downloads() {
	return (
		<div style={{ height: '100%' }}>
			<FileExplorer folder="Downloads" topNav={true} icon="downloads" />
			<Icons />
		</div>
	);
}

export default Downloads;
