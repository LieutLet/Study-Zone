//import React from "react";

interface Props {
  name: string;
  style: string;
  handleClick: () => void;
}

const Button = ({ name, style, handleClick = () => {} }: Props) => {
  return (
    <button type="button" className={style} onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
