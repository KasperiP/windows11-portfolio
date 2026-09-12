import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	// Without this Turbopack walks up past the repo and picks up a stray
	// lockfile in the home directory as the workspace root.
	turbopack: {
		root: path.resolve(import.meta.dirname),
	},
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
		formats: ['image/avif', 'image/webp'],
		imageSizes: [16, 32, 64, 128, 256, 512],
		// Icons.tsx and podcasts.tsx request quality={100}; Next 16 rejects
		// any quality that is not in this allowlist.
		qualities: [75, 100],
	},
};

export default nextConfig;
