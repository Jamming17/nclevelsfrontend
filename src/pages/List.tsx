import { useState, useContext } from "react";

import Level from "../components/Level";
import { levelInterfaceTypeGuard, EMPTY_LEVEL, type LevelInterface } from "../data/LevelData";
import { apiRequest } from "../apiClient";
import { SettingsContext } from "../context/SettingsContext";


function List() {

    const { isDarkMode, toggleDarkMode } = useContext(SettingsContext);
    const [ displayedLevelsList, setDisplayedLevelsList ] = useState<LevelInterface[]>([]);

    /* Fetch individual level data with a level ID as an input */
    async function fetchLevelData(levelid: string): Promise<LevelInterface> {
        try {
            const data = await apiRequest("boomlings/getLevelId", {
                params: {
                    "str": levelid,
                }
            });

            const dataObj = typeof data === "string" ? JSON.parse(data) : data;
            if (dataObj && typeof dataObj === "object" && "success" in dataObj && "data" in dataObj) {
                if (dataObj.success === true && levelInterfaceTypeGuard(dataObj.data)) {
                    console.log("Level data successfully retrieved:", dataObj.data);
                    return dataObj.data;
                } else {
                    console.error("Data in wrong format:", dataObj.data);
                }
            } else {
                console.error("Data in wrong format.");
            }
        } catch (err) {
            console.error("Failed to fetch levels:", err)
        }
        return EMPTY_LEVEL;
    }

    /* Fetch the whole main list from the database */
    async function getNCLevelList(): Promise<void> {
        try {
            const data = await apiRequest("database/getLevels", {});
            console.log("Database data successfully retrieved:", data);

            const dataObj = typeof data === "string" ? JSON.parse(data) : data;
            if (dataObj && typeof dataObj === "object" && "success" in dataObj && "data" in dataObj) {
                if (dataObj.success === true && Array.isArray(dataObj.data) && dataObj.data.every((level: any) => levelInterfaceTypeGuard(level))) {
                    setDisplayedLevelsList(dataObj.data);
                } else {
                    console.error("Data in wrong format:", dataObj.data);
                }
            } else {
                console.error("Data in wrong format.");
            }
        } catch (err) {
            console.error("Failed to fetch from database:", err);
        }
    }

    return (
        <>
            <br className="py-16"/>
            <button className="cursor-pointer border border-red-700 rounded" onClick={getNCLevelList}>Get the list!</button>
                <div className="flex flex-col items-center">
                {displayedLevelsList.map((level, index) => {
                    return <Level key={index} level={level} getData={fetchLevelData} />
                })}
            </div>
            {isDarkMode ? <p>dark on</p> : <p>dark off</p>}
        </>
    );
}
export default List;