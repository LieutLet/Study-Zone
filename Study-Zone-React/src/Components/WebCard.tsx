import { useState } from "react";
import { handleDelete, handleEdit } from "../background";

interface Props {
  cardName?: string; //Optional for now
  cardDomain?: string; //Optional for now
  isActive: () => void;
}

const WebCard = ({
  cardName = "Web Card",
  cardDomain = "www.website.com/",
  isActive,
}: Props) => {
  // ********************************************************************************************** //
  // Purpose: get the information from the form                                                     //
  // Precondition: new information is entered into the form                                         //
  // Postcondition: the information is gotten                                                       //
  // ********************************************************************************************** //
  const getDomInfo = () => {
    handleEdit(cardName, name, domain);
  };
  const [openPopup, setOpenPopup] = useState(false);

  const [name, setName] = useState(cardName);
  const [domain, setDomain] = useState(cardDomain);

  return (
    <div className="bg-studyellow text-slate-950 flex rounded-md p-2 mx-4 my-3">
      <div className="basis-1/2">{name}</div>
      <div className="basis-1/2">{domain}</div>
      <button
        type="button"
        className="basis-1/4"
        onClick={() => {
          setOpenPopup(true);
        }}
      >
        Edit
      </button>
      <button
        type="button"
        className="basis-1/4"
        onClick={() => {
          handleDelete(name);
          isActive();
        }}
      >
        Delete
      </button>
      {openPopup && (
        <div className="bg-stone-300 text-slate-950 flex flex-col justify-center rounded-md p-2 mx-20 my-3">
          <form className="flex flex-col p-2 mx-4 my-3">
            <input
              type="text"
              className="bg-stone-200 rounded-sm text-slate-600 italic text-center p-1 my-2 shadow-sm"
              id="webName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="bg-stone-200 rounded-sm text-slate-600 italic text-center p-1 my-2 shadow-sm"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
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
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            CANCEL
          </button>
        </div>
      )}
    </div>
  );
};

export default WebCard;
