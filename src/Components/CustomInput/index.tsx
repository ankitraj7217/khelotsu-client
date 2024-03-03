import React, { useState } from "react";
import "./CustomInput.scss";

interface CustomInputProps {
	label: string;
	inputVal: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
	label,
	inputVal,
	onInputChange
}) => {
	const [focused, setFocused] = useState<boolean>(false);

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		!inputVal && setFocused(false);
	};

	return (
		<div className={`custom-input ${focused ? "focused" : ""}`}>
			<input
				type="text"
				value={inputVal}
				onChange={onInputChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<label>{label}</label>
		</div>
	);
};

export default CustomInput;
