
interface TagProps {
    colour: string; //pink | blue | yellow
    text: string
}

function Tag({colour, text}: TagProps) {
    return (
        <div className={`rounded-xl border-2 ${colour === "blue" ? "bg-blue-700 border-blue-500" : (colour === "pink" ? "bg-pink-600 border-pink-400" : (colour === "yellow" && "bg-yellow-600 border-yellow-500"))}`}>
            <p className="px-2 text-center">{text}</p>
        </div>
    );
}
export default Tag;