import DataContextProvider from '../app/context';
import '../styles/globals.css';
import '../styles/dev.css'

function MyApp({ Component, pageProps }) {
	return (
		<DataContextProvider>
			<Component {...pageProps} />
		</DataContextProvider>
	)
}

export default MyApp
