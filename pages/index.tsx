import Link from "next/link";
import Heading from "../components/Heading";
import {useAppSelector} from "../store/hooks";
import {selectAuthUser} from "../store/redux/userSlice";
import Metadata from "../components/Metadata";
import {useRouter} from "next/router";

export default function Home() {
    const authUser = useAppSelector(selectAuthUser);
    const router = useRouter()

    return (
        <>
            <Metadata
                title={'Welcome'}
                description={'Welcome to the demo Zwebapp'}
                image={'/img/1.png'}
                url={router.asPath}
            />

            <div className={'card'}>
                <Heading title={'Welcome'}/>

                <article className={'prose dark:prose-invert prose-green content-card'}>
                    {authUser.name ? (
                        <p>
                            Welcome to the demo webapp. You are now logged in, you can view the protected content now
                        </p>
                    ) : (
                        <p>
                            Welcome to the demo webapp. Please Proceed to the
                            {' '}<Link href={'/login'} className={'text-green-500'}>login</Link>{' '}
                            page to access the protected content
                        </p>
                    )}
                </article>
            </div>
        </>
    );
}