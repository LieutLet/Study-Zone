// import React from "react";

interface Props {
  cardName?: string; //Optional for now
}

const WebCard = ({ cardName = "Web Card" }: Props) => {
  return (
    <div className="bg-studyellow text-slate-950 flex">
      <div className="basis-1/2">{cardName}</div>
      <button type="button" className="basis-1/4">
        Edit
      </button>
      <button type="button" className="basis-1/4">
        Delete
      </button>
    </div>
  );
};

export default WebCard;
