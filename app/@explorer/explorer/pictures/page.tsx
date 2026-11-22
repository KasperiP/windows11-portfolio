import { pageMetadata } from '../../../../lib/metadata';
import type { CloudinaryResource, PictureType } from '../../../../types';
import PictureGrid from './PictureGrid';

export const metadata = pageMetadata({
	title: 'Pictures',
	description: 'Funny memes and pictures from the internet.',
	path: '/explorer/pictures',
});

export const revalidate = 10;

export default async function Pictures() {
	const data = await getPictures();

	return <PictureGrid data={data} />;
}

async function getPictures(): Promise<PictureType[]> {
	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?max_results=100`,
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

	// Cloudinary returns an error object instead of `resources` when the
	// credentials are missing or rejected; degrade to an empty folder rather
	// than failing the whole build.
	const resources: CloudinaryResource[] = Array.isArray(res?.resources)
		? res.resources
		: [];

	const data = resources.map((image: CloudinaryResource) => {
		return {
			url: image.secure_url.replace('/upload/', '/upload/q_auto:low/'),
			secure_url: image.secure_url,
			filename:
				image.public_id.replace('images/', '').length > 25
					? image.public_id.replace('images/', '').slice(0, 25)
					: image.public_id.replace('images/', ''),
			format: image.format,
		};
	});

	return data;
}
