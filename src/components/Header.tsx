import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            {/* Nav Bar */}
            <div className="flex flex-row relative z-20 fixed w-full text-3xl font-bold p-4 text-white bg-gray-900">
                <p className="mr-20">Nine Circles Level List</p>
                <div className="flex flex-row ml-auto">
                    <Link to="/" className="underline mr-10">Home</Link>
                    <Link to="/list" className="underline mr-5">List</Link>
                </div>
            </div>
        </>
    )
}
export default Header;