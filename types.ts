// A resource as returned by the Cloudinary Admin API (only the fields used).
export type CloudinaryResource = {
	public_id: string;
	secure_url: string;
	format: string;
};

// What the media folders pass from the server page to the client grid.
export type MediaType = {
	filename: string;
	secure_url: string;
	format: string;
};

export type PictureType = MediaType & { url: string };

export type VideoType = MediaType & { thumbnail: string };

export type ErrorType = {
	error: string;
	index: number;
};

export type HistoryType = {
	input: string;
	response: string | null;
};

export type ProjectType = {
	fork: boolean;
	full_name: string;
	id: number;
	html_url: string;
	name: string;
	updated_at: string;
	size: number;
};
