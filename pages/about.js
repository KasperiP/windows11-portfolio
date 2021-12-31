import React from 'react';
import Icons from '../components/Icons';
import Notepad from '../components/notepad/Notepad';

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
	const aboutMe = () => {
		return `Hello, my name is Kasperi! 👋\n\nI am a ${getAge()}-year-old student / developer from Finland 🇫🇮. I am interested on all kinds of tech related topics such as web development! I am currently studying data scienses in University of Tampere. 📊🧑‍🔬 Open the Links folder to follow me on social media! 🤠
		`;
	};

	return (
		<div style={{ height: '100%' }}>
			<Notepad name="About me" text={() => aboutMe()} />
			<Icons />
		</div>
	);
}

export default about;