import Icons from '../../../components/modules/Icons/Icons';
import FileExplorer from '../../../components/windows/FileExplorer/FileExplorer';
import { pageMetadata } from '../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Documents',
	description:
		"Who uses this folder? Maybe I should write 100 reasons why I don't use Linux as my primary OS here.",
	path: '/explorer/documents',
});

function Documents() {
	return (
		<div style={{ height: '100%' }}>
			<FileExplorer folder="Documents" topNav={true} icon="documents" />
			<Icons />
		</div>
	);
}

export default Documents;
