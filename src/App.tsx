import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { SettingsContext } from "./context/SettingsContext";

import Header from "./components/Header";
import List from "./pages/List";
import Home from "./pages/Home";

function App() {

    const { isDarkMode } = useContext(SettingsContext);
    const [randomBackground, setRandomBackground] = useState(0);

    useEffect(() => {
        setRandomBackground(Math.floor(Math.random() * 11 + 1)); // Credit to developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random for the random integer function
    }, [])

    return (
        <>
            <div className={`relative min-h-screen bg-gray-800 overflow-hidden text-white`}>
                <div className={`absolute inset-0 bg-fixed bg-center bg-cover opacity-30 blur-sm background-image-${randomBackground}`} />
                <div className={`${isDarkMode ? "bg-gray-900 opacity-50" : "bg-white opacity-50"} absolute inset-0 bg-fixed`} />
                <div className="relative z-10 pb-10">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/list" element={<List />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default App;