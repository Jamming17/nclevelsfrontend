import type { LevelType } from "../data/Level";

interface LevelProps {
    level: LevelType;
}

function Level({level} : LevelProps) {
    return (
        <div className="mb-4 flex flex-col">
            <p className="flex">ID:{level.id}</p>
            <p className="flex">{level.name} by {level.creator}</p>
            <p className="flex">{level.difficulty} ({level.rating})</p>
            <p className="flex">{level.coin_count} Coins ({level.coins_rated ? "Silver" : "Bronze"})</p>
        </div>
    )
}
export default Level;