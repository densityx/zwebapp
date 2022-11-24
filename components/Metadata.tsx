import Head from "next/head";

interface MetadataProps {
    title: string;
    description: string;
    image: string;
    url: string;
}

export default function Metadata({ title, description, image, url }: MetadataProps) {
    return (
        <Head>
            {/*Primary Meta Tags*/}
            <title>{title + ' | Zwebapp'}</title>
            <meta name="title" content={title + ' | Zwebapp'}/>
            <meta name="description" content={description}/>

            {/*Open Graph / Facebook*/}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title + ' | Zwebapp'}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>

            {/*Twitter*/}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={title + ' | Zwebapp'}/>
            <meta property="twitter:description" content={description}/>
            <meta property="twitter:image" content={image}/>

            <link rel="icon" href="/favicon.ico"/>
        </Head>
    )
}