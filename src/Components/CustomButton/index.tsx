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
      style={{
        justifyContent: isLoader ? "space-between" : "center",
        padding: isLoader ? "8px" : "8px 15px",
      }}
    >
      {txt}
      {isLoader ? (
        <div className="loader" style={{marginLeft: "0.25rem"}}>
          <ModalLoader loaderHt="1rem" loaderWd="1rem" />
        </div>
      ) : (
        <></>
      )}
    </button>
  );
};

export default CustomButton;
