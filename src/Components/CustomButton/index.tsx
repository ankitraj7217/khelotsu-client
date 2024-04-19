import React, { FC } from "react";
import "./CustomButton.scss";
import ModalLoader from "../CustomLoader/ModalLoader";

interface ICustomButtonProps {
  txt: string;
  isLoader?: boolean;
  onClick: (event: any) => void;
}

const CustomButton: FC<ICustomButtonProps> = ({
  txt,
  isLoader = false,
  onClick,
}) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      style={{ justifyContent: isLoader ? "space-between" : "center" }}
    >
      {txt}
      {isLoader ? (
        <div className="loader">
          <ModalLoader loaderHt="1rem" loaderWd="1rem" />
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default CustomButton;
