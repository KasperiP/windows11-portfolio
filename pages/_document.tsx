// pages/_document.js

import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap"
					rel="stylesheet"
				/>

				{/* SEO & Open Graph meta tags */}
				<meta name="theme-color" content="#55FFFF" />
				<meta charSet="utf-8" />
				<meta name="language" content="english" />

				<meta name="author" content="kassq" />
				<meta name="designer" content="kassq" />
				<meta name="publisher" content="kassq" />

				<meta
					name="keywords"
					content="kassq, kasperi, coding, development"
				/>

				<meta name="robots" content="index, follow" />
				<meta name="subject" content="Personal" />

				{/* Global OpenGraph tags */}
				<meta
					property="og:site_name"
					content="Average Windows enjoyer"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.kassq.dev" />
				<meta
					property="og:image"
					content="https://www.kassq.dev/logo.webp"
				/>

				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
							page_path: window.location.pathname,
							});
						`,
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
