import cloudinary from 'cloudinary';

// Export function
export default async function getImages() {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
		secure: true,
	});

	const res = await cloudinary.v2.search
		.expression(
			'folder:images/*' // add your folder
		)
		.sort_by('public_id', 'desc')
		.max_results(30)
		.execute();

	return res.resources;
}
