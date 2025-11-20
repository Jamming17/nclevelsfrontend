import { useState, useEffect } from "react";

import Tag from "./Tag";
import type { LevelInterface } from "../data/LevelData";

interface LevelProps {
    level: LevelInterface;
    index: string;
    showNumber: boolean;
    isLevelBeingViewed: boolean;
    viewMore: (levelId: string) => Promise<LevelInterface>; 
    handleViewMoreLevelId: (levelId: number) => void;
}

function Level({level, index, showNumber, isLevelBeingViewed, viewMore, handleViewMoreLevelId} : LevelProps) {

    const [ currentLevel, setCurrentLevel ] = useState(level);
    const [ imgSrc, setImgSrc ] = useState(`https://levelthumbs.prevter.me/thumbnail/${currentLevel.id}/small`);

    const [ isLoading, setIsLoading ] = useState(false);

    async function reloadLevelData(): Promise<void> {
        console.log("Old Level: ", currentLevel);
        handleViewMoreLevelId(currentLevel.id);
        setIsLoading(true);
        const newLevel = await viewMore(currentLevel.id.toString());
        setIsLoading(false);
        setCurrentLevel(newLevel);
        console.log("New Level: ", newLevel);
        //setImgSrc(`https://levelthumbs.prevter.me/thumbnail/${currentLevel.id}/small`);
    }

    return (
        <div className={`mx-10 mt-3 w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px] h-[200px] ${isLevelBeingViewed ? "mb-26" : "mb-3"}`}>
            <div className={`flex flex-row bg-gray-800 border-2 border-gray-500 ${isLevelBeingViewed ? "rounded-t-xl" : "rounded-xl"}`}>
                {/* Level Thumbnail */}
                <div>
                    <img 
                        className={`md:w-auto max-w-[350px] w-[230px] h-full object-cover mr-2 ${isLevelBeingViewed ? "rounded-tl-xl" : "rounded-l-xl"}`}
                        src={currentLevel.thumbnailAvailable ? `https://levelthumbs.prevter.me/thumbnail/${currentLevel.id}/small` : `/assets/level-thumbnails/${currentLevel.name.toLowerCase().replace(/\s+/g, "")}.png`}
                        alt={`Thumbnail for ${currentLevel.name}`}
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

                    {/* View More */}
                    <div className="flex flex-row mt-auto ml-auto cursor-pointer group" onClick={isLevelBeingViewed ? (() => handleViewMoreLevelId(0)) : reloadLevelData}>
                        <p className="m-3 font-bold text-xl group-hover:underline">View More</p>
                        <p className={`mr-3 font-bold hover:no-underline ${isLevelBeingViewed ? "mt-4" : "mt-3"}`}>{isLevelBeingViewed ? "⌃" : "⌄"}</p>
                    </div>
                </div>


                {/*<button className="p-5 cursor-pointer border border-red-700 rounded-xl" onClick={() => console.log("Image src:", imgSrc)}>h</button>*/}
            </div>
            {isLevelBeingViewed &&

                <div className="flex flex-col bg-gray-900 border-b-2 border-x-2 border-gray-500 rounded-b-xl py-2">
                    {isLoading ? (
                        <p className="leading-none text-3xl my-5.5 mx-auto" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>Loading...</p>
                    ) : (
                        <>
                            <div className="flex flex-row justify-center">
                                {/* Downloads */}
                                <div className="flex flex-row items-center mx-10">
                                    <img className="max-h-[25px] mr-1"  src="/assets/stats/download.png" alt="downloads icon" />
                                    <p className="leading-none text-3xl mt-[3px]" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>{currentLevel.downloads.toLocaleString()}</p>
                                </div>

                                {/* Likes */}
                                <div className="flex flex-row items-center mx-10">
                                    <img className="max-h-[25px] mr-1"  src="/assets/stats/like.png" alt="thumbs up icon" />
                                    <p className="leading-none text-3xl mt-[3px]" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>{currentLevel.likes.toLocaleString()}</p>
                                </div>
                            </div>
                            {/* Song */}
                            <div className="flex flex-row justify-center items-center mt-2 gap-6">
                                <img className="max-h-[30px] -mr-4"  src="/assets/stats/song.png" alt="song disc icon" />
                                {currentLevel.songName === "error" && currentLevel.songCreator === "error" ? (
                                    <p className="leading-none text-3xl mt-[3px] text-red-600" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>Song is not allowed for use</p>
                                ) : (
                                    <>
                                        <p className={`leading-none text-3xl mt-[3px] ${currentLevel.songId == 0 && "text-[#27CEFA]"}`}  style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>{currentLevel.songName}</p>
                                        <p className="leading-none text-2xl mt-[3px]" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>by</p>
                                        <p className="leading-none text-3xl mt-[3px]" style={{ fontFamily: "Pusab", WebkitTextStroke: "1px black" }}>{currentLevel.songCreator}</p>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            }
        </div>
    );
}
export default Level;