import React from 'react';
import Icons from '../components/Icons';
import Notepad from '../components/notepad/Notepad';

function about() {
	return (
		<div style={{ height: '100%' }}>
			<Notepad name="About me" />
			<Icons />
		</div>
	);
}

export default about;
