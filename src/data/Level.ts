export type LevelType = {
    id: number;
    name: string;
    creator: string;
    difficulty: string;
    rating: string;
    coin_count: number;
    coins_rated: boolean;
}

export const LevelsList: LevelType[] = [
    {
        id: 4284013,
        name: "Nine Circles",
        creator: "Zobros",
        difficulty: "Hard Demon",
        rating: "Featured",
        coin_count: 3,
        coins_rated: true
    },
    {
        id: 5310094,
        name: "Fairydust",
        creator: "mkComic",
        difficulty: "Hard Demon",
        rating: "Featured",
        coin_count: 0,
        coins_rated: true
    },
    {
        id: 5376097,
        name: "Ethereal Circles",
        creator: "OverZero",
        difficulty: "Medium Demon",
        rating: "Featured",
        coin_count: 3,
        coins_rated: false
    },
    {
        id: 6664095,
        name: "The Realistic",
        creator: "Softable",
        difficulty: "Medium Demon",
        rating: "Featured",
        coin_count: 0,
        coins_rated: true
    }
]