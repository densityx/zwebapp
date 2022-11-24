import Heading from "../components/Heading";

const stack = [
    'Next.js',
    'Redux',
    'Google Oauth 2',
    'Tailwind CSS',
    'Typescript',
];

export default function About() {
    return (
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
    )
}