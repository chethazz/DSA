import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export function reportWebVitals(metric) {
	console.log(metric);
}
