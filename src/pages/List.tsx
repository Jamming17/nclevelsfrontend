import { useState, useEffect, useContext } from "react";

import Level from "../components/Level";
import { levelInterfaceTypeGuard, EMPTY_LEVEL, type LevelInterface } from "../data/LevelData";
import { apiRequest } from "../apiClient";
import { SettingsContext } from "../context/SettingsContext";


function List() {

    const { isDarkMode, toggleDarkMode } = useContext(SettingsContext);
    const [ allLevels, setAllLevels ] = useState<LevelInterface[]>([]);
    const [ displayedLevelsList, setDisplayedLevelsList ] = useState<LevelInterface[]>([]);

    const [ mainOrExtended, setMainOrExtended ] = useState<string>("main");
    const [ demonsOrNon, setDemonsOrNon ] = useState<string>("demons");

    /* Initial load of list */
    useEffect(() => {
        getNCLevelList();
    }, []);

    /* Fetch individual level data with a level ID as an input */
    async function fetchLevelData(levelid: string): Promise<LevelInterface> {
        try {
            const data = await apiRequest("boomlings/getLevelId", {
                params: {
                    "str": levelid
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
        setAllLevels([]);
        try {
            const filterString = mainOrExtended + "-" + demonsOrNon;
            console.log("filter:", filterString);
            const data = await apiRequest("database/getLevels", {
                params: {
                    filter: filterString
                }
            });
            console.log("Database data successfully retrieved:", data);

            /* Verify types of response */
            const dataObj = typeof data === "string" ? JSON.parse(data) : data;
            if (dataObj && typeof dataObj === "object" && "success" in dataObj && "data" in dataObj) {
                if (dataObj.success === true && Array.isArray(dataObj.data) && dataObj.data.every((level: any) => levelInterfaceTypeGuard(level))) {
                    setAllLevels(dataObj.data);
                    // Apply default filters
                    setDisplayedLevelsList(dataObj.data.filter((level: any) => level.extra === false && level.stars === 10));
                    console.log(`Retrieved ${dataObj.data.length} levels`);
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

    function handleMainOrExtendedChange(e: React.ChangeEvent<HTMLInputElement>) {
        let levels = allLevels;
        // Filter for main/all
        if (e.target.checked) {
            setMainOrExtended("all");
        } else {
            setMainOrExtended("main");
            levels = levels.filter(level => level.extra === false);
        }
        // Filter for demons/non-demons
        if (demonsOrNon === "demons") {
            levels = levels.filter(level => level.stars === 10);
        } else if (demonsOrNon === "non") {
            levels = levels.filter(level => level.stars < 10);
        }
        setDisplayedLevelsList(levels);
    }

    function handleDemonsOrNonChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setDemonsOrNon(e.target.value);
        let levels = allLevels;
        // Filter for main/all
        if (mainOrExtended === "main") {
            levels = levels.filter(level => level.extra === false);
        }
        // Filter for demons/non-demons
        if (e.target.value === "demons") {
            levels = levels.filter(level => level.stars === 10);
        } else if (e.target.value === "non") {
            levels = levels.filter(level => level.stars < 10);
        }
        setDisplayedLevelsList(levels);
    }

    return (
        <>
            <input
                type="checkbox"
                checked={mainOrExtended === "all"}
                onChange={handleMainOrExtendedChange}
            />
            <select value={demonsOrNon} onChange={handleDemonsOrNonChange}>
                <option value="demons">Demons Only</option>
                <option value="non">Non-Demons Only</option>
                <option value="every">Demons and Non-Demons</option>
            </select>
            <div className="flex flex-col items-center">
                {displayedLevelsList
                    .slice()
                    .sort((a, b) => a.id - b.id)
                    .map((level) => {
                    return <Level key={level.id} level={level} getData={fetchLevelData} />
                })}
            </div>
            {isDarkMode ? <p>dark on</p> : <p>dark off</p>}
        </>
    );
}
export default List;