import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import Notepad from '../../components/windows/Notepad/Notepad';
function about() {
	const getAge = () => {
		const dateString = '2002-01-30';
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};
	const textContent = () => {
		return `Hello, my name is Kasperi! 👋\n\nI am a ${getAge()}-year-old student / developer from Finland. I am interested on all kinds of tech related topics such as web development! I will be starting computer science studies fall 2022 in University of Tampere. Open the Links folder to follow me on social media! 🤠\n\nBtw this website is built with Next.js and React and is recreation of my windows desktop :D.
		`;
	};

	return (
		<>
			<Head>
				<title>kassq - About me</title>
				<link
					rel="canonical"
					href="https://www.kassq.dev/notepad/about"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<Notepad initialText={textContent()} />
				<Icons />
			</div>
		</>
	);
}

export default about;
