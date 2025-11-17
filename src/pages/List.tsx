import { useState, useEffect, useContext } from "react";

import Level from "../components/Level";
import { levelInterfaceTypeGuard, EMPTY_LEVEL, DIFFICULTY_ARRAY, type LevelInterface } from "../data/LevelData";
import { apiRequest } from "../apiClient";
import { SettingsContext } from "../context/SettingsContext";


function List() {

    const { isDarkMode, toggleDarkMode } = useContext(SettingsContext);
    const [ allLevels, setAllLevels ] = useState<LevelInterface[]>([]);
    const [ displayedLevelsList, setDisplayedLevelsList ] = useState<LevelInterface[]>([]);

    const [ searchQuery, setSearchQuery ] = useState<string>("");
    const [ mainOrExtended, setMainOrExtended ] = useState<string>("main"); // main | extended | all
    const [ demonsOrNon, setDemonsOrNon ] = useState<string>("demons"); // demons | non | every
    const [ sortMode, setSortMode ] = useState<string>("byId"); // byId | byDifficulty

    const [ sortMenuOpen, setSortMenuOpen ] = useState(false);
    const [ filterMenuOpen, setFilterMenuOpen ] = useState(false);

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

    function handleSortFuncChange(value: string): void {
        setSortMode(value);
        if (value === "byDifficulty") { //Must be demons only for difficulty filter
            setDemonsOrNon("demons");
        }
    }

    function handleMainOrExtendedChange(): void {
        let levels = allLevels;
        // Filter for main/all
        if (mainOrExtended === "main") {
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

        // Filter for search query
        levels.filter(level => level.name.includes(searchQuery));

        setDisplayedLevelsList(levels);
    }

    function handleDemonsOrNonChange(e: React.ChangeEvent<HTMLSelectElement>): void {
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

        // Filter for search query
        levels.filter(level => level.name.includes(searchQuery));

        setDisplayedLevelsList(levels);
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
        let levels = allLevels;
        // Filter for main/all
        if (mainOrExtended === "main") {
            levels = levels.filter(level => level.extra === false);
        }
        // Filter for demons/non-demons
        if (demonsOrNon === "demons") {
            levels = levels.filter(level => level.stars === 10);
        } else if (demonsOrNon === "non") {
            levels = levels.filter(level => level.stars < 10);
        }

        // Filter for search query
        levels = levels.filter(level => level.name.toLowerCase().includes(e.target.value.toLowerCase()));
        
        setDisplayedLevelsList(levels);
        //setDisplayedLevelsList((prev) => {return prev.filter(level => level.name.includes(e.target.value))});
    }

    return (
        <>
            {/* Search Bar */}
            <div className="bg-gray-800 rounded-xl mx-auto px-3 my-3 py-2 w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <p className="font-bold text-2xl mb-2 ml-1">Search</p>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="bg-gray-900 border-2 border-gray-700 px-3 py-2 mb-2 rounded-xl items-center w-full"
                />
            </div>

            {/* Sorting */}
            <div className="bg-gray-800 rounded-xl mx-auto px-3 my-3 pt-2 pb-1 w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <div className="cursor-pointer flex flex-row w-full" onClick={(e) => {e.stopPropagation(); setSortMenuOpen(!sortMenuOpen)}}>
                    <p className="font-bold text-2xl mb-2 ml-1">Sort</p>
                    <p className={`ml-auto mr-4 mt-[5px] ${sortMenuOpen && "mt-[9px]"}`}>{sortMenuOpen ? "⌃" : "⌄"}</p>
                </div>
                <div className={`transition-all duration-400 overflow-hidden ${sortMenuOpen ? "max-h-96 mt-2 mb-1" : "max-h-0"}`}>
                    <div className="grid grid-cols-2 gap-2 text-xl mb-2">
                        <div className="flex flex-row bg-gray-900 p-3 rounded-xl items-center cursor-pointer" onClick={() => handleSortFuncChange("byId")}>
                            <p>By Level ID</p>
                            <input
                                type="checkbox"
                                checked={sortMode === "byId"}
                                className="ml-auto mr-4"
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>
                        <div className="flex flex-row bg-gray-900 p-3 rounded-xl items-center cursor-pointer" onClick={() => handleSortFuncChange("byDifficulty")}>
                            <p>By Difficulty</p>
                            <input
                                type="checkbox"
                                checked={sortMode === "byDifficulty"}
                                className="ml-auto mr-4"
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800 rounded-xl mx-auto px-3 my-3 pt-2 pb-1 w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <div className="cursor-pointer flex flex-row w-full" onClick={(e) => {e.stopPropagation(); setFilterMenuOpen(!filterMenuOpen)}}>
                    <p className="font-bold text-2xl mb-2 ml-1">Filters</p>
                    <p className={`ml-auto mr-4 mt-[5px] ${filterMenuOpen && "mt-[9px]"}`}>{filterMenuOpen ? "⌃" : "⌄"}</p>
                </div>
                <div className={`transition-all duration-400 overflow-hidden ${filterMenuOpen ? "max-h-96 mt-2 mb-1" : "max-h-0"}`}>
                    <div className="grid grid-cols-2 gap-2 text-xl mb-2">
                        {/* Extras */}
                        <div className="flex flex-row bg-gray-900 p-3 rounded-xl items-center overflow-hidden cursor-pointer" onClick={handleMainOrExtendedChange}>
                            <p className="flex text-xl mr-5">Show Extras</p>
                            <input
                                type="checkbox"
                                checked={mainOrExtended === "all"}
                                className="ml-auto mr-4"
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>
                        {/* Difficulty */}
                        <div className={`flex flex-row bg-gray-900 p-3 rounded-xl items-center overflow-hidden ${sortMode === "byDifficulty" && "opacity-60 text-gray-600"}`}>
                            <p className="text-xl mr-3">Difficulty:</p>
                            <select className="text-xl w-full" style={{appearance: "none"}} value={demonsOrNon} onChange={handleDemonsOrNonChange} disabled={sortMode === "byDifficulty"}>
                                <option value="demons">Demons Only</option>
                                <option value="non">Non-Demons Only</option>
                                <option value="every">Demons and Non-Demons</option>
                            </select>
                            <p className="text-lg ml-auto mr-4 -mt-1">⌄</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level List */}
            <div className="flex flex-col items-center">
                {displayedLevelsList
                    .slice()
                    .sort((a, b) => sortMode === "byId"
                        ? a.id - b.id
                        : (() => {
                            const aIndex = DIFFICULTY_ARRAY.indexOf(a.id);
                            const bIndex = DIFFICULTY_ARRAY.indexOf(b.id);
                            return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
                        })())
                    .map((level, index) => {
                    return <Level key={level.id} index={(index + 1).toString()} showNumber={searchQuery === "" && sortMode === "byDifficulty" ? true : false } level={level} getData={fetchLevelData} />
                })}
            </div>
            {isDarkMode ? <p>dark on</p> : <p>dark off</p>}
        </>
    );
}
export default List;