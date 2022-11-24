import Heading from "../components/Heading";
import Metadata from "../components/Metadata";

const stack = [
    'Next.js',
    'Redux',
    'Google Oauth 2',
    'Tailwind CSS',
    'Typescript',
];

export default function About() {
    return (
        <>
            <Metadata
                title={'About'}
                description={'This is a demo webapp developed by Ahmad Aziz'}
                image={'/img/7.png'}
                url={'/about'}
            />

            <div className={'card'}>
                <Heading title={'About'}/>

                <article className={'prose dark:prose-invert content-card'}>
                    <p>
                        This is a demo webapp developed by Ahmad Aziz (ahmadaziz97@live.com)
                    </p>

                    <p className={'mt-8 space-x-2'}>
                        {(stack.map((s, i) => (
                            <span className={'badge badge-custom'} key={i}>{s}</span>
                        )))}
                    </p>
                </article>
            </div>
        </>
    )
}