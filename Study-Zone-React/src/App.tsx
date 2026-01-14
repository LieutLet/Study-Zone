//import React from "react";
import Button from "./Button";

const editWebsite = () => {
  console.log("edit website clicked!");
};

const deleteWebsite = () => {
  console.log("delete button clicked");
};

const App = () => {
  return (
    <div>
      <Button name="Button" style="bg-sky-500" />
    </div>
  );
};

export default App;
