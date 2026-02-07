import { useState } from "react";
import { handleAddWebsite } from "../background";
import { handleClear } from "../background";
import WebCard from "../Components/WebCard";

const siteName: string = "hbo";
let domainName: string = "https://play.hbomax.com";
domainName = "google.com/";

console.log("App.tsx has been reached");
const App = () => {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className="flex flex-col text-center px-8 py-4">
      <h1 className="text-xl font-semibold">Welcome to your Study-Zone</h1>
      <p className="mb-2">
        Click the + icon to add a website to your Study-Zone, any other website
        that is not in your study-zone will not be accessible while this
        extension is enabled.
      </p>
      <WebCard />
      <button
        className="bg-blue-500 text-white-950 rounded-md p-2 mx-4 my-3"
        type="button"
        onClick={() => {
          handleAddWebsite(siteName, domainName);
          setOpenPopup(true);
        }}
      >
        +
      </button>

      {openPopup && (
        <div className="bg-stone-300 text-slate-950 flex flex-col justify-center rounded-md p-2 mx-20 my-3">
          <form className="flex flex-col p-2 mx-4 my-3">
            <input
              type="text"
              className="bg-stone-200 rounded-sm text-slate-600 italic text-center p-1 my-2 shadow-sm"
              id="webName"
              defaultValue="Google"
            />
            <input
              type="text"
              className="bg-stone-200 rounded-sm text-slate-600 italic text-center p-1 my-2 shadow-sm"
              id="domain"
              defaultValue="google.com/"
            />
          </form>
          <button
            type="button"
            className="bg-red-500 text-slate-950 rounded-md p-2 mx-20 my-3 shadow-md"
            onClick={() => {
              setOpenPopup(false);
              handleAddWebsite();
            }}
          >
            SAVE
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white-950 rounded-md p-2 mx-20 my-3 shadow-md"
            onClick={() => setOpenPopup(false)}
          >
            CANCEL
          </button>
        </div>
      )}

      <button
        className="bg-red-500 text-slate-950 rounded-md p-2 mx-4 my-3"
        type="button"
        onClick={handleClear}
      >
        Clear List
      </button>
    </div>
  );
};

export default App;
