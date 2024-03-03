import React, { FC } from "react";
import useTranslation from "../../Utils/useTranslation";

import { IParentSetProps } from "../../Utils/customInterfaces";
import "./SignUp.scss";

const SignUp: FC<IParentSetProps> = ({ setValue }) => {
	const t = useTranslation();

	const _setLogin = () => {
		setValue(true);
	};

	return (
		<section className="khelotsu-signup">
			<form className="khelotsu-signup-form">
				<div
					className="khelotsu-login-form-heading"
					aria-label="Sign In Header">
					{t("SIGN_UP")}
				</div>
				<div
					id="khelotsu-signup-form-username"
					className="khelotsu-signup-form-component">
					<label
						htmlFor="khelotsu-signup-form-username-input"
						id="khelotsu-signup-form-username-label"
						className="khelotsu-signup-form-component-label">
						{t("USERNAME")}
					</label>
					<input
						type="text"
						id="khelotsu-signup-form-username-input"
						name="khelotsu-signup-form-username-input"
						className="khelotsu-signup-form-component-input"
					/>
				</div>
				<div
					id="khelotsu-signup-form-email"
					className="khelotsu-signup-form-component">
					<label
						htmlFor="khelotsu-signup-form-email-input"
						id="khelotsu-signup-form-email-label"
						className="khelotsu-signup-form-component-label">
						{t("EMAIL")}
					</label>
					<input
						type="text"
						id="khelotsu-signup-form-username-input"
						name="khelotsu-signup-form-username-input"
						className="khelotsu-signup-form-component-input"
					/>
				</div>
				<div
					id="khelotsu-signup-form-password"
					className="khelotsu-signup-form-component">
					<label
						htmlFor="khelotsu-signup-form-password-input"
						id="khelotsu-signup-form-password-label"
						className="khelotsu-signup-form-component-label">
						{t("PASSWORD")}
					</label>
					<input
						type="password"
						id="khelotsu-signup-form-password-input"
						name="khelotsu-signup-form-password-input"
						className="khelotsu-signup-form-component-input"
					/>
				</div>
				<div
					id="khelotsu-signup-form-password-confirm"
					className="khelotsu-signup-form-component">
					<label
						htmlFor="khelotsu-signup-form-password-confirm-input"
						id="khelotsu-signup-form-password-confirm-label"
						className="khelotsu-signup-form-component-label">
						{t("CONFIRM_PASSWORD")}
					</label>
					<input
						type="password"
						id="khelotsu-signup-form-password-confirm-input"
						name="khelotsu-signup-form-password-confirm-input"
						className="khelotsu-signup-form-component-input"
					/>
				</div>
				<input
					type="submit"
					value="Submit"
					className="khelotsu-signup-form-submit"></input>
			</form>

			<div className="khelotsu-signup-login">
				<div className="khelotsu-signup-login-not">{t("ALREADY_A_USER")}</div>
				&nbsp;
				<div className="khelotsu-signup-login-msg" onClick={_setLogin}>
					{t("SIGN_IN")}
				</div>
			</div>
		</section>
	);
};

export default SignUp;
