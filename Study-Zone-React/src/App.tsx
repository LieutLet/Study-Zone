//import React from "react";
import Button from "./Button";

const handleEditWebsite = () => {
  console.log("edit website clicked!");
};

const handleDeleteWebsite = () => {
  console.log("delete button clicked");
};

const handleAddWebsite = () => {
  console.log("add button has been clicked";)
}

const App = () => {
  return (
    <div>
      <button type="button" className={style} onClick = {handleAddWebsite}>
        {name}
      </button>
    </div>
  );
};

export default App;
