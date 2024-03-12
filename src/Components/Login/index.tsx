import React, { FC, FormEvent, useRef, useState } from "react";
import useTranslation from "../../Utils/useTranslation";
import * as yup from "yup";

import { IParentSetProps } from "../../Utils/customInterfaces";
import "./Login.scss"
import { userLoginSchema } from "../../Validations/user.validation";
import CustomToast from "../CustomToast";


const Login: FC<IParentSetProps> = ({setValue}) => {
    
    const [errorMsg, setErrorMsg] = useState<string>("");
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const t = useTranslation();

    const _setLogin = () => {
        setValue(false);
    }

    const _onLoginFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const userName = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        try {
            await userLoginSchema.validate({
                userName,
                password,
            }, {abortEarly: false})
            setErrorMsg("");
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                for (const err of error.inner) {
                    if (err.message) {
                        // to ensure re-render happens even if message is same
                        setErrorMsg(prevMessage => prevMessage === err.message ? err.message + " " : err.message);
                        break;
                    }
                };
            }
        }

    }

    return (
        <section className="khelotsu-login">
            {
                errorMsg && <CustomToast color="red" msg={errorMsg} />
            }
            <form className="khelotsu-login-form" onSubmit={_onLoginFormSubmit}>
                <div className="khelotsu-login-form-heading" aria-label="Sign In Header">
                    {t("SIGN_IN")}
                </div>
                <div id="khelotsu-login-form-username" className="khelotsu-login-form-component">
                    <label htmlFor="khelotsu-login-form-username-input" id="khelotsu-login-form-username-label"
                        className="khelotsu-login-form-component-label">
                        {t("USERNAME")}
                    </label>
                    <input type="text" id="khelotsu-login-form-username-input" name="khelotsu-login-form-username-input"
                        className="khelotsu-login-form-component-input" ref={usernameRef} />
                </div>
                <div id="khelotsu-login-form-password" className="khelotsu-login-form-component">
                    <label htmlFor="khelotsu-login-form-password-input" id="khelotsu-login-form-password-label"
                        className="khelotsu-login-form-component-label">
                        {t("PASSWORD")}
                    </label>
                    <input type="password" id="khelotsu-login-form-password-input" name="khelotsu-login-form-password-input"
                        className="khelotsu-login-form-component-input" ref={passwordRef} />
                </div>
                <input type="submit" value="Submit" className="khelotsu-login-form-submit"></input>
            </form>

            <div className="khelotsu-login-signup">
                <div className="khelotsu-login-signup-not">
                    {t("NOT_A_USER")}
                </div>
                &nbsp;
                <div className="khelotsu-login-signup-msg" onClick={_setLogin}>
                    {t("SIGN_UP")}
                </div>
            </div>
        </section>
    )
}

export default Login;