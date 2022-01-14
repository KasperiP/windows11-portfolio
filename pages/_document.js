// pages/_document.js

import { Head, Html, Main, NextScript } from 'next/document';

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
				<meta charset="utf-8" />
				<meta name="language" content="english" />

				<meta name="author" content="kassq" />
				<meta name="designer" content="kassq" />
				<meta name="publisher" content="kassq" />

				<meta
					name="description"
					content="Kassq's personal website. A place to share my projects and learn about me. I do some coding sometimes."
				/>
				<meta
					name="keywords"
					content="kassq, kasperi, coding, development"
				/>
				<link rel="canonical" href="https://www.kassq.dev" />

				<meta name="robots" content="index, follow" />
				<meta name="subject" content="Personal" />

				{/* OpenGraph */}
				<meta property="og:title" content="Kassq" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://www.kassq.dev" />
				<meta
					property="og:image"
					content="https://www.kassq.dev/logo.webp"
				/>
				<meta
					property="og:description"
					content="Kassq's personal website. A place to share my projects and learn about me. I do some coding sometimes."
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
