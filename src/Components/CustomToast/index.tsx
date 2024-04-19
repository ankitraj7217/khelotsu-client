import React, { FC, useCallback, useEffect, useState } from "react";
import { ICustomToastProps } from "../../Utils/customInterfaces";

import "./CustomToast.scss";

const CustomToast: FC<ICustomToastProps> = ({
  color,
  msg,
  setErrorMsg,
  isTransformAtParent = false,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [progressBarActive, setProgressBarActive] = useState(false);

  useEffect(() => {
    setShowToast(true);

    const timer1 = setTimeout(() => {
      setShowToast(false);
    }, 2500);

    const timer2 = setTimeout(() => {
      setErrorMsg("");
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [color, msg]);

  useEffect(() => {
    showToast && setProgressBarActive(true);
  }, [showToast]);

  const _onClose = () => {
    setShowToast(false);
  };

  const calculateValue = useCallback(() => {
    const innerHeight = window.innerHeight;
    let val = -10;
    if (innerHeight >= 1000) {
      val = -9;
    } else if (innerHeight >= 940) {
      val = -8;
    } else if (innerHeight >= 900) {
      val = -7;
    } else if (innerHeight >= 850) {
      val = -5.5;
    } else {
      val = -5;
    }

    return [val.toString(), (val - 10).toString()];
  }, [window.innerHeight]);

  const showBtmValue = calculateValue();

  return (
    <section
      className={`khelotsu-custom-toast khelotsu-custom-toast${
        showToast ? "-show" : ""
      }`}
      style={{
        borderColor: color,
        bottom: isTransformAtParent
          ? showToast
            ? `${showBtmValue[0]}rem`
            : `${showBtmValue[1]}rem`
          : "",
      }}
    >
      {msg}
      <div className={`progress ${progressBarActive ? "active" : ""}`}>
        <div
          className="progress-slider"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div className="khelotsu-custom-toast-end" onClick={_onClose}>
        &times;
      </div>
    </section>
  );
};

export default CustomToast;
