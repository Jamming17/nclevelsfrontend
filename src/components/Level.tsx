import { useState } from "react";

import type { LevelInterface } from "../data/LevelData";

interface LevelProps {
    level: LevelInterface;
    getData: (levelId: string) => Promise<LevelInterface>; 
}

function Level({level, getData} : LevelProps) {

    const [currentLevel, setCurrentLevel] = useState(level);

    async function reloadLevelData(): Promise<void> {
        const newLevel = await getData(currentLevel.id.toString());
        setCurrentLevel(newLevel);
    }

    return (
        <div className="mb-4 flex flex-col">
            <p className="flex">ID:{currentLevel.id}</p>
            <p className="flex">{currentLevel.name} by {currentLevel.creator}</p>
            <p className="flex">{currentLevel.difficulty} - {currentLevel.stars} ({currentLevel.rating})</p>
            <p className="flex">{currentLevel.coin_count} Coins ({currentLevel.coins_rated ? "Silver" : "Bronze"})</p>
            <button className="border border-blue-700 rounded cursor-pointer" onClick={reloadLevelData}>View More Info</button>
        </div>
    )
}
export default Level;