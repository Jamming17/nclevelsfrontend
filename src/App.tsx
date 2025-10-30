import List from "./pages/List";

function App() {
  return (
    <>
        {/* Nav Bar */}
        <div className="text-3xl font-bold p-4 flex flex-row justify-between">
            <p className="flex">Nine Circles Level List</p>
            <div className="underline flex flex-row">
                <p className="flex px-3">Main List</p>
                <p className="flex px-3">Extras</p>
            </div>
        </div>

        <div className="min-h-screen bg-gradient-to-b from-white to-pink-200">
            <List />
        </div>
    </>
  )
}

export default App;