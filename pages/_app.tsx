import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Header from '../components/Header';
import Footer from "../components/Footer";
import {Provider} from 'react-redux';
import store from '../store/store';

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <main className="relative">
                <Header/>

                <div className={'main-content'}>
                    <Component {...pageProps} />
                </div>

                <Footer/>
            </main>
        </Provider>
    )
}
