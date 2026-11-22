import Icons from '../../components/modules/Icons/Icons';
import { default as TerminalComponent } from '../../components/windows/Terminal/Terminal';
import { pageMetadata } from '../../lib/metadata';

export const metadata = pageMetadata({
	title: 'Terminal',
	description: 'A place to execute commands and feel like being a hacker.',
	path: '/terminal',
});

function Terminal() {
	return (
		<div style={{ height: '100%' }}>
			<TerminalComponent />
			<Icons />
		</div>
	);
}

export default Terminal;
