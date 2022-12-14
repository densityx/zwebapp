import {useEffect} from "react";
import {useAppSelector} from "../store/hooks";
import {selectAuthUser} from "../store/redux/userSlice";
import {useRouter} from "next/router";
import Heading from "../components/Heading";
import Metadata from "../components/Metadata";

export default function Profile() {
    const router = useRouter();

    const authUser = useAppSelector(selectAuthUser);

    useEffect(() => {
        if (authUser.name === '') {
            router.push('/login')
        }
    }, [authUser])

    if (authUser?.name === '') {
        return <div>You have to be authenticated to access this page</div>
    }

    return (
        <>
            <Metadata
                title={'Welcome ' + authUser.name}
                description={'Welcome back ' + authUser.name}
                image={'/img/3.png'}
                url={router.asPath}
            />

            <div className={'card'}>
                <img
                    src={authUser.picture}
                    className={'rounded-full'}
                    alt={authUser.name + ' profile picture'}
                />

                <Heading
                    title={`Hello and Welcome, ${authUser.name}`}
                    classes={'mt-4'}
                />

                <p className={'badge'}>
                    {authUser.email}
                </p>
            </div>
        </>
    )
}