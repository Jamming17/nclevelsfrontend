import { useState } from "react";

import Level from "../components/Level";
import { levelInterfaceTypeGuard, EMPTY_LEVEL, type LevelInterface } from "../data/LevelData";
import { apiRequest } from "../apiClient";


function List() {

    const [ displayedLevelsList, setDisplayedLevelsList ] = useState<LevelInterface[]>([]);

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
            {/*levelVisible && 
                <div>
                    <Level level={displayedLevel} getData={getLevelHandler} />
                </div>
            }
            <div>
                <input type="text" className="m-3 border border-black bg-gray-200" onChange={(e) => {setInputVal(e.target.value)}}/>
                <button className="cursor-pointer border border-red-700 rounded" onClick={fetchLevelData}>Click Me!</button>
            </div>*/}
            <br className="py-16"/>
            <button className="cursor-pointer border border-red-700 rounded" onClick={getNCLevelList}>Get the list!</button>
            {displayedLevelsList.map((level, index) => {
                return <Level key={index} level={level} getData={fetchLevelData} />
            })}

        {/*
        <div className="flex flex-col">
            {LevelsList.map(level => (
                <Level
                    key={level.id}
                    level={level}
                />
            ))}
            <button className="cursor-pointer border border-red-700 rounded" onClick={myApiTestFunc}>Click Me to Test!</button>
        </div>*/}
        </>
    )
}
export default List;