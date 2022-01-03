// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap"
					rel="stylesheet"
				/>

				{/* SEO */}
				<meta name="theme-color" content="#55FFFF" />
				<meta name="author" content="kassq" />
				<meta
					name="description"
					content="Kassq's personal website. A place to share my projects and learn about me."
				/>
				<meta
					name="keywords"
					content="kassq, kasperi, coding, development"
				/>
				<link rel="canonical" href="https://www.kassq.xyz" />
				<meta name="”robots”" content="index, follow" />

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.kassq.xyz" />
				<meta
					property="og:image"
					content="https://www.kassq.xyz/images/logo.webp"
				/>
				<meta
					property="og:description"
					content="Kassq's personal website. A place to share my projects and learn about me."
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
