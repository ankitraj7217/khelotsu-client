import React, { FC } from "react";
import useTranslation from "../../Utils/useTranslation";

import { IParentSetProps } from "../../Utils/customInterfaces";
import "./Login.scss";

const Login: FC<IParentSetProps> = ({ setValue }) => {
	const t = useTranslation();

	const _setLogin = () => {
		setValue(false);
	};

	return (
		<section className="khelotsu-login">
			<form className="khelotsu-login-form">
				<div
					className="khelotsu-login-form-heading"
					aria-label="Sign In Header">
					{t("SIGN_IN")}
				</div>
				<div
					id="khelotsu-login-form-username"
					className="khelotsu-login-form-component">
					<label
						htmlFor="khelotsu-login-form-username-input"
						id="khelotsu-login-form-username-label"
						className="khelotsu-login-form-component-label">
						{t("USERNAME")}
					</label>
					<input
						type="text"
						id="khelotsu-login-form-username-input"
						name="khelotsu-login-form-username-input"
						className="khelotsu-login-form-component-input"
					/>
				</div>
				<div
					id="khelotsu-login-form-password"
					className="khelotsu-login-form-component">
					<label
						htmlFor="khelotsu-login-form-password-input"
						id="khelotsu-login-form-password-label"
						className="khelotsu-login-form-component-label">
						{t("PASSWORD")}
					</label>
					<input
						type="password"
						id="khelotsu-login-form-password-input"
						name="khelotsu-login-form-password-input"
						className="khelotsu-login-form-component-input"
					/>
				</div>
				<input
					type="submit"
					value="Submit"
					className="khelotsu-login-form-submit"></input>
			</form>

			<div className="khelotsu-login-signup">
				<div className="khelotsu-login-signup-not">{t("NOT_A_USER")}</div>
				&nbsp;
				<div className="khelotsu-login-signup-msg" onClick={_setLogin}>
					{t("SIGN_UP")}
				</div>
			</div>
		</section>
	);
};

export default Login;
