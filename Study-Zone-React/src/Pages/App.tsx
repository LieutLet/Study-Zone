import { useState } from "react";
import { handleAddWebsite } from "../background";
import { handleClear } from "../background";
import { webMap } from "../Map";
import WebCard from "../Components/WebCard";

// ********************************************************************************************** //
// Purpose: get the information from the form                                                     //
// Precondition: new information is entered into the form                                         //
// Postcondition: the information is gotten                                                       //
// ********************************************************************************************** //
// The App component owns re-rendering state, so `isActive` can increment a local counter
// and React will rebuild the card list when called.

console.log("App.tsx has been reached");

const App = () => {
  console.log(`webmap: ${webMap}`);
  const [, setRefreshCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  const isActive = () => {
    // Called by WebCard on delete/edit flow; this triggers rerender of the list.
    //console.log("isActive called for", key);
    setRefreshCount((v) => v + 1);
  };

  const getDomInfo = () => {
    const inputName: any = document.getElementById("webName");
    const inputSite: any = document.getElementById("domain");

    handleAddWebsite(inputName.value, inputSite.value);
    setRefreshCount((v) => v + 1);
  };

  const cardComponent = Array.from(webMap.entries()).map(([key, value]) => (
    <WebCard key={key} cardName={key} cardDomain={value} isActive={isActive} />
  ));

  console.log("App.tsx has been reached");

  return (
    <div className="flex flex-col text-center px-8 py-4">
      <h1 className="text-xl font-semibold">Welcome to your Study-Zone</h1>
      <p className="mb-2">
        Click the + icon to add a website to your Study-Zone, any other website
        that is not in your study-zone will not be accessible while this
        extension is enabled.
      </p>
      <ul>{cardComponent}</ul>
      <button
        className="bg-blue-500 text-white-950 rounded-md p-2 mx-4 my-3"
        type="button"
        onClick={() => {
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
              placeholder="Google"
            />
            <input
              type="text"
              className="bg-stone-200 rounded-sm text-slate-600 italic text-center p-1 my-2 shadow-sm"
              id="domain"
              placeholder="google.com/"
            />
          </form>
          <button
            type="button"
            className="bg-red-500 text-slate-950 rounded-md p-2 mx-20 my-3 shadow-md"
            onClick={() => {
              getDomInfo();
              setOpenPopup(false);
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
        onClick={() => {
          handleClear();
          isActive();
        }}
      >
        Clear List
      </button>
    </div>
  );
};

export default App;
