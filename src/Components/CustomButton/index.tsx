import React, { FC, MouseEvent } from "react";
import "./CustomButton.scss";

interface ICustomButtonProps {
  txt: string;
  onClick: (event: any) => void;
}

const CustomButton: FC<ICustomButtonProps> = ({ txt, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {txt}
      <span className="ripple"></span>
    </button>
  );
};

export default CustomButton;
