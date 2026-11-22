import { pageMetadata } from '../../../../lib/metadata';
import DesktopFolder from './DesktopFolder';

export const metadata = pageMetadata({
	title: 'Desktop',
	description:
		"My desktop is beautiful until I start some project and then my desktop is full of temporary files and folders. I don't want to see them.",
	path: '/explorer/desktop',
});

export default function Desktop() {
	return <DesktopFolder />;
}
