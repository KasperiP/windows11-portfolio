export type MediaType = {
	filename: string;
	thumbnail: string;
	secure_url: string;
	format: string;
	public_id: string;
	url: string;
};

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
