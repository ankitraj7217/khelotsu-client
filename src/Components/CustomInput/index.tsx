import React, { forwardRef, useState } from "react";
import "./CustomInput.scss";

interface CustomInputProps {
  label?: string;
  inputVal?: string;
  type?: string
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props: CustomInputProps, ref) => {
    const { label, inputVal, type, onInputChange } = props;

    return (

      <div className="custom-input">
        <input
          type={type ? type : "text"}
          required
          value={inputVal}
          onChange={onInputChange}
          ref={ref}
        />
        <label>{label}</label>
      </div>
    );
  }
);

export default CustomInput;
