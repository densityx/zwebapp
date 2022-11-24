export default function Heading({title, classes}: { title: string, classes?: string }) {
    return (
        <h1 className={`text-3xl font-extrabold text-center ${classes}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-indigo-500">
                {title}
            </span>
        </h1>
    )
}