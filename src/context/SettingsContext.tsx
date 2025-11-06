import React, { useState, useContext, createContext, type ReactNode } from "react";

/* Type interface for the contents of SettingsContext */
interface SettingsContextInterface {
    isDarkMode: boolean,
    toggleDarkMode: () => void;
}

/* Initial context values */
export const SettingsContext = createContext<SettingsContextInterface>({
    isDarkMode: true, //window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
    toggleDarkMode: () => {}
});

interface SettingsProviderProps {
    children: ReactNode;
}

export function SettingsContextProvider({ children }: SettingsProviderProps) {
    const [ isDarkMode, setIsDarkMode ] = useState(true);
    
    function toggleDarkMode() {
        setIsDarkMode((prev) => !prev);
    }

    return (
        <SettingsContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </SettingsContext.Provider>
    );
}