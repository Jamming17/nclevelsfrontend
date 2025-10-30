import Level from "../components/Level";
import { LevelsList } from "../data/Level";
import { apiRequest } from "../apiClient";


function List() {

    async function myApiTestFunc(): Promise<void> {
        try {
            const data = await apiRequest("getLevelId", {
                params: {
                    //"str": "4284013",
                    "str": "nine circles",
                    "star": 1,
                    "type": 0
                }
            });
            console.log("Data successfully retrieved:", data);
        } catch (err) {
            console.error("Failed to fetch:", err)
        }
    }

    return (
        <div className="flex flex-col">
            {LevelsList.map(level => (
                <Level
                    key={level.id}
                    level={level}
                />
            ))}
            <button className="cursor-pointer border border-red-700 rounded" onClick={myApiTestFunc}>Click Me to Test!</button>
        </div>
    )
}
export default List;