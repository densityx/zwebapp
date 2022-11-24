import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../store/hooks";
import {addAuthUser, AuthUserState} from "../store/redux/userSlice";
import {useRouter} from "next/router";
import {decrypt, encrypt} from '../services/app';
import Heading from '../components/Heading';

export default function Login() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [error, setError] = useState<boolean>(false);

    /** check local storage for credentials and decrypt to store in redux */
    useEffect(() => {
        const credential = window.localStorage.getItem('credential');

        if (credential) {
            const {name, picture, email}: AuthUserState = jwt_decode(decrypt(credential));

            initUserAndRedirect({name, picture, email})
        }
    }, [])

    const handleSuccessLogin = (credentialResponse: { credential: string }) => {
        /** encrypt and store the credentials to local storage */
        window.localStorage.setItem('credential', encrypt(credentialResponse.credential));

        const {name, picture, email}: AuthUserState = jwt_decode(credentialResponse.credential);

        initUserAndRedirect({name, picture, email})
    }

    /** after init user redirect them to profile page */
    const initUserAndRedirect = (authDetails: { name: string, picture: string, email: string }) => {
        dispatch(addAuthUser(authDetails));

        router.push('/profile');
    }

    return (
        <div className={'card'}>
            <Heading title={'Login'}/>

            <article className={'prose dark:prose-invert mt-4'}>
                <p className="text-center">
                    Login using your Google account
                </p>
            </article>

            {error && (
                <div className={'content-card bg-rose-100'}>
                    <p className={'text-rose-500'}>Login Failed. Please try again later.</p>
                </div>
            )}

            <div className={'mt-8 flex justify-center'}>
                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={handleSuccessLogin}
                        size={'large'}
                        onError={() => setError(true)}
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
}
