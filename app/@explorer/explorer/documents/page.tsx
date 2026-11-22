import FileExplorer from '../../../../components/windows/FileExplorer/FileExplorer';
import { pageMetadata } from '../../../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Documents',
	description:
		"Who uses this folder? Maybe I should write 100 reasons why I don't use Linux as my primary OS here.",
	path: '/explorer/documents',
});

function Documents() {
	return <FileExplorer folder="Documents" topNav={true} icon="documents" />;
}

export default Documents;
