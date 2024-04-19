import React, { FC } from "react";

import "./ModalLoader.scss";

interface IModalLoader {
  loaderHt?: string;
  loaderWd?: string;
}

const ModalLoader: FC<IModalLoader> = ({ loaderHt, loaderWd }) => {
  return (
    <section className="modal-loader">
      <div
        className="loading"
        style={{ height: loaderHt || "8rem", width: loaderWd || "8rem" }}
      ></div>
    </section>
  );
};

export default ModalLoader;
