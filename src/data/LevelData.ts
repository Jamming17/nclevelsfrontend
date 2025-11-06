export interface LevelInterface {
    id: number;
    name: string;
    creator: string;
    difficulty: string;
    stars: number;
    rating: string;
    coin_count: number;
    coins_rated: boolean;
    length: string;
}

export const EMPTY_LEVEL: LevelInterface = {
    id: -1,
    name: "",
    creator: "",
    difficulty: "",
    stars: -1,
    rating: "",
    coin_count: 0,
    coins_rated: false,
    length: "Tiny"
}

export function levelInterfaceTypeGuard(obj: any): obj is LevelInterface {
    return (
        obj &&
        !isNaN(Number(obj.id)) &&
        typeof obj.name === "string" &&
        typeof obj.creator === "string" &&
        typeof obj.difficulty === "string" &&
        !isNaN(Number(obj.stars)) &&
        typeof obj.rating === "string" &&
        !isNaN(Number(obj.coin_count)) &&
        typeof obj.coins_rated === "boolean" &&
        typeof obj.length === "string"
    );
}

export const LevelsList: LevelInterface[] = [
    {
        id: 4284013,
        name: "Nine Circles",
        creator: "Zobros",
        difficulty: "Hard Demon",
        stars: 10,
        rating: "Featured",
        coin_count: 3,
        coins_rated: true,
        length: "Tiny"
    },
    {
        id: 5310094,
        name: "Fairydust",
        creator: "mkComic",
        difficulty: "Hard Demon",
        stars: 10,
        rating: "Featured",
        coin_count: 0,
        coins_rated: true,
        length: "Tiny"
    },
    {
        id: 5376097,
        name: "Ethereal Circles",
        creator: "OverZero",
        difficulty: "Medium Demon",
        stars: 10,
        rating: "Featured",
        coin_count: 3,
        coins_rated: false,
        length: "Tiny"
    },
    {
        id: 6664095,
        name: "The Realistic",
        creator: "Softable",
        difficulty: "Medium Demon",
        stars: 10,
        rating: "Featured",
        coin_count: 0,
        coins_rated: true,
        length: "Tiny"
    }
]