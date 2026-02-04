//import React from "react";
import { handleAddWebsite } from "../background";
import { handleClear } from "../background";

// const handleEditWebsite = () => {
//   console.log("edit website clicked!");
// };

// const handleDeleteWebsite = () => {
//   console.log("delete button clicked");
// };

const siteName: string = "hbo";
let domainName: string = "https://play.hbomax.com";
domainName = "google.com/";

console.log("App.tsx has been reached");
const App = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          handleAddWebsite(siteName, domainName);
        }}
      >
        Add Website
      </button>
      <button type="button" onClick={handleClear}>
        Clear List
      </button>
    </div>
  );
};

export default App;
