import React, { FC, useState } from "react";

import { ICustomModalProps } from "../../Utils/customInterfaces";
import CustomInput from "../CustomInput";
import useTranslation from "../../Utils/useTranslation";
import "./CustomModal.scss";

// onClose is for button -> Let's go Optional
// closeModal is for onCloseCallback
const CustomModal: FC<ICustomModalProps> = ({
	headerName,
	isOpen,
	onClose = (val: string = "") => {},
	closeModal,
	isInputNeeded = true,
	customStyle = {}
}) => {
	const [inputValue, setInputValue] = useState("");
	const t = useTranslation();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const _closeCustomModal = () => {
		closeModal();
	};

	const _customModalRedirect = () => {
		onClose(inputValue);
	};

	return (
		<>
			{isOpen && (
				<section className="custom-modal">
					<div
						className="custom-modal-content"
						aria-label="custom modal content"
						style={customStyle}>
						<div
							className="custom-modal-header"
							aria-label="custom modal header">
							<h2>{headerName}</h2>
							<button
								className="custom-modal-header-close-button"
								onClick={_closeCustomModal}>
								&times;
							</button>
						</div>
						{isInputNeeded && (
							<div className="custom-modal-body" aria-label="custom modal body">
								<div
									className="custom-modal-body-input"
									aria-label="custom modal body input">
									<CustomInput
										label="Enter room name: "
										inputVal={inputValue}
										onInputChange={handleInputChange}
									/>
								</div>
								<div className="custom-modal-body-submit">
									<button
										className="custom-modal-body-submit-btn"
										onClick={_customModalRedirect}>
										{t("LETS_GO")}
									</button>
								</div>
							</div>
						)}
					</div>
				</section>
			)}
		</>
	);
};

export default CustomModal;
