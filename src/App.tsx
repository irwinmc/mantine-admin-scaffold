import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/code-highlight/styles.css';
import 'mantine-datatable/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import theme from './theme';

import './locale';
import { AppRoutes } from './routes';

function App() {
	return (
		<MantineProvider theme={theme} defaultColorScheme="auto">
			<Notifications position="top-right" />
			<AppRoutes />
		</MantineProvider>
	);
}

export default App;
