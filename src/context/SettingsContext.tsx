import { useState, createContext, type ReactNode } from "react";

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
    // Load theme from storage, else use current browser theme, else use dark theme
    const [ isDarkMode, setIsDarkMode ] = useState<boolean>(() => {
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") == "true") {
                return true;
            } else {
                return false;
            }
        }
        try {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
        } catch (err) {
            console.log("Could not determine theme for user. Setting to dark theme.")
        }
        return true;
    });
    
    function toggleDarkMode() {
        setIsDarkMode((prev) => {
            localStorage.setItem("theme", `${!prev}`);
            return !prev
        });
    }

    return (
        <SettingsContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </SettingsContext.Provider>
    );
}