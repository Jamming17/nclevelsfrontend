import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import List from "./pages/List";
import { SettingsContextProvider } from "./context/SettingsContext";

function App() {
    return (
        <>
            <SettingsContextProvider>
                <Header />
                <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-800 text-white pt-20">
                    <Routes>
                        <Route path="/list" element={<List />} />
                    </Routes>
                </div>
            </SettingsContextProvider>
        </>
    )
}

export default App;