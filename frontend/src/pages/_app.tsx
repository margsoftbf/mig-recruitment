import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<title>Book List - Your places to buy the best book.</title>
			</Head>
			<main>
				<Component {...pageProps} />
			</main>
		</>
	);
}
