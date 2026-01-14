//import React from "react";

interface Props {
  name: string;
  style: string;
}

const Button = ({ name, style }: Props) => {
  return (
    <button type="button" className={style}>
      {name}
    </button>
  );
};

export default Button;
