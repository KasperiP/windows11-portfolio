import { pageMetadata } from '../../../../lib/metadata';
import RecycleBin from './RecycleBin';

export const metadata = pageMetadata({
	title: 'Recycle Bin',
	description: 'Everything deleted from the desktop ends up here.',
	path: '/explorer/recycle-bin',
});

export default function RecycleBinPage() {
	return <RecycleBin />;
}
