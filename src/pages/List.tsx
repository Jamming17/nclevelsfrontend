import { useState } from "react";

import Level from "../components/Level";
import { levelInterfaceTypeGuard, type LevelInterface } from "../data/Level";
import { apiRequest } from "../apiClient";


function List() {

    const [ displayedLevel, setDisplayedLevel ] = useState({ id: 0, name: "Loading", creator: "Loading", difficulty: "Loading", rating: "Loading", stars: 0, coin_count: 0, coins_rated: false });
    const [ levelVisible, setLevelVisible ] = useState(false);

    const [ inputVal, setInputVal ] = useState("s");

    async function myApiTestFunc(): Promise<void> {
        try {
            const data = await apiRequest("getLevelId", {
                params: {
                    "str": inputVal,
                }
            });
            console.log("Data successfully retrieved:", data);

            const dataObj = typeof data === "string" ? JSON.parse(data) : data;
            if (dataObj && typeof dataObj === "object" && "success" in dataObj && "data" in dataObj) {
                if (dataObj.success === true && levelInterfaceTypeGuard(dataObj.data)) {
                    setDisplayedLevel(dataObj.data);
                } else {
                    console.error("Data in wrong format:", dataObj.data)
                }
            } else {
                console.error("Data in wrong format.");
            }
            setLevelVisible(true);
        } catch (err) {
            console.error("Failed to fetch:", err)
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