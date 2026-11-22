import { pageMetadata } from '../../../../lib/metadata';
import type { CloudinaryResource, VideoType } from '../../../../types';
import VideoGrid from './VideoGrid';

export const metadata = pageMetadata({
	title: 'Videos',
	description:
		'Here you can find funny dog and cat videos I randomly post sometimes. Maybe horses too.',
	path: '/explorer/videos',
});

export const revalidate = 10;

export default async function Videos() {
	const data = await getVideos();

	return <VideoGrid data={data} />;
}

async function getVideos(): Promise<VideoType[]> {
	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/video?max_results=100`,
		{
			headers: {
				Authorization: `Basic ${Buffer.from(
					process.env.CLOUDINARY_API_KEY +
						':' +
						process.env.CLOUDINARY_API_SECRET,
				).toString('base64')}`,
			},
		},
	).then((res) => res.json());

	// See the note in pictures/page.tsx: guard against an error response.
	const resources: CloudinaryResource[] = Array.isArray(res?.resources)
		? res.resources
		: [];

	const data = resources.map((video: CloudinaryResource) => {
		return {
			thumbnail: (
				video.secure_url.split('.').slice(0, -1).join('.') + '.webp'
			).replace('/upload/', '/upload/q_auto:low/'),
			filename:
				video.public_id.replace('videos/', '').length > 25
					? video.public_id.replace('videos/', '').slice(0, 25)
					: video.public_id.replace('videos/', ''),
			secure_url: video.secure_url,
			format: video.format,
		};
	});

	return data;
}
