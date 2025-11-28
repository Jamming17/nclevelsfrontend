import { useContext } from "react";
import { Link } from "react-router-dom";
import { SettingsContext } from "../context/SettingsContext";

function Header() {
    const { isDarkMode, toggleDarkMode } = useContext(SettingsContext);

    return (
        <>
            {/* Nav Bar */}
            <div className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} flex flex-row items-center relative z-20 fixed w-full text-3xl font-bold p-4`}>
                <p className="mr-20">Nine Circles Level List</p>
                <div className="flex flex-row ml-auto items-center">
                    <Link to="/" className={`${isDarkMode ? "hover:text-gray-300" : "hover:text-gray-600"} underline mr-10`}>Home</Link>
                    <Link to="/list" className={`${isDarkMode ? "hover:text-gray-300" : "hover:text-gray-600"} underline mr-10`}>List</Link>
                    <img src={`/assets/themes/${isDarkMode ? "dark" : "light"}.png`} alt={`Switch to ${isDarkMode ? "light" : "dark"} mode`} title={`Switch to ${isDarkMode ? "light" : "dark"} mode`} className="h-9 w-9 cursor-pointer" onClick={toggleDarkMode}/>
                </div>
            </div>
        </>
    )
}
export default Header;