import { createContext, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
	const [maximized, setMaximized] = useState(false);
	return (
		<Context.Provider value={[maximized, setMaximized]}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
