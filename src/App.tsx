import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import List from "./pages/List";
import { SettingsContextProvider } from "./context/SettingsContext";
import Home from "./pages/Home";

function App() {

    const [randomBackground, setRandomBackground] = useState(0);

    useEffect(() => {
        setRandomBackground(Math.floor(Math.random() * 11 + 1)); // Credit to developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random for the random integer function
    }, [])

    return (
        <>
            <SettingsContextProvider>
                <div className="relative min-h-screen bg-gray-800 overflow-hidden text-white">
                    <div className={`absolute inset-0 bg-fixed bg-center bg-cover opacity-30 blur-sm background-image-${randomBackground}`} />
                    <div className="absolute inset-0 bg-fixed bg-gray-900 opacity-50" />
                    <div className="relative z-10 pb-10">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/list" element={<List />} />
                        </Routes>
                    </div>
                </div>
            </SettingsContextProvider>
        </>
    )
}

export default App;