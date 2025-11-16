import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import theme from './theme';

import './locale';

function App() {
	return (
		<MantineProvider theme={theme}>
			<h1>Vite + React</h1>
		</MantineProvider>
	);
}

export default App;
