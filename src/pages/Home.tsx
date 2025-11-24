import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            {/* Welcome */}
            <div className="bg-gray-800 border-2 border-gray-500 rounded-xl py-3 px-10 mt-5 mx-auto w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <h1 className="text-gray-300 text-3xl font-bold underline text-center pb-4">Welcome to the Nine Circles Level List</h1>
                <p>This website is a project developed by <span className="text-orange-400 font-bold">Jamming</span> to give a searchable and sortable list of all rated Nine Circles levels in Geometry Dash, including <span className="text-red-400 font-bold">demons</span> and <span className="text-green-400 font-bold">non-demons</span>.
                    By default, this list will display only demon-difficulty levels in release order, though this can be changed by playing with the <span className="text-gray-300 font-bold">Sort</span> and <span className="text-gray-300 font-bold">Filters</span> options.</p>
                <div className="text-blue-300 hover:text-blue-500 text-3xl font-bold underline text-center mt-6 mb-4 cursor-pointer"><Link to="/list">Click here to view the list!</Link></div>
            </div>

            {/* Level Criteria */}
            <div className="bg-gray-800 border-2 border-gray-500 rounded-xl py-3 px-10 mt-12 mx-auto w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <h1 className="text-gray-300 text-3xl font-bold underline text-center pb-3">Level Criteria</h1>
                <p>Some levels on this list are marked with an <span className="text-pink-400 font-bold">Extra</span> tag. This tag means that the level is not technically classified as a Nine Circles Level, but is included as a extra on the list as it contains Nine Circles theming, has the effect for too short a time or has a similar effect.</p>
                <p className="pt-6"><span className="text-red-400 font-bold">Demon</span> levels are classified by the <a href="https://www.ninecirclesdemonlist.com/home" title="Nine Circles Demonlist" className="text-blue-300 font-bold underline hover:text-blue-500">Nine Circles Demonlist</a> created by <span className="text-sky-300 font-bold">Zen0x50</span>.</p>
                <p className="pt-6"><span className="text-green-400 font-bold">Non-demon</span> levels are classified by the <a href="https://docs.google.com/spreadsheets/d/1mMcVk8vjIU9whpSyW8hrLaevnwnQoQ6eFaDfuIT3VHw/edit?gid=82389180#gid=82389180" title="Chronological Nine Circles Levels List" className="text-blue-300 font-bold underline hover:text-blue-500">Chronological Nine Circles Levels List</a> created by <span className="text-purple-400 font-bold">NothingIsScary</span>.</p>
                <p className="pt-6">In general, to count as a non-extra Nine Circles level, a level must meet the following criteria:</p>
                <ul className="list-disc pt-3 pl-10">
                    <li>At least <b>25%</b> of the level's gameplay must be the wave gamemode</li>
                    <li>At least <b>50%</b> of the level's wave gameplay must contain the Nine Circles "concentric flashing effect"</li>
                    <li>At least <b>50%</b> of the level's wave gameplay must contain diamond block structuring</li>
                    <li>The level must not begin with the wave gamemode</li>
                </ul>
                <p className="pt-6 mb-4">For levels classed as <span className="text-pink-400 font-bold">Extras</span> there is no particular criteria; the level just has to have a Nine Circles vibe. If you know of a level that you think should be on this list that isn't, please contact me with the contact information at the bottom of the page!</p>
            </div>

            {/* Credits */}
            <div className="bg-gray-800 border-2 border-gray-500 rounded-xl py-3 px-10 mt-12 mx-auto w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <h1 className="text-gray-300 text-3xl font-bold underline text-center pb-3">Credits</h1>
                <p className="font-bold">Website:</p>
                <ul className="list-disc pl-10">
                    <li>This website is developed and maintained by <span className="text-orange-400 font-bold">Jamming</span>.</li>
                    <li>The Nine Circles Levels database is hosted by <span className="text-red-400 font-bold">Tómas</span>.</li>
                </ul>

                <p className="font-bold pt-5">Level information:</p>
                <ul className="list-disc pl-10">
                    <li>Demon level classification and difficulty order was provided by <span className="text-sky-300 font-bold">Zen0x50</span>.</li>
                    <li>Non-demon level classification was provided by <span className="text-purple-400 font-bold">NothingIsScary</span>.</li>
                </ul>

                <p className="font-bold pt-5">Media:</p>
                <ul className="list-disc pl-10 mb-4">
                    <li>Difficulty icons and stats assets were taken from <span className="text-orange-300 font-bold">Colon</span>'s' GD Browser.</li>
                    <li>Level thumbnails were provided by
                        <span className="text-yellow-300 font-bold"> Level Thumbnails</span> (by <span className="text-yellow-200 font-bold">CDC</span>),
                        <span className="text-purple-400 font-bold"> NothingIsScary</span>,
                        <span className="text-green-200 font-bold"> Ag Silver</span>,
                        <span className="text-green-200 font-bold"> Akitsu</span>,
                        <span className="text-green-200 font-bold"> BlownMika</span>,
                        <span className="text-green-200 font-bold"> CLEANGD2828</span>,
                        <span className="text-green-200 font-bold"> CrackdownGD</span>,
                        <span className="text-green-200 font-bold"> GD Archives</span>,
                        <span className="text-green-200 font-bold"> Issanagay</span>,
                        <span className="text-green-200 font-bold"> Nonexistantbruh</span>,
                        <span className="text-green-200 font-bold"> NQDGaming</span>,
                        <span className="text-green-200 font-bold"> PlatformerGD</span>,
                        <span className="text-green-200 font-bold"> TadpoleTroll</span>,
                        <span className="text-green-200 font-bold"> trexhun</span> and
                        <span className="text-green-200 font-bold"> XKL</span>.
                    </li>
                    <li>The music disc icon was taken from the Jukebox mod for Geometry Dash by <span className="text-pink-300 font-bold">Fleym</span> and <span className="text-pink-300 font-bold">Flafy</span>.</li>
                </ul>
            </div>

            {/* Contact */}
            <div className="bg-gray-800 border-2 border-gray-500 rounded-xl py-3 px-10 mt-12 mx-auto w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
                <h1 className="text-gray-300 text-3xl font-bold underline text-center pb-3">Contact</h1>
                <p className="text-center">You can find me on various platforms listed below!</p>
                <div className="flex flex-row justify-center items-center my-5">
                    <img src="/assets/social-media/discord.png" alt="Discord Logo" className="h-15 w-15 mx-5" />
                    <p className="text-2xl font-bold text-gray-400">@Jamming17</p>                    
                </div>
                <div className="flex flex-row justify-center items-center my-5">
                    <div className="h-[3.4rem] w-[3.4rem] bg-white rounded-full -mr-[77px] -mb-[2px]" />
                    <img src="/assets/social-media/github.png" alt="GitHub Logo" className="h-15 w-15 mx-5" />
                    <a href="https://github.com/Jamming17" className="text-2xl font-bold underline text-gray-400">Jamming17</a>                    
                </div>
                <div className="flex flex-row justify-center items-center my-5">
                    <img src="/assets/social-media/geometry-dash.png" alt="Geometry Dash Logo" className="h-15 w-15 mx-5" />
                    <a href="https://gdbrowser.com/u/jamming" className="text-2xl font-bold underline text-gray-400">Jamming</a>                    
                </div>
            </div>
        </div>
    );
}
export default Home;