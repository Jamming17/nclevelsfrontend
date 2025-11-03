import { useState } from "react";

import Level from "../components/Level";
import { levelInterfaceTypeGuard, type LevelInterface } from "../data/Level";
import { apiRequest } from "../apiClient";


function List() {

    const [ displayedLevel, setDisplayedLevel ] = useState({ id: 0, name: "Loading", creator: "Loading", difficulty: "Loading", rating: "Loading", stars: 0, coin_count: 0, coins_rated: false });
    const [ displayedLevelsList, setDisplayedLevelsList ] = useState<LevelInterface[]>([]);
    const [ levelVisible, setLevelVisible ] = useState(false);

    const [ inputVal, setInputVal ] = useState("s");

    async function myApiTestFunc(): Promise<void> {
        try {
            const data = await apiRequest("boomlings/getLevelId", {
                params: {
                    "str": inputVal,
                }
            });
            console.log("Level data successfully retrieved:", data);

            const dataObj = typeof data === "string" ? JSON.parse(data) : data;
            if (dataObj && typeof dataObj === "object" && "success" in dataObj && "data" in dataObj) {
                if (dataObj.success === true && levelInterfaceTypeGuard(dataObj.data)) {
                    setDisplayedLevel(dataObj.data);
                } else {
                    console.error("Data in wrong format:", dataObj.data);
                }
            } else {
                console.error("Data in wrong format.");
            }
            setLevelVisible(true);
        } catch (err) {
            console.error("Failed to fetch levels:", err)
        }
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
            {levelVisible && 
                <div>
                    <Level level={displayedLevel} />
                </div>
            }
            <div>
                <input type="text" className="m-3 border border-black bg-gray-200" onChange={(e) => {setInputVal(e.target.value)}}/>
                <button className="cursor-pointer border border-red-700 rounded" onClick={myApiTestFunc}>Click Me!</button>
            </div>
            <br className="py-16"/>
            <button className="cursor-pointer border border-red-700 rounded" onClick={getNCLevelList}>Get the list!</button>
            {displayedLevelsList.map((level, index) => {
                return <Level key={index} level={level} />
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