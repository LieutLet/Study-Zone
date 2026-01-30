//import React from "react";
import { handleAddWebsite } from "../background";

// const handleEditWebsite = () => {
//   console.log("edit website clicked!");
// };

// const handleDeleteWebsite = () => {
//   console.log("delete button clicked");
// };

console.log("App.tsx has been reached");
const App = () => {
  return (
    <div>
      <button type="button" onClick={handleAddWebsite}>
        Add Website
      </button>
    </div>
  );
};

export default App;
