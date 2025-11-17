import { useState } from "react";

import Tag from "./Tag";
import type { LevelInterface } from "../data/LevelData";

interface LevelProps {
    level: LevelInterface;
    index: string;
    showNumber: boolean;
    getData: (levelId: string) => Promise<LevelInterface>; 
}

function Level({level, index, showNumber, getData} : LevelProps) {

    const [currentLevel, setCurrentLevel] = useState(level);
    const [imgSrc, setImgSrc] = useState(`https://levelthumbs.prevter.me/thumbnail/${currentLevel.id}/small`);

    async function reloadLevelData(): Promise<void> {
        const newLevel = await getData(currentLevel.id.toString());
        setCurrentLevel(newLevel);
        setImgSrc(`https://levelthumbs.prevter.me/thumbnail/${currentLevel.id}/small`);
    }

    return (
        <div className="flex flex-row rounded-xl bg-gray-800 border-2 border-gray-500 mx-10 my-3 w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] h-[200px]">
            {/* Level Thumbnail */}
            <div>
                <img 
                    className="rounded-l-xl md:w-auto max-w-[350px] w-[230px] h-full object-cover mr-2"
                    src={imgSrc}
                    alt={`Thumbnail for ${currentLevel.name}`}
                    onError={() => {
                        const fallback = `/assets/level-thumbnails/${currentLevel.name.toLowerCase().replace(/\s+/g, "")}.png`;
                        if (imgSrc !== fallback) {
                            setImgSrc(fallback);
                        }
                    }}
                />
            </div>

            {/* Difficulty Face + Stars/Moons Awarded + Coins */}
            <div className="flex flex-col items-center max-w-[80px] py-1">
                <img
                    className={currentLevel.rating === "Star Rate" && !currentLevel.difficulty.includes("demon") ? "max-w-[73px] px-[3.5px]" :currentLevel.rating === "Star Rate" ? "max-w-[76px] px-[2px]" : (currentLevel.rating === "Featured" ? "max-w-[78px] px-[1px]" : "")}
                    src={`/assets/difficulties/${currentLevel.difficulty.toLowerCase().replace(/\s+/g,"")}-${currentLevel.rating.toLocaleLowerCase().replace(/\s+/g,"")}.png`}
                    alt={`GD Difficulty face: ${currentLevel.difficulty} with rating ${currentLevel.rating}`}
                />
                <p className="text-center leading-none text-xl" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>{currentLevel.difficulty}</p>
                <div className="flex flex-row items-center mb-1">
                    <p className="leading-none text-2xl mr-[3px] mt-[6px]" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>{currentLevel.stars}</p>
                    {currentLevel.length == "Plat." ?
                        <img className="max-h-[20px] mt-[1px]" src="/assets/stats/moon.png" alt="moon" />
                        :
                        <img className="max-h-[25px]"  src="/assets/stats/star.png" alt="star" />
                    }
                </div>
                <div> {/* Coins */}
                    {currentLevel.coins_rated ? (
                        currentLevel.coin_count === 1 ? (
                            <img className="max-h-[25px]" src="/assets/stats/silvercoin.png" alt="silver coin" />
                        ) : (currentLevel.coin_count === 2 ? (
                            <div className="flex flex-row">
                                <img className="max-h-[25px]" src="/assets/stats/silvercoin.png" alt="silver coin" />
                                <img className="max-h-[25px] -ml-[7px]" src="/assets/stats/silvercoin.png" alt="silver coin" />
                            </div>
                            ) : (currentLevel.coin_count === 3 && (
                                <div className="flex flex-row">
                                <img className="max-h-[25px]" src="/assets/stats/silvercoin.png" alt="silver coin" />
                                <img className="max-h-[25px] -ml-[7px]" src="/assets/stats/silvercoin.png" alt="silver coin" />
                                <img className="max-h-[25px] -ml-[7px]" src="/assets/stats/silvercoin.png" alt="silver coin" />
                            </div>
                            ))
                        )
                    ) : (
                        currentLevel.coin_count === 1 ? (
                            <img className="max-h-[25px]" src="/assets/stats/bronzecoin.png" alt="bronze coin" />
                        ) : (currentLevel.coin_count === 2 ? (
                            <div className="flex flex-row">
                                <img className="max-h-[25px]" src="/assets/stats/bronzecoin.png" alt="bronze coin" />
                                <img className="max-h-[25px] -ml-[7px]" src="/assets/stats/bronzecoin.png" alt="bronze coin" />
                            </div>
                            ) : (currentLevel.coin_count === 3 && (
                                <div className="flex flex-row">
                                <img className="max-h-[25px]" src="/assets/stats/bronzecoin.png" alt="bronze coin" />
                                <img className="max-h-[25px] -ml-[7px]" src="/assets/stats/bronzecoin.png" alt="bronze coin" />
                                <img className="max-h-[25px] -ml-[7px]" src="/assets/stats/bronzecoin.png" alt="bronze coin" />
                            </div>
                            ))
                        )
                    )}
                </div>
            </div>

            <div className="flex flex-col w-full">
                {/* Level Details */}
                <div className="m-3">
                    <div className="flex flex-row">
                        <p className="font-bold text-3xl mr-auto">{showNumber && `#${index} - `}{currentLevel.name}</p>
                        <p className="italic text-xl text-gray-400">#{currentLevel.id}</p>
                    </div>
                    <p className="font-bold text-md text-gray-300">by {currentLevel.creator}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-row ml-3 gap-2">
                    {currentLevel.extra === true && <Tag colour="pink" text="Extra" />}
                    <Tag colour="blue" text={currentLevel.length} />
                    {currentLevel.tags.map((tag, index) => {
                        return <Tag key={index} colour="yellow" text={tag} /> //Index = key is fine as order doesn't matter
                    })}
                </div>
            </div>


            {/*<button className="p-5 cursor-pointer border border-red-700 rounded-xl" onClick={reloadLevelData}>h</button>*/}
        </div>
    );
}
export default Level;