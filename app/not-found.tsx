import type { Metadata } from 'next';
import Bluescreen from '../components/modules/Bluescreen/Bluescreen';

export const metadata: Metadata = {
	title: 'kassq - 404',
};

export default function NotFound() {
	return <Bluescreen errorCode="404_NOT_FOUND" />;
}
